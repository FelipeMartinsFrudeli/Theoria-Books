import { createTheme } from '@mui/material/styles'

export const palette = {
  primaryDark: '#183B56',
  secondaryBlue: '#244E68',
  softGreenGray: '#DDE8E1',
  background: '#F8FAF9',
  paper: '#FFFFFF',
  mutedText: '#8A9499',
  chip: '#E9EEF0',
  success: '#6BAA75',
  warning: '#F2B84B',
  philosophy: '#8D6E63',
}

export const softShadow = '0px 8px 24px rgba(24, 59, 86, 0.08)'

export const theme = createTheme({
  palette: {
    primary: {
      main: palette.primaryDark,
      dark: palette.primaryDark,
      light: palette.secondaryBlue,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: palette.philosophy,
    },
    success: {
      main: palette.success,
    },
    warning: {
      main: palette.warning,
    },
    background: {
      default: palette.background,
      paper: palette.paper,
    },
    text: {
      primary: palette.primaryDark,
      secondary: palette.mutedText,
    },
  },
  typography: {
    fontFamily:
      'Inter, Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h4: { fontWeight: 800, letterSpacing: 0 },
    h5: { fontWeight: 800, letterSpacing: 0 },
    h6: { fontWeight: 800, letterSpacing: 0 },
    button: { fontWeight: 800, textTransform: 'none', letterSpacing: 0 },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: 'none',
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: softShadow,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
})
