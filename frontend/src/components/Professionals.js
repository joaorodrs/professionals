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
  Button,
  MenuItem,
  Checkbox
} from '@material-ui/core'

import { phoneMask } from '../utils/masks'

import { NoSim, Add } from '@material-ui/icons'

import { Alert } from '@material-ui/lab'

import { api } from '../services/api'

export const Professionals = ({ toggleLoading, isVisible, loading }) => {
  const [data, setData] = useState([])
  const [professionalTypes, setProfessionalTypes] = useState([])
  const [error, setError] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const [showCreateProfessional, setShowCreateProfessional] = useState(false)

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [professionalType, setProfessionalType] = useState('')

  async function loadData() {
    toggleLoading(true)

    try {
      const response = await api.get('professional', { timeout: 10000 })
      const professionalTypeResponse = await api.get('professional-type', { timeout: 10000 })

      setData(response.data)
      setProfessionalTypes(professionalTypeResponse.data)
      toggleLoading(false)
      setShowErrorAlert(false)
    } catch(err) {
      setError(true)
      setShowErrorAlert(true)
      toggleLoading(false)
    }
  }

  useEffect(() => loadData(), [isVisible])

  function onSubmit() {}
  
  return (
    <>
      {data.length === 0 || error ? (
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <NoSim fontSize="large" color="primary" />
          <Typography variant="h6">Sem dados por ora...</Typography>
        </Box>
      ) : loading ? null : (
        <TableContainer component={Card} style={{ width: 'fit-content' }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Telefone</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Tipo de profissional</TableCell>
                <TableCell align="center">Situação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => (
                <TableRow tabIndex={-1} key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.phoneNumber}</TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" color="primary">{item.professionalType}</Button>
                  </TableCell>
                  <TableCell align="center">
                    <Card variant="outlined" style={{ width: 'fit-content', padding: '5px 15px' }}>{item.situation ? 'OK' : 'Irregular'}</Card>
                  </TableCell>
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
          Não foi possível carregar os profissionais
        </Alert>
      </Snackbar>
      <Tooltip title="Criar profissional" aria-label="criar">
        <Fab
          color="primary"
          style={{ position: 'absolute', bottom: 50, right: 50 }}
          onClick={() => setShowCreateProfessional(true)}
        >
          <Add />
        </Fab>
      </Tooltip>
      <Dialog
        open={showCreateProfessional}
        onClose={() => setShowCreateProfessional(false)}
        aria-labelledby="criar-tipo-de-profissional"
      >
        <DialogTitle>Criar profissional</DialogTitle>
        <DialogContent style={{ width: 250 }}>
          <form noValidate style={{ display: 'flex', flexDirection: 'column' }} autoComplete="off">
            <TextField
              required label="Nome"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <TextField
              label="Telefone"
              value={phoneNumber}
              onChange={event => setPhoneNumber(phoneMask(event.target.value))}
            />
            <TextField required label="Email" />
            <TextField
              required
              select
              label="Tipo de profissional"
              variant="outlined"
              style={{ marginTop: 20 }}
              onChange={event => setProfessionalType(event.target.value)}
            >
              {professionalTypes.map(professionalType => (
                <MenuItem key={professionalType.id} value={professionalType.description}>
                  {professionalType.description}
                </MenuItem>
              ))}
            </TextField>
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