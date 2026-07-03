import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import type { GroupMember } from '@features/study-groups/types/study-group.types'

type GroupLeaderboardProps = {
  members: GroupMember[]
}

export function GroupLeaderboard({ members }: GroupLeaderboardProps) {
  const ranked = [...members].sort((a, b) => b.pagesRead - a.pagesRead)

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <Typography variant="h6">Leaderboard</Typography>
      <Typography variant="body2" color="text.secondary">
        Contribution is measured gently. Understanding matters more than rushing.
      </Typography>
      <List dense>
        {ranked.map((member, index) => (
          <ListItem key={member.id} disableGutters>
            <ListItemText primary={`${index + 1}. ${member.name}`} secondary={`${member.pagesRead} pages`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
