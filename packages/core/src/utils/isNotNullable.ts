export const isNotNullable = <T>(a: T | undefined | null): a is T =>
  a !== null && typeof a !== 'undefined';
