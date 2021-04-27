export function uintToBase64Image(format: string, data: Uint8Array): string {
  return `data:${format.trim()};base64,${btoa(String.fromCharCode.apply(null, Array.from(data)))}`;
}
