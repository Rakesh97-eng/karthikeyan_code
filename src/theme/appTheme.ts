import { createTheme, Theme, ThemeOptions } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { FontFamily, Fonts } from './fonts';
import * as typographyVariants from './typography';

// <Additional custom variants>
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    mono1: true;
    mono2: true;
    label: true;
    prodLabel1: true;
    prodLabel2: true;
    btn: true;
  }
}
interface ExtendedTypographyOptions extends TypographyOptions {
  body3: React.CSSProperties;
  mono1: React.CSSProperties;
  mono2: React.CSSProperties;
  label: React.CSSProperties;
  prodLabel1: React.CSSProperties;
  prodLabel2: React.CSSProperties;
  btn: React.CSSProperties;
}
// </Additional custom variants>

export const appTheme: Theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 699,
      md: 700,
      lg: 1200,
      xl: 1200,
    },
  },
  typography: {
    fontFamily: FontFamily,
    h1: typographyVariants.h1,
    h2: typographyVariants.h2,
    h3: typographyVariants.h3,
    h4: typographyVariants.h4,
    body1: typographyVariants.body1,
    body2: typographyVariants.body2,
    body3: typographyVariants.body3,
    mono1: typographyVariants.mono1,
    mono2: typographyVariants.mono2,
    label: typographyVariants.label,
    prodLabel1: typographyVariants.prodLabel1,
    prodLabel2: typographyVariants.prodLabel2,
    btn: typographyVariants.btn,
  } as ExtendedTypographyOptions,
  components: {
    MuiCssBaseline: {
      styleOverrides: Fonts,
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
} as ThemeOptions);
