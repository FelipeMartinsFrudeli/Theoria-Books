import { Paper, Stack, Typography } from '@mui/material'
import { Flame } from 'lucide-react'
import { palette } from '@shared/styles/theme'

type StreakCardProps = {
  streak: number
}

export function StreakCard({ streak }: StreakCardProps) {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: palette.softGreenGray }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Flame size={32} color={palette.success} />
        <Stack>
          <Typography variant="h5">{streak}-day reading practice</Typography>
          <Typography variant="body2" color="text.secondary">
            Consistency is the quiet architecture of wisdom.
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}
