import { Box, Button, Stack, Typography } from '@mui/material'
import { ArrowLeft, Bookmark, MoreHorizontal, NotebookPen, Share2, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { FloatingActionButton } from '@shared/components/buttons/FloatingActionButton'
import { PillButton } from '@shared/components/buttons/PillButton'
import { palette } from '@shared/styles/theme'
import { BookCover } from '@features/books/components/BookCover'
import type { Book } from '@features/books/types/book.types'

type BookHeroProps = {
  book: Book
}

export function BookHero({ book }: BookHeroProps) {
  const navigate = useNavigate()
  const isPdf = book.sourceType === 'pdf'

  return (
    <Box sx={{ bgcolor: palette.softGreenGray, px: 2, pt: 3, pb: 4, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        <FloatingActionButton aria-label="Back" onClick={() => navigate('/books')}>
          <ArrowLeft size={22} />
        </FloatingActionButton>
        {isPdf ? null : (
          <Stack direction="row" spacing={1}>
            <FloatingActionButton aria-label="Bookmark">
              <Bookmark size={22} />
            </FloatingActionButton>
            <FloatingActionButton aria-label="More options">
              <MoreHorizontal size={22} />
            </FloatingActionButton>
          </Stack>
        )}
      </Stack>
      <Stack spacing={3} sx={{ mt: 3, alignItems: 'center' }}>
        <BookCover large title={book.title} author={book.author} coverUrl={book.coverUrl} />
        <Stack spacing={1} sx={{ textAlign: 'center' }}>
          <Typography variant="h5">{book.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {book.author} • about {Math.ceil((book.totalPages - book.currentPage) / 25)} quiet sessions left
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          {isPdf ? null : (
            <Button variant="outlined" startIcon={<NotebookPen size={18} />} onClick={() => navigate('/notes/new')}>
              Add note
            </Button>
          )}
          <PillButton startIcon={<Sparkles size={18} />} onClick={() => navigate(`/books/${book.id}/read`)}>
            {isPdf ? 'Ler livro' : 'Read'}
          </PillButton>
          {isPdf ? null : (
            <Button variant="outlined" startIcon={<Share2 size={18} />}>
              Share
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}
