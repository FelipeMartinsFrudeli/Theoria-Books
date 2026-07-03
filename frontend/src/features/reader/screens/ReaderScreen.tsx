import { Alert, Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EmptyState } from '@shared/components/data-display/EmptyState'
import { PrivacyBadge } from '@shared/components/data-display/PrivacyBadge'
import { PageContainer } from '@shared/components/layout/PageContainer'
import { useBook, useUpdateReadingProgress } from '@features/books/hooks/useBooks'
import { calculateSessionXp } from '@features/reader/services/reader.service'
import { ReaderControls } from '@features/reader/components/ReaderControls'
import { ReaderPage } from '@features/reader/components/ReaderPage'
import { ReaderPrivacyNotice } from '@features/reader/components/ReaderPrivacyNotice'
import { ReaderProgressBar } from '@features/reader/components/ReaderProgressBar'
import { ReaderSessionSummary } from '@features/reader/components/ReaderSessionSummary'
import { ReaderToolbar } from '@features/reader/components/ReaderToolbar'
import { useReaderSession } from '@features/reader/hooks/useReaderSession'

export function ReaderScreen() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const { data: book } = useBook(bookId)
  const updateProgress = useUpdateReadingProgress()
  const reader = useReaderSession(book)
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [pdfObjectUrl, setPdfObjectUrl] = useState<string>()

  if (!book || !reader.session) {
    return (
      <PageContainer>
        <EmptyState title="Reader unavailable" description="This reading path could not be opened." />
      </PageContainer>
    )
  }
  const session = reader.session
  const pdfUrl = pdfObjectUrl ?? book.localObjectUrl

  if (book.sourceType === 'pdf') {
    return (
      <PageContainer pb={3}>
        <Stack spacing={2}>
          <IconButton
            aria-label="Back"
            onClick={() => navigate(`/books/${book.id}`)}
            sx={{ alignSelf: 'flex-start', bgcolor: 'rgba(255,255,255,0.84)' }}
          >
            <ArrowLeft size={22} />
          </IconButton>
          <Stack spacing={0.5}>
            <Typography variant="h5">{book.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {book.totalPages} pages • PDF never leaves your device
            </Typography>
          </Stack>
          {pdfUrl ? (
            <Box
              component="iframe"
              src={pdfUrl}
              title={`${book.title} PDF reader`}
              sx={{
                width: '100%',
                height: 'calc(100vh - 180px)',
                minHeight: 560,
                border: 0,
                borderRadius: 3,
                bgcolor: '#FFFFFF',
              }}
            />
          ) : (
            <Alert
              severity="info"
              action={
                <Button component="label" size="small">
                  Select PDF
                  <input
                    type="file"
                    accept="application/pdf"
                    hidden
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      if (file) setPdfObjectUrl(URL.createObjectURL(file))
                    }}
                  />
                </Button>
              }
            >
              The local file reference is saved, but the browser needs the PDF selected again after a reload.
            </Alert>
          )}
        </Stack>
      </PageContainer>
    )
  }

  const finishSession = async () => {
    await updateProgress.mutateAsync({
      bookId: book.id,
      currentPage: session.currentPage,
      sequentialPagesRead: session.sequentialPagesRead,
    })
    setSummaryOpen(true)
  }

  return (
    <PageContainer>
      <Stack spacing={3}>
        <ReaderToolbar title={book.title} onBookmark={reader.bookmarkPage} />
        {book.localOnlyFile ? (
          <Stack spacing={1}>
            <PrivacyBadge label="Only progress and metadata are synced" />
            <ReaderPrivacyNotice />
          </Stack>
        ) : null}
        <ReaderProgressBar currentPage={session.currentPage} totalPages={book.totalPages} />
        <ReaderPage currentPage={session.currentPage} title={book.title} fileName={book.localFileName} />
        <Typography variant="caption" color="text.secondary">
          Large page jumps update location only. XP is earned through sequential reading.
        </Typography>
        <ReaderControls
          currentPage={session.currentPage}
          onPrevious={reader.previousPage}
          onNext={reader.nextPage}
          onJump={reader.jumpToPage}
          onFinish={finishSession}
        />
      </Stack>
      <ReaderSessionSummary
        open={summaryOpen}
        pagesRead={session.sequentialPagesRead}
        xpEarned={calculateSessionXp(session.sequentialPagesRead)}
        onClose={() => navigate(`/books/${book.id}`)}
      />
    </PageContainer>
  )
}
