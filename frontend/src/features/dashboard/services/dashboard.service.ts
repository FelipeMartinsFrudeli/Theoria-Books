import { mockApiClient } from '@shared/services/api/mockApiClient'
import type { Achievement, DailyMission, DashboardStats } from '@features/dashboard/types/dashboard.types'

const stats: DashboardStats = {
  streak: 12,
  todayPagesRead: 8,
  todayPageGoal: 15,
  totalXP: 1240,
  currentLevel: 4,
  nextLevelXP: 1500,
  weeklyPages: [12, 8, 20, 15, 6, 18, 10],
  booksFinishedThisMonth: 3,
  notesCreatedThisWeek: 9,
  groupContributions: 6,
}

export const missions: DailyMission[] = [
  { id: 'read-10', label: 'Read 10 pages', completed: false },
  { id: 'write-note', label: 'Write one note', completed: true },
  { id: 'review-summary', label: 'Review one previous summary', completed: false },
  { id: 'share-insight', label: 'Share one insight with a group', completed: false },
]

export const achievements: Achievement[] = [
  { id: 'seven-day-reader', label: 'Seven-Day Reader', description: 'Return to the page for one full week.', unlocked: true },
  { id: 'deep-summarizer', label: 'Deep Summarizer', description: 'Write summaries that make ideas easier to revisit.', unlocked: true },
  { id: 'book-finisher', label: 'Book Finisher', description: 'Complete a book without treating speed as the goal.', unlocked: true },
  { id: 'group-contributor', label: 'Group Contributor', description: 'Offer a useful reflection to a study circle.', unlocked: false },
  { id: 'consistent-learner', label: 'Consistent Learner', description: 'Build a durable rhythm of study.', unlocked: true },
]

export const dashboardService = {
  async getStats() {
    return mockApiClient(stats)
  },
}
