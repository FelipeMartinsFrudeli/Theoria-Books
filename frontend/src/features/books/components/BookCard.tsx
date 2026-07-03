import { Button, Card, CardContent, IconButton, LinearProgress, Menu, MenuItem, Stack, Typography } from '@mui/material'
import { Edit3, MoreHorizontal, Star, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StreakBadge } from '@shared/components/data-display/StreakBadge'
import { XPBadge } from '@shared/components/data-display/XPBadge'
import { formatPercent } from '@shared/utils/format'
import { BookCover } from '@features/books/components/BookCover'
import { BookStatusChip } from '@features/books/components/BookStatusChip'
import { useRemoveBook } from '@features/books/hooks/useBooks'
import type { Book } from '@features/books/types/book.types'

type BookCardProps = {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate()
  const removeBook = useRemoveBook()
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)
  const progress = Math.round((book.currentPage / book.totalPages) * 100)
  const isPdf = book.sourceType === 'pdf'
  const closeMenu = () => setMenuAnchor(null)
  const handleRemove = async () => {
    closeMenu()
    await removeBook.mutateAsync(book.id)
  }

  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <BookCover title={book.title} author={book.author} coverUrl={book.coverUrl} />
          <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <BookStatusChip status={book.status} />
              <IconButton
                aria-label="Book options"
                size="small"
                onClick={(event) => setMenuAnchor(event.currentTarget)}
                sx={{ ml: 'auto' }}
              >
                <MoreHorizontal size={20} />
              </IconButton>
            </Stack>
            <Stack spacing={0.25}>
              <Typography variant="h6" noWrap>
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {book.author}
              </Typography>
            </Stack>
            <Stack spacing={0.75}>
              <Typography variant="caption" color="text.secondary">
                {book.currentPage} of {book.totalPages} pages • {formatPercent(progress)}
              </Typography>
              <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 2 }} />
            </Stack>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              <XPBadge xp={book.xpEarned} />
              {book.activeStreakDays ? <StreakBadge days={book.activeStreakDays} /> : null}
            </Stack>
            <Button variant="contained" size="small" onClick={() => navigate(`/books/${book.id}/read`)}>
              {isPdf ? 'Ler livro' : `Return to page ${Math.min(book.currentPage + 1, book.totalPages)}`}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
        <MenuItem onClick={closeMenu}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Star size={18} />
            <Typography variant="body2">Favorito</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Edit3 size={18} />
            <Typography variant="body2">Editar</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleRemove} disabled={removeBook.isPending}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Trash2 size={18} />
            <Typography variant="body2">Remover</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </Card>
  )
}
