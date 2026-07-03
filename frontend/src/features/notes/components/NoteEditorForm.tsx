import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@mui/material'
import { useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FormSelectField } from '@shared/components/forms/FormSelectField'
import { FormSwitchField } from '@shared/components/forms/FormSwitchField'
import { FormTextField } from '@shared/components/forms/FormTextField'
import { BacklinksPanel } from '@features/notes/components/BacklinksPanel'
import { MarkdownPreview } from '@features/notes/components/MarkdownPreview'
import { NoteTemplateMenu } from '@features/notes/components/NoteTemplateMenu'
import { noteSchema, type NoteFormValues } from '@features/notes/schemas/note.schemas'
import type { Note } from '@features/notes/types/note.types'

const bookOptions = [
  { label: 'The Psychology of Money', value: 'psychology-money' },
  { label: 'Atomic Habits', value: 'atomic-habits' },
  { label: 'Meditations', value: 'meditations' },
  { label: 'Clean Architecture', value: 'clean-architecture' },
]

type NoteEditorFormProps = {
  initialNote?: Note
  onSubmit: (values: NoteFormValues) => Promise<void>
  showCancel?: boolean
  saveLabel?: string
  onCancel?: () => void
}

export function NoteEditorForm({
  initialNote,
  onSubmit,
  showCancel = true,
  saveLabel = 'Save note',
  onCancel,
}: NoteEditorFormProps) {
  const navigate = useNavigate()
  const { control, handleSubmit, reset, watch, setValue } = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema) as Resolver<NoteFormValues>,
    defaultValues: {
      title: '',
      markdownContent: '',
      bookId: 'psychology-money',
      pageNumber: 1,
      chapter: '',
      tags: '',
      isPrivate: true,
      syncEnabled: false,
    },
  })
  const markdown = watch('markdownContent')

  useEffect(() => {
    if (initialNote) {
      reset({
        title: initialNote.title,
        markdownContent: initialNote.markdownContent,
        bookId: initialNote.bookId,
        pageNumber: initialNote.pageNumber,
        chapter: initialNote.chapter ?? '',
        tags: initialNote.tags.join(', '),
        isPrivate: initialNote.isPrivate,
        syncEnabled: initialNote.syncEnabled,
      })
    }
  }, [initialNote, reset])

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
        <NoteTemplateMenu onSelect={(template) => setValue('markdownContent', template)} />
        {showCancel ? (
          <Button variant="outlined" onClick={onCancel ?? (() => navigate('/notes'))}>
            Cancel
          </Button>
        ) : null}
      </Stack>
      <FormTextField control={control} name="title" label="Title" />
      <FormSelectField control={control} name="bookId" label="Linked book" options={bookOptions} />
      <Stack direction="row" spacing={1}>
        <FormTextField control={control} name="pageNumber" label="Page" type="number" />
        <FormTextField control={control} name="chapter" label="Chapter" />
      </Stack>
      <FormTextField control={control} name="tags" label="Tags" helperText="Separate tags with commas" />
      <FormTextField
        control={control}
        name="markdownContent"
        label="Markdown note"
        placeholder="Write what this page taught you..."
        multiline
        minRows={8}
      />
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
        <FormSwitchField control={control} name="isPrivate" label="Private note" />
        <FormSwitchField control={control} name="syncEnabled" label="Enable sync" />
      </Stack>
      <MarkdownPreview content={markdown} />
      <BacklinksPanel markdown={markdown} />
      <Button variant="contained" type="submit">
        {saveLabel}
      </Button>
    </Stack>
  )
}
