import { Palette } from '@open-music-player/core';

const convertToCSSVariableName = (colorKeyName: string) =>
  `--${colorKeyName.trim().replace(/_/g, '-').toLowerCase()}`;

export function injectPaletteIntoCSSVariables(palette: Palette) {
  const r = document.querySelector<HTMLElement>(':root');

  Object.keys(palette).forEach((colorKey) => {
    r?.style.setProperty(
      convertToCSSVariableName(colorKey),
      (palette as Record<string, [number, number, number]>)[colorKey].join(','),
    );
  });
}
