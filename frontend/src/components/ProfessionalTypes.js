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
  Box
} from '@material-ui/core'

import { NoSim } from '@material-ui/icons'

import { Alert } from '@material-ui/lab'

import { api } from '../services/api'

export const ProfessionalTypes = ({ toggleLoading, isVisible, loading }) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)

  async function loadData() {
    toggleLoading(true)

    try {
      const response = await api.get('professional-type', { timeout: 10000 })

      console.log(response.data)

      setData(response.data)
      toggleLoading(false)
    } catch(err) {
      setError(true)
      toggleLoading(false)
    }
  }

  useEffect(() => loadData(), [isVisible])
  
  return (
    <>
      {loading ? null : error ? (
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <NoSim fontSize="large" color="primary" />
          <Typography variant="h6">Sem dados por ora...</Typography>
        </Box>
      ) : (
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
          <Snackbar open={error} autoHideDuration={5000} onClose={() => setError(false)}>
            <Alert
              onClose={() => setError(false)}
              severity="error"
              elevation={6}
              variant="filled"
            >
              Não foi possível carregar os tipos de profissional
            </Alert>
          </Snackbar>
        </TableContainer>
      )}
    </>
  )
}