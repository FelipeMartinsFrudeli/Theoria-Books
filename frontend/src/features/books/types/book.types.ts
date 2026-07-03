export type BookStatus = 'reading' | 'finished' | 'paused' | 'want-to-read'
export type BookSourceType = 'manual' | 'pdf'

export type Book = {
  id: string
  title: string
  author: string
  description: string
  totalPages: number
  currentPage: number
  confirmedReadPages: number
  category: string
  categories: string[]
  coverUrl?: string
  sourceType: BookSourceType
  status: BookStatus
  xpEarned: number
  activeStreakDays?: number
  localOnlyFile?: boolean
  localFileName?: string
  localFilePath?: string
  localObjectUrl?: string
  fileSize?: number
  importedDate?: string
  chapters: string[]
}

export type CreateBookInput = {
  title: string
  author: string
  description: string
  totalPages: number
  category: string
  coverUrl?: string
  sourceType: BookSourceType
  status: BookStatus
}

export type ImportPdfBookInput = {
  title: string
  totalPages: number
  coverUrl: string
  localFileName: string
  localFilePath: string
  localObjectUrl?: string
  fileSize: number
}

export type ReadingProgressInput = {
  bookId: string
  currentPage: number
  sequentialPagesRead: number
}
