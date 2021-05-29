export const isTruthy = <T>(val: T | undefined | null): val is T => typeof val !== 'undefined' && val !== null;
