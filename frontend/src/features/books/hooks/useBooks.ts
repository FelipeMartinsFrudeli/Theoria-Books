import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { booksService } from '@features/books/services/books.service'
import type { CreateBookInput, ImportPdfBookInput, ReadingProgressInput } from '@features/books/types/book.types'

export const booksQueryKey = ['books']

export function useBooks() {
  return useQuery({ queryKey: booksQueryKey, queryFn: booksService.getBooks })
}

export function useBook(bookId?: string) {
  return useQuery({
    queryKey: ['book', bookId],
    queryFn: () => booksService.getBook(bookId ?? ''),
    enabled: Boolean(bookId),
  })
}

export function useCreateBook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateBookInput) => booksService.createBook(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: booksQueryKey }),
  })
}

export function useImportPdfBook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: ImportPdfBookInput) => booksService.importPdfBook(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: booksQueryKey }),
  })
}

export function useRemoveBook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (bookId: string) => booksService.removeBook(bookId),
    onSuccess: (book) => {
      queryClient.invalidateQueries({ queryKey: booksQueryKey })
      if (book) queryClient.removeQueries({ queryKey: ['book', book.id] })
    },
  })
}

export function useUpdateReadingProgress() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: ReadingProgressInput) => booksService.updateReadingProgress(input),
    onSuccess: (book) => {
      queryClient.invalidateQueries({ queryKey: booksQueryKey })
      if (book) queryClient.invalidateQueries({ queryKey: ['book', book.id] })
    },
  })
}
