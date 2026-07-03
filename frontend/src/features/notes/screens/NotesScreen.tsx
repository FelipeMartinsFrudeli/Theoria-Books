import { Box, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material'
import { Menu } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent } from 'react'
import { PageContainer } from '@shared/components/layout/PageContainer'
import { NoteEditorForm } from '@features/notes/components/NoteEditorForm'
import { NoteTextEditor } from '@features/notes/components/NoteTextEditor'
import { NotesLibraryDrawer } from '@features/notes/components/NotesLibraryDrawer'
import { useCreateNote, useNotes, useUpdateNote } from '@features/notes/hooks/useNotes'
import type { NoteFormValues } from '@features/notes/schemas/note.schemas'

const LAST_EDITED_NOTE_KEY = 'theoria_books_last_edited_note_id'

type NoteDraft = {
  title: string
  markdownContent: string
}

export function NotesScreen() {
  const { data: notes = [] } = useNotes()
  const createNote = useCreateNote()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedNoteId, setSelectedNoteId] = useState<string>()
  const [isCreatingNew, setIsCreatingNew] = useState(false)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const selectedNote = notes.find((note) => note.id === selectedNoteId)
  const updateNote = useUpdateNote(selectedNoteId ?? '')

  useEffect(() => {
    if (!notes.length || selectedNoteId || isCreatingNew) return

    const storedNoteId = window.localStorage.getItem(LAST_EDITED_NOTE_KEY)
    const restoredNote = notes.find((note) => note.id === storedNoteId)
    const fallbackNote = [...notes].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]
    setSelectedNoteId(restoredNote?.id ?? fallbackNote?.id)
  }, [isCreatingNew, notes, selectedNoteId])

  const filteredNotes = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    if (!normalizedSearch) return notes

    return notes.filter((note) =>
      `${note.title} ${note.bookTitle} ${note.markdownContent} ${note.tags.join(' ')}`
        .toLowerCase()
        .includes(normalizedSearch),
    )
  }, [notes, search])

  const persistSelectedNote = (noteId: string) => {
    setSelectedNoteId(noteId)
    setIsCreatingNew(false)
    window.localStorage.setItem(LAST_EDITED_NOTE_KEY, noteId)
  }

  const saveDetails = async (values: NoteFormValues) => {
    if (selectedNote) {
      const updated = await updateNote.mutateAsync(values)
      persistSelectedNote(updated.id)
      setDetailsOpen(false)
      return
    }

    const created = await createNote.mutateAsync(values)
    persistSelectedNote(created.id)
    setDetailsOpen(false)
  }

  const saveDraft = useCallback(
    async (draft: NoteDraft) => {
      const title = draft.title.trim() || 'Untitled note'

      if (selectedNote) {
        const updated = await updateNote.mutateAsync({
          title,
          markdownContent: draft.markdownContent,
          bookId: selectedNote.bookId,
          pageNumber: selectedNote.pageNumber,
          chapter: selectedNote.chapter ?? '',
          tags: selectedNote.tags.join(', '),
          isPrivate: selectedNote.isPrivate,
          syncEnabled: selectedNote.syncEnabled,
        })
        persistSelectedNote(updated.id)
        return
      }

      const created = await createNote.mutateAsync({
        title,
        markdownContent: draft.markdownContent,
        bookId: 'psychology-money',
        pageNumber: 1,
        chapter: '',
        tags: '',
        isPrivate: true,
        syncEnabled: false,
      })
      persistSelectedNote(created.id)
    },
    [createNote, selectedNote, updateNote],
  )

  const startNewNote = () => {
    setSelectedNoteId(undefined)
    setIsCreatingNew(true)
    setDrawerOpen(false)
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current
    const touch = event.changedTouches[0]
    touchStart.current = null
    if (!start) return

    const deltaX = touch.clientX - start.x
    const deltaY = Math.abs(touch.clientY - start.y)
    if (start.x <= 64 && deltaX >= 72 && deltaY <= 48) {
      setDrawerOpen(true)
    }
  }

  return (
    <Box onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <PageContainer>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Stack spacing={1}>
              <Typography variant="h4">Notes</Typography>
              <Typography variant="body1" color="text.secondary">
                Where pages become memory.
              </Typography>
            </Stack>
            <IconButton aria-label="Open notes menu" onClick={() => setDrawerOpen(true)}>
              <Menu size={22} />
            </IconButton>
          </Stack>

          <NoteTextEditor note={selectedNote} onSaveDraft={saveDraft} />
        </Stack>
      </PageContainer>
      <NotesLibraryDrawer
        open={drawerOpen}
        notes={filteredNotes}
        selectedNoteId={selectedNoteId}
        search={search}
        onSearchChange={setSearch}
        onClose={() => setDrawerOpen(false)}
        onSelectNote={(noteId) => {
          persistSelectedNote(noteId)
          setDrawerOpen(false)
        }}
        onCreateNote={startNewNote}
        onEditDetails={() => {
          setDrawerOpen(false)
          setDetailsOpen(true)
        }}
      />
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} fullWidth>
        <DialogTitle>Editar detalhes</DialogTitle>
        <DialogContent>
          <NoteEditorForm
            initialNote={selectedNote}
            onSubmit={saveDetails}
            onCancel={() => setDetailsOpen(false)}
            saveLabel="Save details"
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}
