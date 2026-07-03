import { IconButton, Stack, Typography } from '@mui/material'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { EmptyState } from '@shared/components/data-display/EmptyState'
import { PageContainer } from '@shared/components/layout/PageContainer'
import { DiscussionList } from '@features/study-groups/components/DiscussionList'
import { GroupLeaderboard } from '@features/study-groups/components/GroupLeaderboard'
import { GroupProgressCard } from '@features/study-groups/components/GroupProgressCard'
import { MemberProgressList } from '@features/study-groups/components/MemberProgressList'
import { WeeklyChallengeCard } from '@features/study-groups/components/WeeklyChallengeCard'
import { useGroupDetail } from '@features/study-groups/hooks/useStudyGroups'

export function StudyGroupDetailScreen() {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const { data: group } = useGroupDetail(groupId)

  if (!group) {
    return (
      <PageContainer>
        <EmptyState title="Group not found" description="This study circle is no longer available." />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <Stack spacing={3}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <IconButton onClick={() => navigate('/study-groups')}>
            <ArrowLeft size={22} />
          </IconButton>
          <Stack>
            <Typography variant="h4">{group.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Current reading: {group.currentBookTitle}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="body1" color="text.secondary">
          {group.description}
        </Typography>
        <WeeklyChallengeCard challenge={group.weeklyChallenge} />
        <GroupProgressCard group={group} />
        <MemberProgressList members={group.members} />
        <DiscussionList discussions={group.discussions} userCurrentPage={84} />
        <GroupLeaderboard members={group.members} />
      </Stack>
    </PageContainer>
  )
}
