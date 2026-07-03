import { Box, TextField, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import type { Note } from '@features/notes/types/note.types'

type NoteTextDraft = {
  title: string
  markdownContent: string
}

type NoteTextEditorProps = {
  note?: Note
  onSaveDraft: (draft: NoteTextDraft) => Promise<void>
}

export function NoteTextEditor({ note, onSaveDraft }: NoteTextEditorProps) {
  const [title, setTitle] = useState(note?.title ?? '')
  const [markdownContent, setMarkdownContent] = useState(note?.markdownContent ?? '')
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')
  const lastSavedDraft = useRef<NoteTextDraft>({ title: note?.title ?? '', markdownContent: note?.markdownContent ?? '' })

  useEffect(() => {
    const nextDraft = { title: note?.title ?? '', markdownContent: note?.markdownContent ?? '' }
    setTitle(nextDraft.title)
    setMarkdownContent(nextDraft.markdownContent)
    lastSavedDraft.current = nextDraft
    setSaveState('idle')
  }, [note?.id, note?.markdownContent, note?.title])

  useEffect(() => {
    const draft = { title, markdownContent }
    const hasChanged =
      draft.title !== lastSavedDraft.current.title || draft.markdownContent !== lastSavedDraft.current.markdownContent
    const hasText = draft.title.trim().length > 0 || draft.markdownContent.trim().length > 0

    if (!hasChanged || !hasText) return

    const timeout = window.setTimeout(async () => {
      setSaveState('saving')
      await onSaveDraft(draft)
      lastSavedDraft.current = draft
      setSaveState('saved')
    }, 800)

    return () => window.clearTimeout(timeout)
  }, [markdownContent, onSaveDraft, title])

  return (
    <Box>
      <TextField
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Untitled"
        variant="standard"
        slotProps={{
          input: {
            disableUnderline: true,
            sx: { typography: 'h4', fontWeight: 800 },
          },
        }}
      />
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
        {saveState === 'saving' ? 'Saving...' : saveState === 'saved' ? 'Saved' : 'Markdown editor'}
      </Typography>
      <TextField
        value={markdownContent}
        onChange={(event) => setMarkdownContent(event.target.value)}
        placeholder="Write what this page taught you..."
        multiline
        minRows={18}
        variant="standard"
        slotProps={{
          input: {
            disableUnderline: true,
            sx: {
              alignItems: 'flex-start',
              fontSize: 16,
              lineHeight: 1.8,
            },
          },
        }}
      />
    </Box>
  )
}
