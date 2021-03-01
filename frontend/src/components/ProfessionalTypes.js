import React, { useState, useEffect } from 'react'

import {
  TableContainer,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Typography,
  Box,
  Tooltip,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button
} from '@material-ui/core'

import { NoSim, Add } from '@material-ui/icons'

import { Alert } from '@material-ui/lab'

import { api } from '../services/api'

export const ProfessionalTypes = ({ toggleLoading, isVisible, loading }) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const [showCreateProfessionalType, setShowCreateProfessionalType] = useState(false)

  async function loadData() {
    toggleLoading(true)

    try {
      const response = await api.get('professional-type', { timeout: 10000 })

      setData(response.data)
      toggleLoading(false)
      setShowErrorAlert(false)
    } catch(err) {
      setError(true)
      setShowErrorAlert(true)
      toggleLoading(false)
    }
  }

  useEffect(() => loadData(), [isVisible])
  
  return (
    <>
      {data.length === 0 || error ? (
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <NoSim fontSize="large" color="primary" />
          <Typography variant="h6">Sem dados por ora...</Typography>
        </Box>
      ) : loading ? null : (
        <TableContainer component={Card}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Descrição</TableCell>
                <TableCell align="center">Telefone</TableCell>
                <TableCell align="center">Situação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell align="center">{item.phoneNumber}</TableCell>
                  <TableCell align="center">{item.situation ? 'OK' : 'Irregular'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar open={showErrorAlert} autoHideDuration={5000} onClose={() => setShowErrorAlert(false)}>
        <Alert
          onClose={() => setShowErrorAlert(false)}
          severity="error"
          elevation={6}
          variant="filled"
        >
          Não foi possível carregar os tipos de profissional
        </Alert>
      </Snackbar>
      <Tooltip title="Criar tipo de profissional" aria-label="criar">
        <Fab
          color="primary"
          style={{ position: 'absolute', bottom: 50, right: 50 }}
          onClick={() => setShowCreateProfessionalType(true)}
        >
          <Add />
        </Fab>
      </Tooltip>
      <Dialog
        open={showCreateProfessionalType}
        onClose={() => setShowCreateProfessionalType(false)}
        aria-labelledby="criar-tipo-de-profissional"
      >
        <DialogTitle>Criar tipo de profissional</DialogTitle>
        <DialogContent>
          <form noValidate style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField label="Descrição" />
            <TextField label="Telefone" />
            <TextField label="Descrição" />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20, marginBottom: 10 }}
            >
              Criar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}