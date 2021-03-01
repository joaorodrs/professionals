import React, { useState } from 'react'

import { AppBar, Toolbar, IconButton, Typography, Drawer, Button } from '@material-ui/core'
import { Menu, GitHub } from '@material-ui/icons'

export const Home = () => {
  const [component, setComponent] = useState('Professionals')
  const [showDrawer, setShowDrawer] = useState(false)

  function toggleDrawer() {
    setShowDrawer(!showDrawer)
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">
            Componente exibido
          </Typography>
          <Button style={{ marginLeft: 'auto' }} color="inherit">Sobre</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={showDrawer}
        onClose={toggleDrawer}
      >
        Something in the drawer
      </Drawer>
    </div>
  )
}