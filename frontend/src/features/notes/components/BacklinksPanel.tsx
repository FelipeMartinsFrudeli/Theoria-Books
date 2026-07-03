import { Chip, Paper, Stack, Typography } from '@mui/material'
import { Link } from 'lucide-react'

type BacklinksPanelProps = {
  markdown: string
}

export function BacklinksPanel({ markdown }: BacklinksPanelProps) {
  const links = Array.from(markdown.matchAll(/\[\[(.*?)\]\]/g)).map((match) => match[1])

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Link size={18} />
          <Typography variant="h6">Connected thoughts</Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          {(links.length ? links : ['Topic: Understanding', 'Author: Shared wisdom']).map((link) => (
            <Chip key={link} label={link} size="small" />
          ))}
        </Stack>
      </Stack>
    </Paper>
  )
}
