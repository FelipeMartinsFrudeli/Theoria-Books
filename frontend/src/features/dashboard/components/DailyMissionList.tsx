import { List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material'
import { CheckCircle2, Circle } from 'lucide-react'
import { missions } from '@features/dashboard/services/dashboard.service'

export function DailyMissionList() {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <Typography variant="h6">Today’s practice</Typography>
      <List dense>
        {missions.map((mission) => (
          <ListItem key={mission.id} disableGutters>
            <ListItemIcon sx={{ minWidth: 32 }}>
              {mission.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </ListItemIcon>
            <ListItemText primary={mission.label} secondary="Understanding matters more than rushing." />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
