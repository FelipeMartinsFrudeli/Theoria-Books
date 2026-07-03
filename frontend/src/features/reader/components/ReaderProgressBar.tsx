import { LinearProgress, Stack, Typography } from '@mui/material'

type ReaderProgressBarProps = {
  currentPage: number
  totalPages: number
}

export function ReaderProgressBar({ currentPage, totalPages }: ReaderProgressBarProps) {
  const progress = Math.round((currentPage / totalPages) * 100)

  return (
    <Stack spacing={1}>
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary">
          Page {currentPage}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {progress}%
        </Typography>
      </Stack>
      <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 2 }} />
    </Stack>
  )
}
