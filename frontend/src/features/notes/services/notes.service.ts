import { mockApiClient } from '@shared/services/api/mockApiClient'
import type { Note, NoteInput } from '@features/notes/types/note.types'

let notes: Note[] = [
  {
    id: 'compounding-quiet-force',
    title: 'Compounding is a quiet force',
    bookId: 'psychology-money',
    bookTitle: 'The Psychology of Money',
    pageNumber: 42,
    markdownContent:
      'Small advantages become decisive when time is allowed to work. [[Topic: Compounding]] connects money, habits, and learning.',
    tags: ['Compounding', 'Learning'],
    isPrivate: true,
    syncEnabled: false,
    updatedAt: '2026-06-28',
  },
  {
    id: 'identity-before-habit',
    title: 'Identity before habit',
    bookId: 'atomic-habits',
    bookTitle: 'Atomic Habits',
    pageNumber: 38,
    markdownContent: 'The strongest habit is not what I do, but who I believe I am becoming. [[Book: Atomic Habits]]',
    tags: ['Habits', 'Identity'],
    isPrivate: false,
    syncEnabled: true,
    updatedAt: '2026-06-29',
  },
  {
    id: 'discipline-and-perception',
    title: 'Discipline and perception',
    bookId: 'meditations',
    bookTitle: 'Meditations',
    pageNumber: 71,
    markdownContent:
      'Marcus returns again and again to the difference between events and judgments. [[Topic: Stoicism]]',
    tags: ['Stoicism', 'Philosophy'],
    isPrivate: true,
    syncEnabled: false,
    updatedAt: '2026-06-30',
  },
  {
    id: 'boundaries-protect-meaning',
    title: 'Boundaries protect meaning',
    bookId: 'clean-architecture',
    bookTitle: 'Clean Architecture',
    pageNumber: 96,
    markdownContent:
      'Architecture is the art of deciding what should not depend on what. [[Topic: Software Architecture]]',
    tags: ['Software Architecture'],
    isPrivate: false,
    syncEnabled: true,
    updatedAt: '2026-07-01',
  },
]

const bookTitles: Record<string, string> = {
  'psychology-money': 'The Psychology of Money',
  'atomic-habits': 'Atomic Habits',
  meditations: 'Meditations',
  'clean-architecture': 'Clean Architecture',
}

function toNote(input: NoteInput, id = `note-${Date.now()}`): Note {
  return {
    id,
    title: input.title,
    markdownContent: input.markdownContent,
    bookId: input.bookId,
    bookTitle: bookTitles[input.bookId] ?? 'Private book',
    pageNumber: input.pageNumber,
    chapter: input.chapter,
    tags: input.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    isPrivate: input.isPrivate,
    syncEnabled: input.syncEnabled,
    updatedAt: new Date().toISOString().slice(0, 10),
  }
}

export const notesService = {
  async getNotes() {
    return mockApiClient(notes)
  },
  async getNote(noteId: string) {
    return mockApiClient(notes.find((note) => note.id === noteId))
  },
  async createNote(input: NoteInput) {
    const note = toNote(input)
    notes = [note, ...notes]
    return mockApiClient(note)
  },
  async updateNote(noteId: string, input: NoteInput) {
    const updated = toNote(input, noteId)
    notes = notes.map((note) => (note.id === noteId ? updated : note))
    return mockApiClient(updated)
  },
  getRelatedNotes(note: Note) {
    return notes.filter((item) => item.id !== note.id && item.tags.some((tag) => note.tags.includes(tag))).slice(0, 3)
  },
}
