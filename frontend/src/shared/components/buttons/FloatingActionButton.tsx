import { IconButton, type IconButtonProps } from '@mui/material'
import { softShadow } from '@shared/styles/theme'

export function FloatingActionButton(props: IconButtonProps) {
  return (
    <IconButton
      {...props}
      sx={{
        bgcolor: 'rgba(255,255,255,0.84)',
        boxShadow: softShadow,
        backdropFilter: 'blur(12px)',
        '&:hover': { bgcolor: '#FFFFFF' },
        ...props.sx,
      }}
    />
  )
}
