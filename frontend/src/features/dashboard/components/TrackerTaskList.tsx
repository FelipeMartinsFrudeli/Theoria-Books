import { Checkbox, List, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { missions } from '@features/dashboard/services/dashboard.service'

export function TrackerTaskList() {
  const [completedIds, setCompletedIds] = useState(() => new Set(missions.filter((mission) => mission.completed).map((mission) => mission.id)))

  const toggleMission = (missionId: string) => {
    setCompletedIds((current) => {
      const next = new Set(current)
      if (next.has(missionId)) {
        next.delete(missionId)
      } else {
        next.add(missionId)
      }
      return next
    })
  }

  return (
    <Paper elevation={0} sx={{ p: 1, borderRadius: 3 }}>
      <Stack spacing={1} sx={{ px: 1, pt: 1 }}>
        <Typography variant="h6">Today</Typography>
        <Typography variant="body2" color="text.secondary">
          A quiet list for the practice you intend to keep.
        </Typography>
      </Stack>
      <List disablePadding>
        {missions.map((mission) => {
          const checked = completedIds.has(mission.id)
          return (
            <ListItemButton key={mission.id} onClick={() => toggleMission(mission.id)} sx={{ borderRadius: 2, my: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Checkbox edge="start" checked={checked} tabIndex={-1} disableRipple />
              </ListItemIcon>
              <ListItemText
                primary={mission.label}
                secondary="Today’s practice"
                sx={{ textDecoration: checked ? 'line-through' : 'none' }}
              />
            </ListItemButton>
          )
        })}
      </List>
    </Paper>
  )
}
