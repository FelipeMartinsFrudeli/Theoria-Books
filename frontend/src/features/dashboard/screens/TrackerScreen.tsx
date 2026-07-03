import { Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { PageContainer } from '@shared/components/layout/PageContainer'
import { StatsDialog } from '@features/dashboard/components/StatsDialog'
import { StreakCard } from '@features/dashboard/components/StreakCard'
import { TrackerTaskList } from '@features/dashboard/components/TrackerTaskList'
import { useDashboardStats } from '@features/dashboard/hooks/useDashboardStats'

export function TrackerScreen() {
  const { data: stats } = useDashboardStats()
  const [statsOpen, setStatsOpen] = useState(false)

  if (!stats) return null

  return (
    <PageContainer>
      <Stack spacing={3}>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Stack spacing={1}>
            <Typography variant="h4">Tracker</Typography>
            <Typography variant="body1" color="text.secondary">
              Today’s practice shapes tomorrow’s wisdom.
            </Typography>
          </Stack>
          <Button variant="outlined" onClick={() => setStatsOpen(true)}>
            Stats
          </Button>
        </Stack>
        <StreakCard streak={stats.streak} />
        <TrackerTaskList />
      </Stack>
      <StatsDialog open={statsOpen} stats={stats} onClose={() => setStatsOpen(false)} />
    </PageContainer>
  )
}
