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

import { NoSim, Add, Edit, Delete } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import { api } from '../services/api'
import { phoneMask } from '../utils/masks'

export const ProfessionalTypes = ({ toggleLoading, isVisible, loading }) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [errorAlert, setErrorAlert] = useState('')
  const [successAlert, setSuccessAlert] = useState('')
  const [validationError, setValidationError] = useState(false)

  const [showCreateProfessionalType, setShowCreateProfessionalType] = useState(false)
  const [editProfessionalType, setEditProfessionalType] = useState()
  const [deleteProfessionalType, setDeleteProfessionalType] = useState()

  const [description, setDescription] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [situation, setSituation] = useState('')

  async function loadData() {
    toggleLoading(true)

    try {
      const response = await api.get('professional-type', { timeout: 10000 })

      setData(response.data)
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
    
    const professionalTypeSchema = Yup.object().shape({
      description: Yup
        .string()
        .required('Preencha este campo'),
      phoneNumber: Yup
        .string()
    })

    const professionalType = {
      description,
      phoneNumber
    }

    try {
      await professionalTypeSchema.validate(professionalType, { abortEarly: false })

      await api.post('professional-type', { ...professionalType, situation: true })

      loadData()
      setShowCreateProfessionalType(false)
      setValidationError(false)
      setErrorAlert('')
    } catch(err) {
      if (err instanceof Yup.ValidationError) {
        setValidationError(true)
      } else {
        setErrorAlert('Não foi possível criar tipo de profissional')
      }
    }
  }

  async function onSubmitEditing(event) {
    event.preventDefault()
    
    const professionalTypeSchema = Yup.object().shape({
      description: Yup
        .string()
        .required(),
      phoneNumber: Yup
        .string(),
      situation: Yup
        .string()
        .required()
    })

    const professionalType = {
      description,
      phoneNumber,
      situation
    }

    try {
      await professionalTypeSchema.validate(professionalType, { abortEarly: false })

      await api.put(`professional-type/${editProfessionalType.id}`, {
        ...professionalType,
        situation: situation === 'OK' ? true : false
      })

      loadData()
      setEditProfessionalType(false)
      setValidationError(false)
      setErrorAlert('')
      setDescription()
      setPhoneNumber()
      setSituation('OK')
    } catch(err) {
      if (err instanceof Yup.ValidationError) {
        setValidationError(true)
      } else {
        setErrorAlert('Não foi possível editar tipo de profissional')
      }
    }
  }

  async function handleDeleteProfessionalType() {
    try {
      await api.delete(`professional-type/${deleteProfessionalType.id}`)

      setSuccessAlert(`${deleteProfessionalType.description} deletado com sucesso`)
      loadData()
      setDeleteProfessionalType()
      setErrorAlert('')
    } catch(err) {
      setErrorAlert('Não foi possível deletar o tipo de profissional')
      setDeleteProfessionalType()
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
                <TableCell align="center">Descrição</TableCell>
                <TableCell align="center">Telefone</TableCell>
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
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell align="center">{item.phoneNumber}</TableCell>
                  <TableCell align="center">
                    <Card variant="outlined" style={{ width: 'fit-content', padding: '5px 15px' }}>{item.situation ? 'OK' : 'Irregular'}</Card>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => {
                      setEditProfessionalType({ id: item.id, item })
                      setDescription(item.description)
                      setPhoneNumber(item.phoneNumber)
                      setSituation(item.situation ? 'OK' : 'Irregular')
                    }}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => setDeleteProfessionalType({ id: item.id, description: item.description })}>
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
            setShowCreateProfessionalType(true)
            setDescription('')
            setPhoneNumber('')
            setSituation('')
          }}
        >
          <Add />
        </Fab>
      </Tooltip>
      <Dialog
        open={showCreateProfessionalType}
        onClose={() => {
          setShowCreateProfessionalType(false)
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
              required label="Descrição"
              value={description}
              onChange={event => setDescription(event.target.value)}
              error={validationError}
            />
            <TextField
              label="Telefone"
              value={phoneNumber}
              onChange={event => setPhoneNumber(phoneMask(event.target.value))}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20, marginBottom: 10 }}
              type="submit"
            >
              Criar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={editProfessionalType}
        onClose={() => {
          setEditProfessionalType()
          setValidationError(false)
        }}
        aria-labelledby="criar-tipo-de-profissional"
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
              label="Descrição"
              value={description}
              onChange={event => setDescription(event.target.value)}
              error={validationError}
            />
            <TextField
              label="Telefone"
              value={phoneNumber}
              onChange={event => setPhoneNumber(phoneMask(event.target.value))}
            />
            <TextField
              required
              select
              label="Situação"
              variant="outlined"
              style={{ marginTop: 20 }}
              onChange={event => setSituation(event.target.value)}
              error={validationError}
              value={situation}
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
        open={!!deleteProfessionalType}
        onClose={() => setDeleteProfessionalType()}
        aria-labelledby="criar-tipo-de-profissional"
      >
        <DialogTitle>Deseja deletar {deleteProfessionalType?.description}?</DialogTitle>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={() => setDeleteProfessionalType()}>
            Cancelar
          </Button>
          <Button color="secondary" onClick={handleDeleteProfessionalType}>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}