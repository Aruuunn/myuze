export interface CacheInterface {
  clear(): void;
  config(maxSize: number): void;
  get(key: string): any;
  put(key: string, value: any): void;
}
