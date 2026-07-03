import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material'
import { useForm, type Resolver } from 'react-hook-form'
import { FormSelectField } from '@shared/components/forms/FormSelectField'
import { FormTextField } from '@shared/components/forms/FormTextField'
import { addBookSchema, type AddBookFormValues } from '@features/books/schemas/book.schemas'
import { useCreateBook } from '@features/books/hooks/useBooks'

type AddBookDialogProps = {
  open: boolean
  onClose: () => void
}

export function AddBookDialog({ open, onClose }: AddBookDialogProps) {
  const createBook = useCreateBook()
  const { control, handleSubmit, reset } = useForm<AddBookFormValues>({
    resolver: zodResolver(addBookSchema) as Resolver<AddBookFormValues>,
    defaultValues: {
      title: '',
      author: '',
      description: '',
      totalPages: 1,
      category: '',
      coverUrl: '',
      sourceType: 'manual',
      status: 'reading',
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    await createBook.mutateAsync(values)
    reset()
    onClose()
  })

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add book</DialogTitle>
      <DialogContent>
        <Stack component="form" spacing={2} sx={{ pt: 1 }} onSubmit={onSubmit}>
          <FormTextField control={control} name="title" label="Title" />
          <FormTextField control={control} name="author" label="Author" />
          <FormTextField control={control} name="description" label="Description" multiline minRows={3} />
          <FormTextField control={control} name="totalPages" label="Total pages" type="number" />
          <FormTextField control={control} name="category" label="Category" />
          <FormTextField control={control} name="coverUrl" label="Cover URL" />
          <FormSelectField
            control={control}
            name="status"
            label="Status"
            options={[
              { label: 'Reading', value: 'reading' },
              { label: 'Finished', value: 'finished' },
              { label: 'Paused', value: 'paused' },
              { label: 'Want to read', value: 'want-to-read' },
            ]}
          />
          <DialogActions sx={{ px: 0 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={createBook.isPending}>
              Add book
            </Button>
          </DialogActions>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
