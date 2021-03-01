import React from 'react'

import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { Menu, GitHub } from '@material-ui/icons'

export const Home = () => {
  const [component, setComponent] = useState('Professionals')

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">
            Componente exibido
          </Typography>
          <IconButton>
            <GitHub />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}