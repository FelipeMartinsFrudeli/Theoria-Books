import { Chip, Stack } from '@mui/material'

type BookCategoryChipsProps = {
  categories: string[]
}

export function BookCategoryChips({ categories }: BookCategoryChipsProps) {
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
      {categories.map((category) => (
        <Chip key={category} label={category} size="small" />
      ))}
    </Stack>
  )
}
