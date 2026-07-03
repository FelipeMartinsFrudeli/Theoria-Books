import { Box, Button, Chip, Stack, TextField, Typography } from '@mui/material'
import { BookOpen, Plus, Upload } from 'lucide-react'
import { useMemo, useState } from 'react'
import { EmptyState } from '@shared/components/data-display/EmptyState'
import { PageContainer } from '@shared/components/layout/PageContainer'
import { palette } from '@shared/styles/theme'
import { AddBookDialog } from '@features/books/components/AddBookDialog'
import { BookGrid } from '@features/books/components/BookGrid'
import { ImportPdfDialog } from '@features/books/components/ImportPdfDialog'
import { useBooks } from '@features/books/hooks/useBooks'
import type { BookStatus } from '@features/books/types/book.types'

const filters = ['Reading', 'Finished', 'Paused', 'Want to read', 'PDF'] as const

const statusMap: Partial<Record<(typeof filters)[number], BookStatus>> = {
  Reading: 'reading',
  Finished: 'finished',
  Paused: 'paused',
  'Want to read': 'want-to-read',
}

export function BooksScreen() {
  const { data: books = [] } = useBooks()
  const [addOpen, setAddOpen] = useState(false)
  const [importOpen, setImportOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<(typeof filters)[number]>('Reading')

  const visibleBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = `${book.title} ${book.author}`.toLowerCase().includes(query.toLowerCase())
      const matchesFilter =
        filter === 'PDF' ? book.sourceType === 'pdf' : book.status === statusMap[filter]
      return matchesSearch && matchesFilter
    })
  }, [books, query, filter])

  return (
    <PageContainer>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h4">Books</Typography>
          <Typography variant="body1" color="text.secondary">
            Build wisdom, one page at a time.
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" startIcon={<Plus size={18} />} onClick={() => setAddOpen(true)}>
            Add book
          </Button>
          <Button variant="outlined" startIcon={<Upload size={18} />} onClick={() => setImportOpen(true)}>
            Import PDF
          </Button>
        </Stack>
        <TextField
          placeholder="Search your library"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
          {filters.map((item) => (
            <Chip
              key={item}
              label={item}
              onClick={() => setFilter(item)}
              color={filter === item ? 'primary' : 'default'}
              sx={{ bgcolor: filter === item ? palette.primaryDark : undefined }}
            />
          ))}
        </Box>
        {visibleBooks.length ? (
          <BookGrid books={visibleBooks} />
        ) : (
          <EmptyState
            title="Your library is still quiet."
            description="Add your first book and begin turning pages into understanding."
            actionLabel="Add first book"
            onAction={() => setAddOpen(true)}
            icon={<BookOpen size={32} />}
          />
        )}
      </Stack>
      <AddBookDialog open={addOpen} onClose={() => setAddOpen(false)} />
      <ImportPdfDialog open={importOpen} onClose={() => setImportOpen(false)} />
    </PageContainer>
  )
}
