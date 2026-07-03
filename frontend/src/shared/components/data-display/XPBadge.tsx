import { Chip } from '@mui/material'
import { Star } from 'lucide-react'

type XPBadgeProps = {
  xp: number
}

export function XPBadge({ xp }: XPBadgeProps) {
  return <Chip size="small" icon={<Star size={16} />} label={`${xp} XP`} color="warning" />
}
