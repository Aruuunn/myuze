function Uint8ToString(u8a: Uint8Array) {
  const CHUNK_SZ = 0x8000;
  const c = [];
  for (let i = 0; i < u8a.length; i += CHUNK_SZ) {
    c.push(
      String.fromCharCode.apply(
        null,
        Array.from(u8a.subarray(i, i + CHUNK_SZ)),
      ),
    );
  }
  return c.join('');
}

export function uintToBase64Image(format: string, data: Uint8Array): string {
  return `data:${format.trim()};base64,${window.btoa(Uint8ToString(data))}`;
}
