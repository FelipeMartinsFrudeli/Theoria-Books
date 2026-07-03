import { Stack } from '@mui/material'
import { BookCard } from '@features/books/components/BookCard'
import type { Book } from '@features/books/types/book.types'

type BookGridProps = {
  books: Book[]
}

export function BookGrid({ books }: BookGridProps) {
  return (
    <Stack spacing={2}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </Stack>
  )
}
