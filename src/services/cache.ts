import { CacheInterface } from '../interfaces';

export class Cache implements CacheInterface {
  private maxSize = 0;

  cache: Record<string, { data: any, promise: boolean }> = {};

  clear(): void {
    this.cache = {};
  }

  config(maxSize: number): void {
    this.maxSize = maxSize;
  }

  get(key: string): any {
    return this.cache[key];
  }

  put(key: string, value: any): void {
    this.cache[key] = value;
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
