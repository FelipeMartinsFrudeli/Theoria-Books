import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import type { Note } from '@features/notes/types/note.types'

type RelatedNotesPanelProps = {
  notes: Note[]
}

export function RelatedNotesPanel({ notes }: RelatedNotesPanelProps) {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <Typography variant="h6">Nearby ideas</Typography>
      <List dense>
        {(notes.length ? notes : []).map((note) => (
          <ListItem key={note.id} disableGutters>
            <ListItemText primary={note.title} secondary={`${note.bookTitle}, p. ${note.pageNumber}`} />
          </ListItem>
        ))}
        {!notes.length ? (
          <ListItem disableGutters>
            <ListItemText primary="No nearby ideas yet" secondary="Collect ideas. Connect thoughts. Share wisdom." />
          </ListItem>
        ) : null}
      </List>
    </Paper>
  )
}
