export type XpAction = 'page' | 'chapter' | 'summary' | 'highlight' | 'groupContribution' | 'sevenDayStreak' | 'finishBook'

export type XpRule = {
  action: XpAction
  label: string
  xp: number
}
