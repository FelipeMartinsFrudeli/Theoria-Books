import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material'
import type { GroupMember } from '@features/study-groups/types/study-group.types'

type MemberProgressListProps = {
  members: GroupMember[]
}

export function MemberProgressList({ members }: MemberProgressListProps) {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <Typography variant="h6">Members on the path</Typography>
      <List dense>
        {members.map((member) => (
          <ListItem key={member.id} disableGutters>
            <ListItemAvatar>
              <Avatar>{member.avatar}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={member.name} secondary={`${member.pagesRead} pages read`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
