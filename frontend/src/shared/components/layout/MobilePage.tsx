import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { palette } from '@shared/styles/theme'

type MobilePageProps = {
  children: ReactNode
}

export function MobilePage({ children }: MobilePageProps) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 480,
        minHeight: '100vh',
        mx: 'auto',
        bgcolor: palette.background,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  )
}
