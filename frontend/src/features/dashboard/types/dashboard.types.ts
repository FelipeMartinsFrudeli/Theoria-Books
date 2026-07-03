export type DashboardStats = {
  streak: number
  todayPagesRead: number
  todayPageGoal: number
  totalXP: number
  currentLevel: number
  nextLevelXP: number
  weeklyPages: number[]
  booksFinishedThisMonth: number
  notesCreatedThisWeek: number
  groupContributions: number
}

export type DailyMission = {
  id: string
  label: string
  completed: boolean
}

export type Achievement = {
  id: string
  label: string
  description: string
  unlocked: boolean
}
