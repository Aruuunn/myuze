import sizeof from 'object-sizeof';
import { CacheInterface } from '../interfaces';
import { swap } from '../utils';

/**
 *  Implementation of LRU cache
 * */
export class Cache implements CacheInterface {
  private maxSize = 100 * 1e6; // Approx. 100MB

  private cache: Record<string, { data: any, promise: boolean }> = {};

  private keys: string[] = [];

  private size = 0;

  clear(): void {
    this.cache = {};
  }

  config(maxSize: number): void {
    this.maxSize = maxSize;
  }

  get(key: string): any {
    const indexOfKey = this.keys.indexOf(key);

    if (indexOfKey !== -1) {
      const lastIndex = this.keys.length - 1;

      // bring the recently accessed key to the last
      this.keys = swap(this.keys, indexOfKey, lastIndex);

      return this.cache[key];
    }
    return null;
  }

  put(key: string, value: any): void {
    const valueSize = sizeof(value);

    while (this.size + valueSize > this.maxSize) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const key = this.keys.shift();

      if (!key) {
        break; // not supposed to happen tho
      }

      this.size -= sizeof(this.cache[key]);
      delete this.cache[key];
    }

    this.cache[key] = value;
    this.size += valueSize;
    this.keys.push(key);
  }

  static getCacheDecorator(cache: CacheInterface) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
      const original = descriptor.value;
      if (typeof original === 'function') {
        // eslint-disable-next-line no-param-reassign
        descriptor.value = function fn(...args: any[]): any {
          const key = original.name + JSON.stringify(args);
          const cachedResult: { data: any, promise: boolean } | undefined = cache.get(key);

          if (cachedResult) {
            const { promise, data } = cachedResult;
            if (promise) {
              return Promise.resolve(data);
            }

            return data;
          }

          const result = original.apply(this, args);

          if (result instanceof Promise) {
            return result.then((val) => {
              cache.put(key, { data: val, promise: true });
              return val;
            });
          }

          cache.put(key, { data: result, promise: false });
          return result;
        };
      }
    };
  }

  static getCacheClearDecorator(cache: CacheInterface) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
      const original = descriptor.value;
      if (typeof original === 'function') {
        // eslint-disable-next-line no-param-reassign
        descriptor.value = function fn(...args: any[]): any {
          const result = original.apply(this, args);

          if (result instanceof Promise) {
            return result.then((val) => {
              cache.clear();
              return val;
            });
          }

          cache.clear();
          return result;
        };
      }
    };
  }
}
