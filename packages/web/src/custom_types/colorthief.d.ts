interface Function {
  getColor(
    el: HTMLImgElement,
    quality?: number,
  ): Promise<[r: number, g: number, b: number]>;
  getPalette(
    el: HTMLImgElement,
    colorCount?: number,
    quality?: number,
  ): Promise<[r: number, g: number, b: number][]>;
}

declare module 'colorthief' {
  export default Function;
}
