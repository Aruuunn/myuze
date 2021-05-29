/* eslint @typescript-eslint/no-explicit-any: 0 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const LogPerformance = (
  funcName?: string,
): any => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): any => {
  if (process.env.REACT_APP_ENV !== 'dev') return;

  const original = descriptor.value;
  if (typeof original === 'function') {
    // eslint-disable-next-line no-param-reassign
    descriptor.value = function fn(...args: any[]): any {
      const start = performance.now();
      const result = original.apply(this, args);

      const log = () => {
        // eslint-disable-next-line no-console
        console.log(`[${(this as any).name}] ${funcName ?? original.name} took ${performance.now() - start} ms to execute w/ args: ${args}`);
      };

      if (result instanceof Promise) {
        return result.then((val) => {
          log();
          return val;
        });
      }

      log();
      return result;
    };
  }
};
