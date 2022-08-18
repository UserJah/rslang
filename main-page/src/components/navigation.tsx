import { Key, Menu } from '@mui/icons-material'
import { Button, Modal, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import img from '../assets/img/logo.svg'
import AuthConstants, {
  ERROR_AUTH,
  ERROR_PASS,
} from '../constants /Auth.constants'
import api from './../utils/AuthAPI'
import ErrorMessage from './Error/ErrorMessage'
import './navigation.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: '#ffffff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Navigation = () => {
  return (
    <div className="navbar">
      <Menu />
      <img src={img} alt="rs-logo" className="rs-logo" />
      <div className="button-group-user">
        <LoginModal />
        <RegisterModal />
      </div>
    </div>
  )
}

const LoginModal = () => {
  const [open, setOpen] = React.useState(false)
  const [login, setLogin] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [err, setErr] = React.useState('')

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const checkerAuth = (): boolean | undefined => {
    const isAuthJson = localStorage.getItem(AuthConstants.USER_KEY_STORAGE)
    if (isAuthJson) {
      return JSON.parse(isAuthJson).isAuth
    }
    return undefined
  }

  const handlerSetState = (
    evt: React.FormEvent,
    cb: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    const target = evt.target as HTMLInputElement

    setErr('')
    cb(target.value.trim())
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
      }
    }, AuthConstants.SIGN_DELAY)
  }

  const clearFields = () => {
    setLogin('')
    setPass('')
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Войти
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form className="modal" onSubmit={handlerSubmit}>
            <TextField
              id="outlined-basic"
              label="login"
              type="text"
              variant="outlined"
              value={login}
              required
              onChange={(evt) => handlerSetState(evt, setLogin)}
            />
            <TextField
              id="outlined-basic"
              label="password"
              type="password"
              variant="outlined"
              value={pass}
              required
              onChange={(evt) => handlerSetState(evt, setPass)}
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

const RegisterModal = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Регистрация
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className="modal">
          <form action="" className="modal">
            <TextField
              id="outlined-basic"
              label="email"
              type="email"
              variant="outlined"
              required
            />
            <TextField
              id="outlined-basic"
              label="login"
              type="text"
              variant="outlined"
              required
            />
            <TextField
              id="outlined-basic"
              label="password"
              type="password"
              variant="outlined"
              required
            />
            <Button type="submit" variant="contained">
              Регистрация
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default Navigation
