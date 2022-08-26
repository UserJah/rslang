import React, { useState } from 'react'
import api from './../../utils/AuthAPI'
import { ERROR_PASS } from '../../constants/Auth.constants'
import { Button, Modal, TextField } from '@mui/material'
import { Box } from '@mui/system'
import handlerSetState from '../../utils/handlerSetState'
import { style } from '../navigation/navigation'
import ErrorMessage from '../Error/ErrorMessage'

const RegisterModal = () => {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const clearFields = () => {
    setEmail('')
    setLogin('')
    setPass('')
  }

  const handlerSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()

    if (pass.length < 8) {
      setErr(ERROR_PASS)

      return
    }

    api.createUser({ email: email, password: pass })

    clearFields()

    handleClose()
  }

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Регистрация
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className="modal">
          <form className="modal" onSubmit={handlerSubmit}>
            <TextField
              id="outlined-basic"
              label="email"
              type="email"
              variant="outlined"
              value={email}
              required
              onChange={(evt) => handlerSetState(evt, setEmail, setErr)}
            />
            <TextField
              id="outlined-basic"
              label="login"
              type="text"
              variant="outlined"
              value={login}
              required
              onChange={(evt) => handlerSetState(evt, setLogin, setErr)}
            />
            <TextField
              id="outlined-basic"
              label="password"
              type="password"
              variant="outlined"
              value={pass}
              required
              onChange={(evt) => handlerSetState(evt, setPass, setErr)}
            />
            {err === ERROR_PASS && <ErrorMessage text={ERROR_PASS} />}
            <Button type="submit" variant="contained">
              Регистрация
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default RegisterModal
