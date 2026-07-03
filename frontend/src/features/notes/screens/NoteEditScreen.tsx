import { Stack, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { EmptyState } from '@shared/components/data-display/EmptyState'
import { PageContainer } from '@shared/components/layout/PageContainer'
import { NoteEditorForm } from '@features/notes/components/NoteEditorForm'
import { RelatedNotesPanel } from '@features/notes/components/RelatedNotesPanel'
import { useCreateNote, useNote, useNotes, useUpdateNote } from '@features/notes/hooks/useNotes'
import { notesService } from '@features/notes/services/notes.service'
import type { NoteFormValues } from '@features/notes/schemas/note.schemas'

export function NoteEditScreen() {
  const { noteId } = useParams()
  const navigate = useNavigate()
  const isNew = !noteId
  const { data: note } = useNote(noteId)
  const { data: notes = [] } = useNotes()
  const createNote = useCreateNote()
  const updateNote = useUpdateNote(noteId ?? '')

  const save = async (values: NoteFormValues) => {
    if (isNew) {
      const created = await createNote.mutateAsync(values)
      navigate(`/notes/${created.id}`)
      return
    }
    await updateNote.mutateAsync(values)
    navigate('/notes')
  }

  if (!isNew && !note) {
    return (
      <PageContainer>
        <EmptyState title="Note not found" description="This reflection is no longer available." />
      </PageContainer>
    )
  }

  const related = note ? notesService.getRelatedNotes(note) : notes.slice(0, 2)

  return (
    <PageContainer>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h4">{isNew ? 'Create note' : 'Edit note'}</Typography>
          <Typography variant="body2" color="text.secondary">
            This note belongs to a page, but its idea may belong to many books.
          </Typography>
        </Stack>
        <NoteEditorForm initialNote={note} onSubmit={save} />
        <RelatedNotesPanel notes={related} />
      </Stack>
    </PageContainer>
  )
}
