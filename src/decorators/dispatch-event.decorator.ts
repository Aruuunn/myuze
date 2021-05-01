/* eslint @typescript-eslint/no-explicit-any: 0 */

export function addEventListener(eventName: string, callback: () => void): void {
  window.removeEventListener(eventName, callback);
  window.addEventListener(eventName, callback);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function DispatchEvent(eventName: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = () => {
    const event = new Event(eventName);
    console.log('dispatching event..');
    window.dispatchEvent(event);
  };

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
    const original = descriptor.value;
    if (typeof original === 'function') {
      // eslint-disable-next-line no-param-reassign
      descriptor.value = function fn(...args: any[]): any {
        const result = original.apply(this, args);

        if (result instanceof Promise) {
          return result.then((val) => {
            dispatch();
            return val;
          });
        }

        dispatch();
        return result;
      };
    }
  };
}
