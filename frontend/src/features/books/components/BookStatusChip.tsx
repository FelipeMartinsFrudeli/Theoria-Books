import { Chip } from '@mui/material'
import type { BookStatus } from '@features/books/types/book.types'

const labels: Record<BookStatus, string> = {
  reading: 'Reading',
  finished: 'Finished',
  paused: 'Paused',
  'want-to-read': 'Want to read',
}

type BookStatusChipProps = {
  status: BookStatus
}

export function BookStatusChip({ status }: BookStatusChipProps) {
  return <Chip label={labels[status]} size="small" variant="outlined" />
}
