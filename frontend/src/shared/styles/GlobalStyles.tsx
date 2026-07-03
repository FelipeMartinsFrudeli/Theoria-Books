import { GlobalStyles as MuiGlobalStyles } from '@mui/material'
import { palette } from '@shared/styles/theme'

export function GlobalStyles() {
  return (
    <MuiGlobalStyles
      styles={{
        html: {
          minHeight: '100%',
          background: palette.softGreenGray,
        },
        body: {
          minHeight: '100%',
          margin: 0,
          background: palette.softGreenGray,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '#root': {
          minHeight: '100vh',
        },
        '*': {
          boxSizing: 'border-box',
        },
        '::-webkit-scrollbar': {
          width: 8,
        },
        '::-webkit-scrollbar-thumb': {
          background: '#D2DDDA',
          borderRadius: 8,
        },
      }}
    />
  )
}
