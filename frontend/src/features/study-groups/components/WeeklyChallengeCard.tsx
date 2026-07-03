import { Paper, Stack, Typography } from '@mui/material'
import { Target } from 'lucide-react'

type WeeklyChallengeCardProps = {
  challenge: string
}

export function WeeklyChallengeCard({ challenge }: WeeklyChallengeCardProps) {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <Stack direction="row" spacing={2}>
        <Target size={24} />
        <Stack spacing={0.5}>
          <Typography variant="h6">Weekly challenge</Typography>
          <Typography variant="body2" color="text.secondary">
            {challenge}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}
