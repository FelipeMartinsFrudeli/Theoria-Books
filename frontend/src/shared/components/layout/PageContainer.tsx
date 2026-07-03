import { Box } from '@mui/material'
import type { ReactNode } from 'react'

type PageContainerProps = {
  children: ReactNode
  pb?: number
}

export function PageContainer({ children, pb = 12 }: PageContainerProps) {
  return (
    <Box component="main" sx={{ px: 2, pt: 3, pb }}>
      {children}
    </Box>
  )
}
