import type { XpRule } from '@features/gamification/types/gamification.types'

export const xpRules: XpRule[] = [
  { action: 'page', label: '+1 XP per page read', xp: 1 },
  { action: 'chapter', label: '+10 XP per completed chapter', xp: 10 },
  { action: 'summary', label: '+20 XP per summary', xp: 20 },
  { action: 'highlight', label: '+5 XP per highlight', xp: 5 },
  { action: 'groupContribution', label: '+15 XP per useful group contribution', xp: 15 },
  { action: 'sevenDayStreak', label: '+50 XP for a 7-day streak', xp: 50 },
  { action: 'finishBook', label: '+100 XP for finishing a book', xp: 100 },
]
