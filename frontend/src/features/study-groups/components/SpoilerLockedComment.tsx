import { Alert } from '@mui/material'

type SpoilerLockedCommentProps = {
  pageNumber: number
}

export function SpoilerLockedComment({ pageNumber }: SpoilerLockedCommentProps) {
  return <Alert severity="info">Reach page {pageNumber} to unlock this reflection.</Alert>
}
