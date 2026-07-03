import { Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material'
import { Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Note } from '@features/notes/types/note.types'

type NoteCardProps = {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  const navigate = useNavigate()

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/notes/${note.id}`)}>
        <CardContent>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h6">{note.title}</Typography>
              {note.isPrivate ? <Lock size={18} /> : null}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {note.bookTitle}, p. {note.pageNumber}
            </Typography>
            <Typography variant="body2">{note.markdownContent.slice(0, 120)}</Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {note.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" />
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
