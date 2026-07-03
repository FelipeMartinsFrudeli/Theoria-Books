export function formatPercent(value: number) {
  return `${Math.round(value)}%`
}

export function formatFileSize(bytes?: number) {
  if (!bytes) return 'Unknown size'
  if (bytes < 1_000_000) return `${Math.round(bytes / 1_000)} KB`
  return `${(bytes / 1_000_000).toFixed(1)} MB`
}
