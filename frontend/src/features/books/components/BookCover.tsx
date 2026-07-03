import { Box, Typography } from '@mui/material'
import { palette, softShadow } from '@shared/styles/theme'

type BookCoverProps = {
  title: string
  author: string
  coverUrl?: string
  large?: boolean
}

export function BookCover({ title, author, coverUrl, large = false }: BookCoverProps) {
  const initials = title
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')

  if (coverUrl) {
    return (
      <Box
        component="img"
        src={coverUrl}
        alt={`${title} cover`}
        sx={{
          width: large ? 168 : 88,
          height: large ? 232 : 128,
          borderRadius: 2,
          objectFit: 'cover',
          boxShadow: softShadow,
        }}
      />
    )
  }

  return (
    <Box
      sx={{
        width: large ? 168 : 88,
        height: large ? 232 : 128,
        borderRadius: 2,
        boxShadow: softShadow,
        bgcolor: palette.primaryDark,
        color: '#FFFFFF',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant={large ? 'h4' : 'h6'}>{initials}</Typography>
      <Box>
        <Typography variant="caption" sx={{ display: 'block', fontWeight: 800 }}>
          {title}
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.72)' }}>
          {author}
        </Typography>
      </Box>
    </Box>
  )
}
