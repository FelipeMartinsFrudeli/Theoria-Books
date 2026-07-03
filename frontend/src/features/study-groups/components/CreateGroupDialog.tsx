import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FormSelectField } from '@shared/components/forms/FormSelectField'
import { FormTextField } from '@shared/components/forms/FormTextField'
import { useCreateStudyGroup } from '@features/study-groups/hooks/useStudyGroups'
import { createStudyGroupSchema, type CreateStudyGroupFormValues } from '@features/study-groups/schemas/study-group.schemas'

type CreateGroupDialogProps = {
  open: boolean
  onClose: () => void
}

export function CreateGroupDialog({ open, onClose }: CreateGroupDialogProps) {
  const createGroup = useCreateStudyGroup()
  const { control, handleSubmit, reset } = useForm<CreateStudyGroupFormValues>({
    resolver: zodResolver(createStudyGroupSchema),
    defaultValues: {
      name: '',
      description: '',
      currentBookId: 'meditations',
      privacy: 'public',
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    await createGroup.mutateAsync(values)
    reset()
    onClose()
  })

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Create study circle</DialogTitle>
      <DialogContent>
        <Stack component="form" spacing={2} sx={{ pt: 1 }} onSubmit={onSubmit}>
          <FormTextField control={control} name="name" label="Group name" />
          <FormTextField control={control} name="description" label="Description" multiline minRows={3} />
          <FormSelectField
            control={control}
            name="currentBookId"
            label="Current book"
            options={[
              { label: 'Meditations', value: 'meditations' },
              { label: 'The Psychology of Money', value: 'psychology-money' },
              { label: 'Clean Architecture', value: 'clean-architecture' },
              { label: 'Atomic Habits', value: 'atomic-habits' },
            ]}
          />
          <FormSelectField
            control={control}
            name="privacy"
            label="Privacy"
            options={[
              { label: 'Public', value: 'public' },
              { label: 'Private', value: 'private' },
            ]}
          />
          <DialogActions sx={{ px: 0 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={createGroup.isPending}>
              Create group
            </Button>
          </DialogActions>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
