import { LinearProgress, Paper, Stack, Typography } from '@mui/material'
import type { StudyGroup } from '@features/study-groups/types/study-group.types'

type GroupProgressCardProps = {
  group: StudyGroup
}

export function GroupProgressCard({ group }: GroupProgressCardProps) {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <Stack spacing={1}>
        <Typography variant="h6">Shared progress</Typography>
        <Typography variant="body2" color="text.secondary">
          Members on the path through {group.currentBookTitle}. Group streak: {group.groupStreak} days.
        </Typography>
        <LinearProgress variant="determinate" value={group.groupProgress} sx={{ height: 8, borderRadius: 2 }} />
      </Stack>
    </Paper>
  )
}
