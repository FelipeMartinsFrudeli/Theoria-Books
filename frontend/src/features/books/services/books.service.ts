import { mockApiClient } from '@shared/services/api/mockApiClient'
import type { Book, CreateBookInput, ImportPdfBookInput, ReadingProgressInput } from '@features/books/types/book.types'

const LOCAL_PDF_BOOKS_KEY = 'theoria_books_local_pdf_books'

const seedBooks: Book[] = [
  {
    id: 'psychology-money',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    categories: ['Money', 'Psychology'],
    category: 'Money',
    totalPages: 256,
    currentPage: 84,
    confirmedReadPages: 84,
    status: 'reading',
    description: 'A study of how behavior, emotion, and time shape financial decisions.',
    sourceType: 'manual',
    xpEarned: 240,
    activeStreakDays: 12,
    chapters: ['No One Is Crazy', 'Luck and Risk', 'Never Enough', 'Confounding Compounding'],
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    categories: ['Habits', 'Productivity'],
    category: 'Habits',
    totalPages: 320,
    currentPage: 240,
    confirmedReadPages: 240,
    status: 'reading',
    description: 'A practical guide to small actions, repeated until they become identity.',
    sourceType: 'manual',
    xpEarned: 340,
    activeStreakDays: 8,
    chapters: ['The Fundamentals', 'The Four Laws', 'Advanced Tactics'],
  },
  {
    id: 'meditations',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    categories: ['Philosophy', 'Stoicism'],
    category: 'Philosophy',
    totalPages: 180,
    currentPage: 180,
    confirmedReadPages: 180,
    status: 'finished',
    description: 'A private notebook of discipline, mortality, duty, and inner freedom.',
    sourceType: 'manual',
    xpEarned: 360,
    chapters: ['Book I', 'Book II', 'Book III', 'Book IV'],
  },
  {
    id: 'clean-architecture',
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    categories: ['Programming', 'Software Architecture'],
    category: 'Programming',
    totalPages: 432,
    currentPage: 96,
    confirmedReadPages: 96,
    status: 'reading',
    description: 'A technical reflection on boundaries, dependency rules, and software structure.',
    sourceType: 'manual',
    xpEarned: 160,
    activeStreakDays: 4,
    chapters: ['Introduction', 'Programming Paradigms', 'Design Principles', 'Component Principles'],
  },
]

const createId = (title: string) => `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`
const progress = (book: Book) => Math.round((book.currentPage / book.totalPages) * 100)
const isBrowser = typeof window !== 'undefined'

function readLocalPdfBooks() {
  if (!isBrowser) return []
  const raw = window.localStorage.getItem(LOCAL_PDF_BOOKS_KEY)
  if (!raw) return []

  try {
    return JSON.parse(raw) as Book[]
  } catch {
    return []
  }
}

function writeLocalPdfBooks(localBooks: Book[]) {
  if (!isBrowser) return
  window.localStorage.setItem(
    LOCAL_PDF_BOOKS_KEY,
    JSON.stringify(localBooks, (key, value) => (key === 'localObjectUrl' ? undefined : value)),
  )
}

let books: Book[] = [...readLocalPdfBooks(), ...seedBooks]

export const booksService = {
  async getBooks() {
    return mockApiClient(books)
  },
  async getBook(bookId: string) {
    const book = books.find((item) => item.id === bookId)
    return mockApiClient(book)
  },
  async createBook(input: CreateBookInput) {
    const book: Book = {
      ...input,
      id: createId(input.title),
      currentPage: 0,
      confirmedReadPages: 0,
      categories: [input.category],
      xpEarned: 0,
      chapters: ['Opening notes', 'Middle passage', 'Closing reflection'],
    }
    books = [book, ...books]
    return mockApiClient(book)
  },
  async importPdfBook(input: ImportPdfBookInput) {
    const book: Book = {
      id: createId(input.title),
      title: input.title,
      author: 'Local PDF',
      description: 'Private PDF imported for local reading practice.',
      totalPages: input.totalPages,
      currentPage: 0,
      confirmedReadPages: 0,
      category: 'PDF',
      categories: ['PDF'],
      coverUrl: input.coverUrl,
      sourceType: 'pdf',
      status: 'reading',
      xpEarned: 0,
      localOnlyFile: true,
      localFileName: input.localFileName,
      localFilePath: input.localFilePath,
      localObjectUrl: input.localObjectUrl,
      fileSize: input.fileSize,
      importedDate: new Date().toISOString(),
      chapters: ['Private reading file'],
    }
    books = [book, ...books]
    writeLocalPdfBooks(books.filter((item) => item.sourceType === 'pdf' && item.localOnlyFile))
    return mockApiClient(book)
  },
  async removeBook(bookId: string) {
    const removedBook = books.find((book) => book.id === bookId)
    books = books.filter((book) => book.id !== bookId)
    writeLocalPdfBooks(books.filter((book) => book.sourceType === 'pdf' && book.localOnlyFile))
    return mockApiClient(removedBook)
  },
  async updateReadingProgress(input: ReadingProgressInput) {
    books = books.map((book) => {
      if (book.id !== input.bookId) return book
      const sequentialPages = Math.max(0, input.sequentialPagesRead)
      const nextConfirmed = Math.min(book.totalPages, book.confirmedReadPages + sequentialPages)
      const currentPage = Math.min(book.totalPages, Math.max(0, input.currentPage))
      const finishedBonus = nextConfirmed >= book.totalPages && book.status !== 'finished' ? 100 : 0
      return {
        ...book,
        currentPage,
        confirmedReadPages: Math.max(book.confirmedReadPages, nextConfirmed),
        status: currentPage >= book.totalPages ? 'finished' : book.status,
        xpEarned: book.xpEarned + sequentialPages + finishedBonus,
      }
    })
    writeLocalPdfBooks(books.filter((book) => book.sourceType === 'pdf' && book.localOnlyFile))
    return mockApiClient(books.find((book) => book.id === input.bookId))
  },
  getProgress(book: Book) {
    return progress(book)
  },
}
