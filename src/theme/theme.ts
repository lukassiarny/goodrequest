export type ThemeType = typeof theme;

export const mediaSize = {
  xxs: "320px",
  xs: "480px",
  s: "600px",
  m: "768px",
  l: "992px",
  xl: "1100px",
  xxl: "1200px",
  xxxl: "1350px",
};

export const theme = {
  colors: {
    primaryOne: "#CD8B65",
    primaryTwo: "#BB6B3D",
    primaryLight: "#F3E2D9",
    textPrimary: "#2F2F2F",
    textLight: "#9F9F9F",
    textMiddle: "#585757",
    mainBackground: "#fff",
    navbarBackground: "#FEFEFE",
    borderColor: "#DFDFDF",
    error: "red",
  },
  font: {
    familyPrimary: "'Public Sans', sans-serif",
    familySecondary: "'Hind', sans-serif",
    lineHeight: "1.3",
    fontSizeDesktop: "16px",
    fontSizeMobile: "14px",
  },
};

export default theme;
