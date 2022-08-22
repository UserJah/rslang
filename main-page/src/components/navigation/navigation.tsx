import { Button, Modal, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import img from './../../assets/img/logo.svg'
import AuthConstants, {
  ERROR_AUTH,
  ERROR_PASS,
} from './../../constants/Auth.constants'
import api from './../../utils/AuthAPI'
import ErrorMessage from './../../components/Error/ErrorMessage'
import TemporalyDrawer from './drawer'
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
      <TemporalyDrawer />
      <img src={img} alt="rs-logo" className="rs-logo" />
      <div className="button-group-user">
        <LoginModal />
        <RegisterModal />
      </div>
    </div>
  )
}

const handlerSetState = (
  evt: React.FormEvent,
  cbState: React.Dispatch<React.SetStateAction<string>>,
  cbError: React.Dispatch<React.SetStateAction<string>>
): void => {
  const target = evt.target as HTMLInputElement

  cbError('')
  cbState(target.value.trim())
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

const RegisterModal = () => {
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [login, setLogin] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [err, setErr] = React.useState('')

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

export default Navigation
