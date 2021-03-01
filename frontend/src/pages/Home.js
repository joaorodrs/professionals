import React, { useState } from 'react'
import TrackVisibility from 'react-on-screen'

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  LinearProgress
} from '@material-ui/core'

import { Menu } from '@material-ui/icons'

import { Drawer } from '../components/Drawer'
import { ProfessionalTypes } from '../components/ProfessionalTypes'

export const Home = () => {
  const [component, setComponent] = useState('Tipos de profissional')
  const [showDrawer, setShowDrawer] = useState(false)
  const [loading, setLoading] = useState(false)

  function toggleDrawer() {
    setShowDrawer(!showDrawer)
  }

  function toggleComponent(componentName) {
    setComponent(componentName)
    setShowDrawer(false)
  }

  function toggleLoading(state) {
    setLoading(state)
  }

  function openProjectDetails() {
    window.open('https://github.com/joaorodrs/professional-finding', '_blank')
  }

  return (
    <div>
      <AppBar position="fixed">
        {loading && <LinearProgress style={{ width: '100vw', position: 'absolute' }} />}
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
            {component}
          </Typography>
          <Button
            style={{ marginLeft: 'auto' }}
            color="inherit"
            onClick={openProjectDetails}
          >
            Sobre
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer showDrawer={showDrawer} toggleDrawer={toggleDrawer} toggleComponent={toggleComponent} />
      <Container style={{ marginTop: 100 }}>
        {component === 'Tipos de profissional' ? (
          <TrackVisibility>
            <ProfessionalTypes toggleLoading={toggleLoading} loading={loading} />
          </TrackVisibility>
        ) : (
          <h1>Something</h1>
        )}
      </Container>
    </div>
  )
}