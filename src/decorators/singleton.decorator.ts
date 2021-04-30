/**
 * code snippet from https://trevoratlas.com/posts/how-to-create-a-typescript-singleton-decorator
 * */
/* eslint @typescript-eslint/no-explicit-any: 0 */

export const SINGLETON_KEY = Symbol('SINGLETON_KEY');

export type ISingleton<T extends new (...args: any[]) => any> = T & {
  [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Singleton = <T extends new (...args: any[]) => any>(type: T) => (
  new Proxy(type, {
    // this will hijack the constructor
    construct(target: ISingleton<T>, argsList, newTarget) {
      // we should skip the proxy for children of our target class
      if (target.prototype !== newTarget.prototype) {
        return Reflect.construct(target, argsList, newTarget);
      }
      // if our target class does not have an instance, create it
      if (!target[SINGLETON_KEY]) {
        // eslint-disable-next-line no-param-reassign
        target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget);
      }
      // return the instance we created!
      return target[SINGLETON_KEY];
    },
  }));
