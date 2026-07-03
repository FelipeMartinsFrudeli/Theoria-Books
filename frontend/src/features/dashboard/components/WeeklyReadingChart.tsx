import { Box, Paper, Stack, Typography } from '@mui/material'
import { palette } from '@shared/styles/theme'

type WeeklyReadingChartProps = {
  weeklyPages: number[]
}

export function WeeklyReadingChart({ weeklyPages }: WeeklyReadingChartProps) {
  const max = Math.max(...weeklyPages)

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Weekly pages read</Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-end', height: 120 }}>
          {weeklyPages.map((pages, index) => (
            <Stack key={`${pages}-${index}`} spacing={1} sx={{ alignItems: 'center', flex: 1 }}>
              <Box
                sx={{
                  width: '100%',
                  height: `${Math.max(16, (pages / max) * 96)}px`,
                  borderRadius: 2,
                  bgcolor: palette.secondaryBlue,
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {pages}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Paper>
  )
}
