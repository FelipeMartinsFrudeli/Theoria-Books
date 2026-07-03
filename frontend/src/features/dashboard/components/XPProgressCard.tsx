import { LinearProgress, Paper, Stack, Typography } from '@mui/material'
import { Star } from 'lucide-react'
import { palette } from '@shared/styles/theme'

type XPProgressCardProps = {
  totalXP: number
  currentLevel: number
  nextLevelXP: number
}

export function XPProgressCard({ totalXP, currentLevel, nextLevelXP }: XPProgressCardProps) {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Star size={20} color={palette.warning} />
          <Typography variant="h6">{totalXP.toLocaleString()} XP</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Level {currentLevel} • {nextLevelXP - totalXP} XP until the next stage
        </Typography>
        <LinearProgress variant="determinate" value={(totalXP / nextLevelXP) * 100} sx={{ height: 8, borderRadius: 2 }} />
        <Typography variant="caption" color="text.secondary">
          Pages, notes, and reflections all count.
        </Typography>
      </Stack>
    </Paper>
  )
}
