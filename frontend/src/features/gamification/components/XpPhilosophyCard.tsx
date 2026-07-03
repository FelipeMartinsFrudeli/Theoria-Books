import { Paper, Stack, Typography } from '@mui/material'
import { Brain } from 'lucide-react'

export function XpPhilosophyCard() {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <Stack direction="row" spacing={2}>
        <Brain size={24} />
        <Stack spacing={0.5}>
          <Typography variant="h6">XP earned through practice</Typography>
          <Typography variant="body2" color="text.secondary">
            Wisdom grows through repetition. Reading, summaries, notes, and thoughtful contribution all count.
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}
