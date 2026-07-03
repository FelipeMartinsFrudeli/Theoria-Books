import { Button, type ButtonProps } from '@mui/material'

export function PillButton(props: ButtonProps) {
  return <Button variant="contained" {...props} sx={{ borderRadius: 12, ...props.sx }} />
}
