import { Button, Stack, Typography } from '@mui/material'
import { Plus, Users } from 'lucide-react'
import { useState } from 'react'
import { EmptyState } from '@shared/components/data-display/EmptyState'
import { PageContainer } from '@shared/components/layout/PageContainer'
import { CreateGroupDialog } from '@features/study-groups/components/CreateGroupDialog'
import { StudyGroupCard } from '@features/study-groups/components/StudyGroupCard'
import { useStudyGroups } from '@features/study-groups/hooks/useStudyGroups'

export function StudyGroupsScreen() {
  const { data: groups = [] } = useStudyGroups()
  const [open, setOpen] = useState(false)

  return (
    <PageContainer>
      <Stack spacing={3}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Stack spacing={1}>
            <Typography variant="h4">Study Groups</Typography>
            <Typography variant="body1" color="text.secondary">
              Wisdom grows in conversation.
            </Typography>
          </Stack>
          <Button variant="contained" startIcon={<Plus size={18} />} onClick={() => setOpen(true)}>
            Create
          </Button>
        </Stack>
        {groups.length ? (
          <Stack spacing={2}>
            {groups.map((group) => (
              <StudyGroupCard key={group.id} group={group} />
            ))}
          </Stack>
        ) : (
          <EmptyState
            title="No study circles yet."
            description="Create a place where reading becomes dialogue."
            actionLabel="Create group"
            onAction={() => setOpen(true)}
            icon={<Users size={32} />}
          />
        )}
      </Stack>
      <CreateGroupDialog open={open} onClose={() => setOpen(false)} />
    </PageContainer>
  )
}
