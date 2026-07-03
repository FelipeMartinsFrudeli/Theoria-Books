import { Dialog, DialogContent, DialogTitle, Grid, Stack } from '@mui/material'
import { ProgressStatCard } from '@shared/components/data-display/ProgressStatCard'
import { AchievementList } from '@features/dashboard/components/AchievementList'
import { ReadingGoalCard } from '@features/dashboard/components/ReadingGoalCard'
import { WeeklyReadingChart } from '@features/dashboard/components/WeeklyReadingChart'
import { XPProgressCard } from '@features/dashboard/components/XPProgressCard'
import type { DashboardStats } from '@features/dashboard/types/dashboard.types'
import { XpPhilosophyCard } from '@features/gamification/components/XpPhilosophyCard'

type StatsDialogProps = {
  open: boolean
  stats: DashboardStats
  onClose: () => void
}

export function StatsDialog({ open, stats, onClose }: StatsDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Stats</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <ReadingGoalCard read={stats.todayPagesRead} goal={stats.todayPageGoal} />
          <XPProgressCard totalXP={stats.totalXP} currentLevel={stats.currentLevel} nextLevelXP={stats.nextLevelXP} />
          <Grid container spacing={2}>
            <Grid size={6}>
              <ProgressStatCard label="Books finished" value={`${stats.booksFinishedThisMonth}`} progress={75} helper="This month" />
            </Grid>
            <Grid size={6}>
              <ProgressStatCard label="Notes created" value={`${stats.notesCreatedThisWeek}`} progress={60} helper="This week" />
            </Grid>
            <Grid size={12}>
              <ProgressStatCard
                label="Study group contribution"
                value={`${stats.groupContributions}`}
                progress={60}
                helper="Shared wisdom grows in conversation."
              />
            </Grid>
          </Grid>
          <WeeklyReadingChart weeklyPages={stats.weeklyPages} />
          <AchievementList />
          <XpPhilosophyCard />
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
