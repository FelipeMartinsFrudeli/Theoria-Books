import { Chip, Paper, Stack, Typography } from '@mui/material'
import { Trophy } from 'lucide-react'
import { achievements } from '@features/dashboard/services/dashboard.service'

export function AchievementList() {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <Stack spacing={1.5}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Trophy size={20} />
          <Typography variant="h6">Achievement badges</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Unlocked through repeated practice, not sudden intensity.
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          {achievements.map((achievement) => (
            <Chip
              key={achievement.id}
              label={achievement.label}
              color={achievement.unlocked ? 'warning' : 'default'}
              variant={achievement.unlocked ? 'filled' : 'outlined'}
            />
          ))}
        </Stack>
      </Stack>
    </Paper>
  )
}
