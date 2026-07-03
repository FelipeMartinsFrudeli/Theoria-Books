import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import { FileText } from 'lucide-react'
import { useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { FormTextField } from '@shared/components/forms/FormTextField'
import { useImportPdfBook } from '@features/books/hooks/useBooks'
import { importPdfSchema, type ImportPdfFormValues } from '@features/books/schemas/book.schemas'
import { createPdfLocalPreview } from '@features/books/services/pdf-local.service'

type ImportPdfDialogProps = {
  open: boolean
  onClose: () => void
}

type SelectedPdf = {
  file: File
  localFilePath: string
  localObjectUrl: string
  totalPages: number
  coverDataUrl: string
}

export function ImportPdfDialog({ open, onClose }: ImportPdfDialogProps) {
  const importBook = useImportPdfBook()
  const [selectedPdf, setSelectedPdf] = useState<SelectedPdf>()
  const [isReadingPdf, setIsReadingPdf] = useState(false)
  const { control, getValues, reset, setValue, trigger } = useForm<ImportPdfFormValues>({
    resolver: zodResolver(importPdfSchema) as Resolver<ImportPdfFormValues>,
    defaultValues: {
      title: '',
    },
  })

  const resetDialog = () => {
    reset()
    setSelectedPdf(undefined)
    setIsReadingPdf(false)
  }

  const closeDialog = () => {
    resetDialog()
    onClose()
  }

  const handleFile = async (selectedFile: File | undefined, localFilePath: string) => {
    if (!selectedFile) return

    const detectedTitle = selectedFile.name.replace(/\.pdf$/i, '')
    if (!getValues('title').trim()) {
      setValue('title', detectedTitle)
    }

    setIsReadingPdf(true)
    const preview = await createPdfLocalPreview(selectedFile)
    setSelectedPdf({
      file: selectedFile,
      localFilePath: localFilePath || selectedFile.name,
      localObjectUrl: URL.createObjectURL(selectedFile),
      totalPages: preview.totalPages,
      coverDataUrl: preview.coverDataUrl,
    })
    setIsReadingPdf(false)
  }

  const savePdf = async () => {
    if (!selectedPdf) return

    const isValid = await trigger('title')
    if (!isValid) return

    const title = getValues('title').trim()
    await importBook.mutateAsync({
      title,
      totalPages: selectedPdf.totalPages,
      coverUrl: selectedPdf.coverDataUrl,
      localFileName: selectedPdf.file.name,
      localFilePath: selectedPdf.localFilePath,
      localObjectUrl: selectedPdf.localObjectUrl,
      fileSize: selectedPdf.file.size,
    })

    closeDialog()
  }

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth>
      <DialogTitle>Import PDF</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Title and page count will be imported automatically from the selected PDF.
          </Typography>
          <Button variant="outlined" component="label" disabled={isReadingPdf || importBook.isPending} startIcon={<FileText size={18} />}>
            Select file
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={(event) => handleFile(event.target.files?.[0], event.currentTarget.value)}
            />
          </Button>
          {selectedPdf ? <FormTextField control={control} name="title" label="Title" /> : null}
          {isReadingPdf ? (
            <Typography variant="body2" color="text.secondary">
              Reading first page...
            </Typography>
          ) : null}
          {selectedPdf ? (
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Box
                component="img"
                src={selectedPdf.coverDataUrl}
                alt="PDF first page cover"
                sx={{
                  width: 88,
                  height: 128,
                  objectFit: 'cover',
                  borderRadius: 2,
                  bgcolor: '#FFFFFF',
                }}
              />
              <Stack spacing={0.5}>
                <Typography variant="body2" sx={{ fontWeight: 800 }}>
                  {selectedPdf.file.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedPdf.totalPages} pages detected
                </Typography>
              </Stack>
            </Stack>
          ) : null}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button variant="contained" onClick={savePdf} disabled={!selectedPdf || importBook.isPending}>
          Save PDF
        </Button>
      </DialogActions>
    </Dialog>
  )
}
