import { Paper, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { palette, softShadow } from '@shared/styles/theme'

type AuthCardProps = {
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <Stack sx={{ minHeight: '100vh', px: 2, py: 6, bgcolor: palette.softGreenGray, justifyContent: 'center' }}>
      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, boxShadow: softShadow }}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          </Stack>
          {children}
        </Stack>
      </Paper>
    </Stack>
  )
}
