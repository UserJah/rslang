import React, { useState } from 'react'
import api from '../../utils/AuthAPI'
import AuthConstants, {
  ERROR_AUTH,
  ERROR_PASS,
} from '../../constants/Auth.constants'
import { Box, Button, Modal, TextField } from '@mui/material'
import handlerSetState from '../../utils/handlerSetState'
import ErrorMessage from '../Error/ErrorMessage'
import { style } from '../navigation/navigation'

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
      setErr(ERROR_PASS)

      return
    }
    api.loginUser({ email: login, password: pass })
    clearFields()

    setTimeout(() => {
      if (!checkerAuth()) {
        setErr(ERROR_AUTH)
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
            {err === ERROR_PASS && <ErrorMessage text={ERROR_PASS} />}
            {err === ERROR_AUTH && <ErrorMessage text={ERROR_AUTH} />}
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
