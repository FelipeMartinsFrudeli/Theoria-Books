import { Chip } from '@mui/material'
import { Flame } from 'lucide-react'

type StreakBadgeProps = {
  days: number
}

export function StreakBadge({ days }: StreakBadgeProps) {
  return <Chip size="small" icon={<Flame size={16} />} label={`${days} days of practice`} color="success" />
}
