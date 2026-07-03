import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { ChartNoAxesColumnIncreasing, Library, NotebookPen, Users } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { palette, softShadow } from '@shared/styles/theme'

const items = [
  { label: 'Books', path: '/books', icon: Library },
  { label: 'Notes', path: '/notes', icon: NotebookPen },
  { label: 'Streak', path: '/tracker', icon: ChartNoAxesColumnIncreasing },
  { label: 'Groups', path: '/study-groups', icon: Users },
]

export function BottomTabNavigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const active = items.find((item) => location.pathname.startsWith(item.path))?.path ?? '/books'

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 16,
        borderRadius: 16,
        boxShadow: softShadow,
        overflow: 'hidden',
      }}
    >
      <BottomNavigation
        value={active}
        onChange={(_, value: string) => navigate(value)}
        sx={{ height: 72, bgcolor: '#FFFFFF' }}
      >
        {items.map((item) => {
          const Icon = item.icon
          return (
            <BottomNavigationAction
              key={item.path}
              label={item.label}
              value={item.path}
              icon={<Icon size={22} />}
              sx={{
                color: palette.mutedText,
                '&.Mui-selected': {
                  color: palette.primaryDark,
                },
              }}
            />
          )
        })}
      </BottomNavigation>
    </Paper>
  )
}
