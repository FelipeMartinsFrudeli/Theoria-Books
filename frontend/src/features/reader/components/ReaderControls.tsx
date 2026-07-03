import { Button, Stack, TextField } from '@mui/material'
import { NotebookPen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type ReaderControlsProps = {
  currentPage: number
  onPrevious: () => void
  onNext: () => void
  onJump: (page: number) => void
  onFinish: () => void
}

export function ReaderControls({ currentPage, onPrevious, onNext, onJump, onFinish }: ReaderControlsProps) {
  const navigate = useNavigate()

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1}>
        <Button fullWidth variant="outlined" onClick={onPrevious}>
          Previous
        </Button>
        <Button fullWidth variant="contained" onClick={onNext}>
          Next
        </Button>
      </Stack>
      <Stack direction="row" spacing={1}>
        <TextField
          label="Page"
          type="number"
          defaultValue={currentPage}
          onBlur={(event) => onJump(Number(event.target.value))}
        />
        <Button variant="outlined" startIcon={<NotebookPen size={18} />} onClick={() => navigate('/notes/new')}>
          Add note
        </Button>
      </Stack>
      <Button variant="contained" color="secondary" onClick={onFinish}>
        Finish session
      </Button>
    </Stack>
  )
}
