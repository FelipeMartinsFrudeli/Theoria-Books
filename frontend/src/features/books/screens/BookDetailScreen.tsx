import { Button, Stack, Typography } from '@mui/material'
import { NotebookPen, Share2, Sparkles } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { EmptyState } from '@shared/components/data-display/EmptyState'
import { PageContainer } from '@shared/components/layout/PageContainer'
import { BookDetailTabs } from '@features/books/components/BookDetailTabs'
import { BookHero } from '@features/books/components/BookHero'
import { useBook } from '@features/books/hooks/useBooks'

export function BookDetailScreen() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const { data: book } = useBook(bookId)

  if (!book) {
    return (
      <PageContainer>
        <EmptyState title="Book not found" description="This path no longer points to a book." />
      </PageContainer>
    )
  }

  if (book.sourceType === 'pdf') {
    return (
      <>
        <BookHero book={book} />
        <PageContainer>
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              PDF never leaves your device. Theoria Books keeps only the local reference and reading progress.
            </Typography>
          </Stack>
        </PageContainer>
      </>
    )
  }

  return (
    <>
      <BookHero book={book} />
      <PageContainer>
        <Stack spacing={3}>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            <Button variant="contained" startIcon={<Sparkles size={18} />} onClick={() => navigate(`/books/${book.id}/read`)}>
              Read
            </Button>
            <Button variant="outlined" startIcon={<NotebookPen size={18} />} onClick={() => navigate('/notes/new')}>
              Add note
            </Button>
            <Button variant="outlined" startIcon={<Share2 size={18} />}>
              Share with group
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Reading is not a race. It is a practice.
          </Typography>
          <BookDetailTabs book={book} />
        </Stack>
      </PageContainer>
    </>
  )
}
