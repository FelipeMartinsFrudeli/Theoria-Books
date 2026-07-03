import { LinearProgress, Paper, Stack, Typography } from '@mui/material'
import type { Book } from '@features/books/types/book.types'

type BookProgressCardProps = {
  book: Book
}

export function BookProgressCard({ book }: BookProgressCardProps) {
  const progress = Math.round((book.currentPage / book.totalPages) * 100)

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <Stack spacing={1}>
        <Typography variant="h6">Your progress</Typography>
        <Typography variant="body2" color="text.secondary">
          You have completed {progress}% of this book. Your next page is {Math.min(book.currentPage + 1, book.totalPages)}.
        </Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 2 }} />
        <Typography variant="caption" color="text.secondary">
          This book has given you {book.xpEarned} XP. Fast reading is not always deep reading.
        </Typography>
      </Stack>
    </Paper>
  )
}
