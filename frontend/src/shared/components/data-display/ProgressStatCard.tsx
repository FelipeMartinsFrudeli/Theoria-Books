import { LinearProgress, Paper, Stack, Typography } from '@mui/material'

type ProgressStatCardProps = {
  label: string
  value: string
  progress: number
  helper?: string
}

export function ProgressStatCard({ label, value, progress, helper }: ProgressStatCardProps) {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h6">{value}</Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 2 }} />
        {helper ? (
          <Typography variant="caption" color="text.secondary">
            {helper}
          </Typography>
        ) : null}
      </Stack>
    </Paper>
  )
}
