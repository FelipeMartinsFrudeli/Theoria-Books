import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url'

GlobalWorkerOptions.workerSrc = pdfWorkerUrl

export type PdfLocalPreview = {
  totalPages: number
  coverDataUrl: string
}

export async function createPdfLocalPreview(file: File): Promise<PdfLocalPreview> {
  const data = await file.arrayBuffer()
  const loadingTask = getDocument({ data })
  const document = await loadingTask.promise
  const totalPages = document.numPages
  const page = await document.getPage(1)
  const viewport = page.getViewport({ scale: 1 })
  const coverWidth = 360
  const scale = coverWidth / viewport.width
  const coverViewport = page.getViewport({ scale })
  const canvas = window.document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Canvas is not available in this browser.')
  }

  canvas.width = Math.floor(coverViewport.width)
  canvas.height = Math.floor(coverViewport.height)

  await page.render({
    canvas,
    canvasContext: context,
    viewport: coverViewport,
  }).promise

  const coverDataUrl = canvas.toDataURL('image/jpeg', 0.82)
  await loadingTask.destroy()

  return {
    totalPages,
    coverDataUrl,
  }
}
