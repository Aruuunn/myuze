export type RGB = [r: number, g: number, b: number];

export type Palette = Record<
  | 'PRIMARY_BRIGHT'
  | 'PRIMARY'
  | 'PRIMARY_DARK'
  | 'PRIMARY_DARKER'
  | 'TEXT_PRIMARY'
  | 'TEXT_SECONDARY'
  | 'BG_COLOR'
  | 'BG_COLOR_LIGHTER',
  RGB
>;

export const DefaultPalette: Palette = {
  PRIMARY_BRIGHT: [213, 249, 255],
  PRIMARY: [199, 245, 251],
  PRIMARY_DARK: [113, 156, 159],
  PRIMARY_DARKER: [15, 51, 51],
  TEXT_PRIMARY: [202, 251, 245],
  TEXT_SECONDARY: [113, 156, 159],
  BG_COLOR: [16, 35, 37],
  BG_COLOR_LIGHTER: [24, 46, 49],
};
