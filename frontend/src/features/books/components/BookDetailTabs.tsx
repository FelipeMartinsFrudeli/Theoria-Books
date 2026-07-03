import { Box, List, ListItem, ListItemText, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import { BookCategoryChips } from '@features/books/components/BookCategoryChips'
import { BookProgressCard } from '@features/books/components/BookProgressCard'
import type { Book } from '@features/books/types/book.types'

type BookDetailTabsProps = {
  book: Book
}

export function BookDetailTabs({ book }: BookDetailTabsProps) {
  const [tab, setTab] = useState(0)

  return (
    <Stack spacing={2}>
      <Tabs value={tab} onChange={(_, value: number) => setTab(value)} variant="scrollable">
        <Tab label="About" />
        <Tab label="Outline" />
        <Tab label="Notes" />
        <Tab label="Progress" />
      </Tabs>
      {tab === 0 ? (
        <Stack spacing={2}>
          <BookCategoryChips categories={book.categories} />
          <Box>
            <Typography variant="h6">About this book</Typography>
            <Typography variant="body2" color="text.secondary">
              {book.description}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Main ideas</Typography>
            <Typography variant="body2" color="text.secondary">
              These are the ideas this book invites you to revisit.
            </Typography>
          </Box>
        </Stack>
      ) : null}
      {tab === 1 ? (
        <Stack spacing={1}>
          <Typography variant="h6">Reading path</Typography>
          <Typography variant="body2" color="text.secondary">
            Each chapter is a step in your practice.
          </Typography>
          <List dense>
            {book.chapters.map((chapter, index) => (
              <ListItem key={chapter}>
                <ListItemText primary={`${index + 1}. ${chapter}`} secondary="Return when the idea asks for attention." />
              </ListItem>
            ))}
          </List>
        </Stack>
      ) : null}
      {tab === 2 ? (
        <Stack spacing={1}>
          <Typography variant="h6">Linked notes</Typography>
          <Typography variant="body2" color="text.secondary">
            No notes yet. Capture the thought before it disappears.
          </Typography>
        </Stack>
      ) : null}
      {tab === 3 ? <BookProgressCard book={book} /> : null}
    </Stack>
  )
}
