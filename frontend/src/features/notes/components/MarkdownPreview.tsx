import { Box, Paper, Stack, Typography } from '@mui/material'

type MarkdownPreviewProps = {
  content: string
}

function renderInline(content: string) {
  return content.replace(/\[\[(.*?)\]\]/g, '↗ $1')
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const lines = content.split('\n').filter(Boolean)

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <Stack spacing={1}>
        <Typography variant="h6">Preview</Typography>
        <Box>
          {lines.map((line) => (
            <Typography key={line} variant={line.startsWith('#') ? 'h6' : 'body2'} sx={{ mb: 1 }}>
              {renderInline(line.replace(/^#+\s*/, ''))}
            </Typography>
          ))}
        </Box>
      </Stack>
    </Paper>
  )
}
