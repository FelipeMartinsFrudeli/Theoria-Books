import { IconButton, Stack, Typography } from '@mui/material'
import { ArrowLeft, Bookmark } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type ReaderToolbarProps = {
  title: string
  onBookmark: () => void
}

export function ReaderToolbar({ title, onBookmark }: ReaderToolbarProps) {
  const navigate = useNavigate()

  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <IconButton onClick={() => navigate(-1)} aria-label="Back">
        <ArrowLeft size={22} />
      </IconButton>
      <Stack sx={{ textAlign: 'center', minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary">
          Reading practice
        </Typography>
        <Typography variant="body2" noWrap sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
      </Stack>
      <IconButton onClick={onBookmark} aria-label="Bookmark page">
        <Bookmark size={22} />
      </IconButton>
    </Stack>
  )
}
