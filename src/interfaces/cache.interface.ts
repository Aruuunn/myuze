export interface CacheInterface {
  clear(): void;
  config(maxSize: number): void;
  getCacheDecorator(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
  getCacheClearDecorator()
  : (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
}
