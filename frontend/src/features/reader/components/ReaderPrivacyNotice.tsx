import { Alert } from '@mui/material'

export function ReaderPrivacyNotice() {
  return (
    <Alert severity="success">
      Your PDF stays on this device. Theoria Books syncs only your progress and metadata.
    </Alert>
  )
}
