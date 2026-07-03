import { Paper, Stack, Typography } from '@mui/material'
import { palette } from '@shared/styles/theme'

type ReaderPageProps = {
  currentPage: number
  title: string
  fileName?: string
}

export function ReaderPage({ currentPage, title, fileName }: ReaderPageProps) {
  return (
    <Paper elevation={0} sx={{ p: 3, minHeight: 320, borderRadius: 3, bgcolor: '#FFFFFF' }}>
      <Stack spacing={3} sx={{ height: '100%', justifyContent: 'space-between' }}>
        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            {fileName ?? title}
          </Typography>
          <Typography variant="h4">Page {currentPage}</Typography>
        </Stack>
        <Typography variant="body1" sx={{ color: palette.secondaryBlue, lineHeight: 1.8 }}>
          This simulated page leaves room for attention. Read slowly enough that one sentence can become part of your memory.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Turn every page into understanding.
        </Typography>
      </Stack>
    </Paper>
  )
}
