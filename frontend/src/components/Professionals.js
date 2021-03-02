import React, { useState, useEffect } from 'react'

import * as Yup from 'yup'

import {
  TableContainer,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Box,
  Tooltip,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  DialogActions,
  MenuItem
} from '@material-ui/core'

import { NoSim, Add, Edit, Delete, FlashOnOutlined } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import { api } from '../services/api'
import { phoneMask } from '../utils/masks'

export const Professionals = ({ toggleLoading, isVisible, loading }) => {
  const [data, setData] = useState([])
  const [professionalTypes, setProfessionalTypes] = useState([])
  const [error, setError] = useState(false)
  const [errorAlert, setErrorAlert] = useState('')
  const [successAlert, setSuccessAlert] = useState('')
  const [validationError, setValidationError] = useState(false)

  const [showCreateProfessional, setShowCreateProfessional] = useState(false)
  const [editProfessional, setEditProfessional] = useState()
  const [deleteProfessional, setDeleteProfessional] = useState()

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [professionalType, setProfessionalType] = useState('')
  const [situation, setSituation] = useState('')

  async function loadData() {
    toggleLoading(true)

    try {
      const response = await api.get('professional', { timeout: 10000 })
      const professionalTypeResponse = await api.get('professional-type', { timeout: 10000 })

      setData(response.data)
      setProfessionalTypes(professionalTypeResponse.data)
      toggleLoading(false)
      setErrorAlert('')
      setError(false)
    } catch(err) {
      setError(true)
      setErrorAlert('Não foi possível carregar os tipos de profissionais')
      toggleLoading(false)
    }
  }

  useEffect(() => loadData(), [isVisible])

  async function onSubmit(event) {
    event.preventDefault()
    
    const professionalSchema = Yup.object().shape({
      name: Yup
        .string()
        .required('Preencha este campo'),
      phoneNumber: Yup
        .string(),
      email: Yup
        .string()
        .required(),
      professionalType: Yup
        .string()
        .required(),
      situation: Yup
        .string()
        .required()
    })

    const professional = {
      name,
      phoneNumber,
      email,
      professionalType,
      situation
    }

    try {
      await professionalSchema.validate(professional, { abortEarly: false })

      await api.post('professional', {
        ...professional,
        situation: situation === 'OK' ? true : false
      })

      loadData()
      setShowCreateProfessional(false)
      setValidationError(false)
      setErrorAlert('')
      
    } catch(err) {
      if (err instanceof Yup.ValidationError) {
        setValidationError(true)
      } else {
        setErrorAlert(`Não foi possível criar profissional (${err.response})`)
      }
    }
  }

  async function onSubmitEditing(event) {
    event.preventDefault()
    
    const professionalSchema = Yup.object().shape({
      name: Yup
        .string()
        .required(),
      phoneNumber: Yup
        .string(),
      email: Yup
        .string()
        .required(),
      professionalType: Yup
        .string()
        .required(),
      situation: Yup
        .string()
        .required(),
    })

    const professional = {
      name,
      phoneNumber,
      email,
      professionalType,
      situation
    }

    try {
      await professionalSchema.validate(professional, { abortEarly: false })

      await api.put(`professional/${editProfessional.id}`, {
        ...professional,
        situation: situation === 'OK' ? true : false
      })

      loadData()
      setEditProfessional(false)
      setValidationError(false)
      setErrorAlert('')
    } catch(err) {
      if (err instanceof Yup.ValidationError) {
        setValidationError(true)
      } else {
        setErrorAlert(`Não foi possível editar profissional (${err.response.status})`)
      }
    }
  }

  async function handleDeleteProfessional() {
    try {
      await api.delete(`professional/${deleteProfessional.id}`)

      setSuccessAlert(`${deleteProfessional.name} deletado com sucesso`)
      loadData()
      setDeleteProfessional()
      setErrorAlert('')
    } catch(err) {
      setErrorAlert('Não foi possível deletar o tipo de profissional')
      setDeleteProfessional()
    }
  }
  
  return (
    <>
      {data.length === 0 || error ? (
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <NoSim fontSize="large" color="primary" />
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
                <TableCell align="center" />
                <TableCell align="center" />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => (
                <TableRow key={item.id}>
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
                  <TableCell>
                    <IconButton onClick={() => {
                      setEditProfessional({ id: item.id, item })
                      setName(item.name)
                      setPhoneNumber(item.phoneNumber)
                      setEmail(item.email)
                      setProfessionalType(item.professionalType)
                      setSituation(item.situation ? 'OK' : 'Irregular')
                    }}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => setDeleteProfessional({ id: item.id, name: item.name })}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar open={!!errorAlert} autoHideDuration={5000} onClose={() => setErrorAlert('')}>
        <Alert
          onClose={() => setErrorAlert('')}
          severity="error"
          elevation={6}
          variant="filled"
        >
          {errorAlert}
        </Alert>
      </Snackbar>
      <Snackbar open={!!successAlert} autoHideDuration={5000} onClose={() => setSuccessAlert('')}>
        <Alert
          onClose={() => setSuccessAlert('')}
          severity="success"
          elevation={6}
          variant="filled"
        >
          {successAlert}
        </Alert>
      </Snackbar>
      <Tooltip title="Criar tipo de profissional" aria-label="criar">
        <Fab
          color="primary"
          style={{ position: 'absolute', bottom: 50, right: 50 }}
          onClick={() => {
            setShowCreateProfessional(true)
            setName('')
            setPhoneNumber('')
            setEmail('')
            setProfessionalType('')
            setSituation('')
          }}
        >
          <Add />
        </Fab>
      </Tooltip>
      <Dialog
        open={showCreateProfessional}
        onClose={() => {
          setShowCreateProfessional(false)
          setValidationError(false)
        }}
        aria-labelledby="criar-tipo-de-profissional"
      >
        <DialogTitle>Criar tipo de profissional</DialogTitle>
        <DialogContent style={{ width: 250 }}>
          <form
            noValidate
            style={{ display: 'flex', flexDirection: 'column' }}
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <TextField
              required
              label="Nome"
              value={name}
              onChange={event => setName(event.target.value)}
              error={validationError}
            />
            <TextField
              label="Telefone"
              value={phoneNumber}
              onChange={event => setPhoneNumber(phoneMask(event.target.value))}
            />
            <TextField
              required
              label="Email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              error={validationError}
            />
            <TextField
              required
              select
              label="Tipo de profissional"
              variant="outlined"
              style={{ marginTop: 20 }}
              onChange={event => setProfessionalType(event.target.value)}
              value={professionalType}
              error={validationError}
            >
              {professionalTypes.map(professionalType => (
                <MenuItem key={professionalType.id} value={professionalType.description}>
                  {professionalType.description}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              select
              label="Situação"
              variant="outlined"
              style={{ marginTop: 20 }}
              onChange={event => setSituation(event.target.value)}
              error={validationError}
            >
              <MenuItem value='OK'>
                OK
              </MenuItem>
              <MenuItem value='Irregular'>
                Irregular
              </MenuItem>
            </TextField>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20, marginBottom: 10 }}
              type="submit"
            >
              Editar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={editProfessional}
        onClose={() => {
          setEditProfessional()
          setValidationError(false)
        }}
        aria-labelledby="editar-profissional"
      >
        <DialogTitle>Editar tipo de profissional</DialogTitle>
        <DialogContent style={{ width: 250 }}>
          <form
            noValidate
            style={{ display: 'flex', flexDirection: 'column' }}
            autoComplete="off"
            onSubmit={onSubmitEditing}
          >
            <TextField
              required
              label="Nome"
              value={name}
              onChange={event => setName(event.target.value)}
              error={validationError}
            />
            <TextField
              label="Telefone"
              value={phoneNumber}
              onChange={event => setPhoneNumber(phoneMask(event.target.value))}
            />
            <TextField
              required
              label="Email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              error={validationError}
            />
            <TextField
              required
              select
              label="Tipo de profissional"
              variant="outlined"
              style={{ marginTop: 20 }}
              onChange={event => setProfessionalType(event.target.value)}
              value={professionalType}
              error={validationError}
            >
              {professionalTypes.map(professionalType => (
                <MenuItem key={professionalType.id} value={professionalType.description}>
                  {professionalType.description}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              select
              label="Situação"
              variant="outlined"
              style={{ marginTop: 20 }}
              onChange={event => setSituation(event.target.value)}
              value={situation}
              error={validationError}
            >
              <MenuItem value='OK'>
                OK
              </MenuItem>
              <MenuItem value='Irregular'>
                Irregular
              </MenuItem>
            </TextField>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20, marginBottom: 10 }}
              type="submit"
            >
              Editar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!deleteProfessional}
        onClose={() => setDeleteProfessional()}
        aria-labelledby="deletar-de-profissional"
      >
        <DialogTitle>Deseja deletar {deleteProfessional?.name}?</DialogTitle>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={() => setDeleteProfessional()}>
            Cancelar
          </Button>
          <Button color="secondary" onClick={handleDeleteProfessional}>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}