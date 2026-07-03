import { Chip } from '@mui/material'
import { ShieldCheck } from 'lucide-react'

type PrivacyBadgeProps = {
  label?: string
}

export function PrivacyBadge({ label = 'Stored only on this device' }: PrivacyBadgeProps) {
  return <Chip size="small" icon={<ShieldCheck size={16} />} label={label} color="success" variant="outlined" />
}
