import { LinearProgress, Paper, Stack, Typography } from '@mui/material'
import { Target } from 'lucide-react'

type ReadingGoalCardProps = {
  read: number
  goal: number
}

export function ReadingGoalCard({ read, goal }: ReadingGoalCardProps) {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Target size={20} />
          <Typography variant="h6">Today’s page goal</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {read} of {goal} pages read today
        </Typography>
        <LinearProgress variant="determinate" value={(read / goal) * 100} sx={{ height: 8, borderRadius: 2 }} />
      </Stack>
    </Paper>
  )
}
