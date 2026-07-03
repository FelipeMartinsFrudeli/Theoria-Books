import { Avatar, AvatarGroup, Button, Card, CardContent, LinearProgress, Stack, Typography } from '@mui/material'
import { Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { StudyGroup } from '@features/study-groups/types/study-group.types'

type StudyGroupCardProps = {
  group: StudyGroup
}

export function StudyGroupCard({ group }: StudyGroupCardProps) {
  const navigate = useNavigate()

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
            <Stack spacing={0.5}>
              <Typography variant="h6">{group.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Current reading: {group.currentBookTitle}
              </Typography>
            </Stack>
            <Users size={22} />
          </Stack>
          <Typography variant="body2">{group.description}</Typography>
          <Stack spacing={0.75}>
            <Typography variant="caption" color="text.secondary">
              Shared progress • {group.groupProgress}%
            </Typography>
            <LinearProgress variant="determinate" value={group.groupProgress} sx={{ height: 8, borderRadius: 2 }} />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Weekly challenge: {group.weeklyChallenge}
          </Typography>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <AvatarGroup max={4}>
              {group.members.map((member) => (
                <Avatar key={member.id}>{member.avatar}</Avatar>
              ))}
            </AvatarGroup>
            <Button variant="contained" onClick={() => navigate(`/study-groups/${group.id}`)}>
              Open circle
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
