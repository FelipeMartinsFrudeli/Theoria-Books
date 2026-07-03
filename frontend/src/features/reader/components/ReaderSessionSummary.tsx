import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'

type ReaderSessionSummaryProps = {
  open: boolean
  pagesRead: number
  xpEarned: number
  onClose: () => void
}

export function ReaderSessionSummary({ open, pagesRead, xpEarned, onClose }: ReaderSessionSummaryProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Session complete</DialogTitle>
      <DialogContent>
        <Alert severity="success" sx={{ mb: 2 }}>
          Pages, notes, and reflections all count.
        </Alert>
        <Typography variant="body1">
          You advanced {pagesRead} pages and earned {xpEarned} XP.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Continue your path
        </Button>
      </DialogActions>
    </Dialog>
  )
}
