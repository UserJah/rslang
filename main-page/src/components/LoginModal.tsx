import React, { useState } from 'react'
import { Box, Button, Modal, TextField } from '@mui/material'
import AuthConstants from '../constants/Auth.constants'
import handlerSetState from '../utils/handlerSetState'
import ErrorMessage from './Error/ErrorMessage'
import api from './../utils/AuthAPI'
import { style } from '../utils/styleVars'

const LoginModal = () => {
  const [open, setOpen] = useState(false)
  const [login, setLogin] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const checkerAuth = (): boolean | undefined => {
    const isAuthJson = localStorage.getItem(AuthConstants.USER_KEY_STORAGE)
    if (isAuthJson) {
      return JSON.parse(isAuthJson).isAuth
    }
    return undefined
  }

  const handlerSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()

    if (pass.length < 8) {
      setErr(AuthConstants.ERROR_PASS)

      return
    }
    api.loginUser({ email: login, password: pass })
    clearFields()

    setTimeout(() => {
      if (!checkerAuth()) {
        setErr(AuthConstants.ERROR_AUTH)
      } else {
        handleClose()
      }
    }, AuthConstants.SIGN_DELAY)
  }

  const clearFields = () => {
    setLogin('')
    setPass('')
  }

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Войти
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form className="modal" onSubmit={handlerSubmit}>
            <TextField
              id="outlined-basic"
              label="email"
              type="email"
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
            {err === AuthConstants.ERROR_PASS && (
              <ErrorMessage text={AuthConstants.ERROR_PASS as string} />
            )}
            {err === AuthConstants.ERROR_AUTH && (
              <ErrorMessage text={AuthConstants.ERROR_AUTH as string} />
            )}
            <Button type="submit" variant="contained">
              Войти
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default LoginModal
