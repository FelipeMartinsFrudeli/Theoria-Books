export type Note = {
  id: string
  title: string
  markdownContent: string
  bookId: string
  bookTitle: string
  pageNumber: number
  chapter?: string
  tags: string[]
  isPrivate: boolean
  syncEnabled: boolean
  updatedAt: string
}

export type NoteInput = {
  title: string
  markdownContent: string
  bookId: string
  pageNumber: number
  chapter?: string
  tags: string
  isPrivate: boolean
  syncEnabled: boolean
}
