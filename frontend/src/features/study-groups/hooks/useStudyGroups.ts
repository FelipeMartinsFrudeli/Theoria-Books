import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { studyGroupsService } from '@features/study-groups/services/study-groups.service'
import type { CreateStudyGroupInput } from '@features/study-groups/types/study-group.types'

export const studyGroupsQueryKey = ['study-groups']

export function useStudyGroups() {
  return useQuery({ queryKey: studyGroupsQueryKey, queryFn: studyGroupsService.getGroups })
}

export function useGroupDetail(groupId?: string) {
  return useQuery({
    queryKey: ['study-group', groupId],
    queryFn: () => studyGroupsService.getGroupDetail(groupId ?? ''),
    enabled: Boolean(groupId),
  })
}

export function useCreateStudyGroup() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateStudyGroupInput) => studyGroupsService.createGroup(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: studyGroupsQueryKey }),
  })
}
