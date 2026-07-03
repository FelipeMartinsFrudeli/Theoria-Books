import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notesService } from '@features/notes/services/notes.service'
import type { NoteInput } from '@features/notes/types/note.types'

export const notesQueryKey = ['notes']

export function useNotes() {
  return useQuery({ queryKey: notesQueryKey, queryFn: notesService.getNotes })
}

export function useNote(noteId?: string) {
  return useQuery({
    queryKey: ['note', noteId],
    queryFn: () => notesService.getNote(noteId ?? ''),
    enabled: Boolean(noteId),
  })
}

export function useCreateNote() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: NoteInput) => notesService.createNote(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notesQueryKey }),
  })
}

export function useUpdateNote(noteId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: NoteInput) => notesService.updateNote(noteId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesQueryKey })
      queryClient.invalidateQueries({ queryKey: ['note', noteId] })
    },
  })
}
