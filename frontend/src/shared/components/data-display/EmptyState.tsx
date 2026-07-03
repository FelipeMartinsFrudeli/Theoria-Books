import { Button, Paper, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { palette } from '@shared/styles/theme'

type EmptyStateProps = {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  icon?: ReactNode
}

export function EmptyState({ title, description, actionLabel, onAction, icon }: EmptyStateProps) {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#FFFFFF' }}>
      <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
        {icon ? <Stack sx={{ color: palette.primaryDark }}>{icon}</Stack> : null}
        <Stack spacing={0.5}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Stack>
        {actionLabel ? (
          <Button variant="contained" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </Stack>
    </Paper>
  )
}
