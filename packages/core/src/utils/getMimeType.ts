export const getMimeType = (base64: string): string =>
  base64.substring('data:'.length, base64.indexOf(';base64'));
