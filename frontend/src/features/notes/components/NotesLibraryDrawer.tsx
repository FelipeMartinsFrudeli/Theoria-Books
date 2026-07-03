import {
  Button,
  Drawer,
  List,
  ListItemButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Edit3, Plus } from 'lucide-react'
import type { Note } from '@features/notes/types/note.types'

type NotesLibraryDrawerProps = {
  open: boolean
  notes: Note[]
  selectedNoteId?: string
  search: string
  onSearchChange: (value: string) => void
  onClose: () => void
  onSelectNote: (noteId: string) => void
  onCreateNote: () => void
  onEditDetails: () => void
}

export function NotesLibraryDrawer({
  open,
  notes,
  selectedNoteId,
  search,
  onSearchChange,
  onClose,
  onSelectNote,
  onCreateNote,
  onEditDetails,
}: NotesLibraryDrawerProps) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: 320,
            maxWidth: '84vw',
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
            p: 2,
          },
        },
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack>
            <Typography variant="h6">Notes</Typography>
            <Typography variant="caption" color="text.secondary">
              Select a file to continue editing.
            </Typography>
          </Stack>
          <Button variant="contained" size="small" onClick={onCreateNote} startIcon={<Plus size={16} />}>
            New
          </Button>
        </Stack>
        <Button
          variant="outlined"
          onClick={onEditDetails}
          disabled={!selectedNoteId}
          startIcon={<Edit3 size={16} />}
        >
          Editar detalhes
        </Button>
        <TextField placeholder="Search notes" value={search} onChange={(event) => onSearchChange(event.target.value)} />
        <List disablePadding>
          {notes.map((note) => (
            <ListItemButton
              key={note.id}
              selected={note.id === selectedNoteId}
              onClick={() => onSelectNote(note.id)}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <Stack sx={{ minWidth: 0 }}>
                <Typography variant="body2" noWrap>
                  {note.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {note.bookTitle}, p. {note.pageNumber}
                </Typography>
              </Stack>
            </ListItemButton>
          ))}
          {!notes.length ? (
            <Typography variant="body2" color="text.secondary" sx={{ px: 1, py: 2 }}>
              No notes found.
            </Typography>
          ) : null}
        </List>
      </Stack>
    </Drawer>
  )
}
