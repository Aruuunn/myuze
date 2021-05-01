import { CacheInterface } from '../interfaces';

export class Cache implements CacheInterface {
  private maxSize = 0;

  private cache: Record<string, any> = {};

  clear(): void {
    this.cache = {};
  }

  config(maxSize: number): void {
    this.maxSize = maxSize;
  }

  getCacheDecorator() {
    const { cache } = this;
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
      const original = descriptor.value;
      if (typeof original === 'function') {
        // eslint-disable-next-line no-param-reassign
        descriptor.value = function fn(...args: any[]): any {
          const key = JSON.stringify(args);
          const cachedResult = cache[key];

          if (cachedResult) {
            return cachedResult;
          }

          const result = original.apply(this, args);

          cache[key] = result;
          return result;
        };
      }
    };
  }

  getCacheClearDecorator() {
    const { clear } = this;
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
      const original = descriptor.value;
      if (typeof original === 'function') {
        // eslint-disable-next-line no-param-reassign
        descriptor.value = function fn(...args: any[]): any {
          const result = original.apply(this, args);

          if (result instanceof Promise) {
            return result.then((val) => {
              clear();
              return val;
            });
          }

          clear();
          return result;
        };
      }
    };
  }
}
