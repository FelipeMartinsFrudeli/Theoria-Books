import { useMemo, useState } from 'react'
import type { Book } from '@features/books/types/book.types'
import type { ReaderSession } from '@features/reader/types/reader.types'

export function useReaderSession(book?: Book) {
  const [session, setSession] = useState<ReaderSession | null>(null)

  const activeSession = useMemo<ReaderSession | null>(() => {
    if (!book) return null
    return session ?? {
      startPage: book.currentPage,
      currentPage: book.currentPage,
      sequentialPagesRead: 0,
      bookmarkedPages: [],
    }
  }, [book, session])

  const nextPage = () => {
    if (!book || !activeSession) return
    if (activeSession.currentPage >= book.totalPages) return
    setSession({
      ...activeSession,
      currentPage: activeSession.currentPage + 1,
      sequentialPagesRead: activeSession.sequentialPagesRead + 1,
    })
  }

  const previousPage = () => {
    if (!activeSession) return
    setSession({
      ...activeSession,
      currentPage: Math.max(0, activeSession.currentPage - 1),
    })
  }

  const jumpToPage = (page: number) => {
    if (!book || !activeSession) return
    setSession({
      ...activeSession,
      currentPage: Math.max(0, Math.min(book.totalPages, page)),
    })
  }

  const bookmarkPage = () => {
    if (!activeSession) return
    setSession({
      ...activeSession,
      bookmarkedPages: Array.from(new Set([...activeSession.bookmarkedPages, activeSession.currentPage])),
    })
  }

  return {
    session: activeSession,
    nextPage,
    previousPage,
    jumpToPage,
    bookmarkPage,
  }
}
