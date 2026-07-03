import { Button, Paper, Stack, Typography } from '@mui/material'
import { MessageCircle } from 'lucide-react'
import { SpoilerLockedComment } from '@features/study-groups/components/SpoilerLockedComment'
import type { Discussion } from '@features/study-groups/types/study-group.types'

type DiscussionListProps = {
  discussions: Discussion[]
  userCurrentPage: number
}

export function DiscussionList({ discussions, userCurrentPage }: DiscussionListProps) {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <MessageCircle size={20} />
            <Typography variant="h6">Discussion</Typography>
          </Stack>
          <Button variant="outlined">Share an insight</Button>
        </Stack>
        {discussions.map((discussion) =>
          discussion.pageNumber > userCurrentPage ? (
            <SpoilerLockedComment key={discussion.id} pageNumber={discussion.pageNumber} />
          ) : (
            <Stack key={discussion.id} spacing={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 800 }}>
                {discussion.author} • page {discussion.pageNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {discussion.body}
              </Typography>
            </Stack>
          ),
        )}
      </Stack>
    </Paper>
  )
}
