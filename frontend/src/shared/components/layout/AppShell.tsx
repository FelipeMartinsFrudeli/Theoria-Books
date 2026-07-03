import { Box } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import { MobilePage } from '@shared/components/layout/MobilePage'
import { BottomTabNavigation } from '@shared/components/navigation/BottomTabNavigation'

const tabRoutes = ['/books', '/notes', '/tracker', '/study-groups']

export function AppShell() {
  const location = useLocation()
  const showTabs = tabRoutes.some((route) => location.pathname === route || location.pathname.startsWith(`${route}/`))

  return (
    <MobilePage>
      <Box sx={{ minHeight: '100vh', maxHeight: '100vh', overflowY: 'auto' }}>
        <Outlet />
      </Box>
      {showTabs ? <BottomTabNavigation /> : null}
    </MobilePage>
  )
}
