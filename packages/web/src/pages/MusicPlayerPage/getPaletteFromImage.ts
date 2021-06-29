import { Palette, DefaultPalette, RGB } from '@open-music-player/core';
import { rgb } from 'color';
import ColorThief from 'colorthief';

const colorthief = new ColorThief();

export const getPaletteFromImage = (imgURL: string): Promise<Palette> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imgURL;
    img.onload = async () => {
      let color = rgb(colorthief.getColor(img));

      if (color.isDark()) {
        color = color.lighten(1);
      }

      const newPalette: Palette = {
        ...DefaultPalette,
        PRIMARY: rgb(DefaultPalette.PRIMARY).mix(color).rgb().array() as RGB,
        PRIMARY_DARK: rgb(DefaultPalette.PRIMARY_DARK)
          .mix(color)
          .rgb()
          .array() as RGB,
        PRIMARY_BRIGHT: rgb(DefaultPalette.PRIMARY_BRIGHT)
          .mix(color)
          .rgb()
          .array() as RGB,
        BG_COLOR: rgb(DefaultPalette.BG_COLOR).mix(color).rgb().array() as RGB,
      };

      resolve(newPalette);
    };

    img.onerror = reject;
  });
