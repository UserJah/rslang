import { Menu } from '@mui/icons-material'
import { Button, Modal, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import img from '../assets/img/logo.svg'
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

const Navigation = (props: { updateData: (arg0: boolean) => void }) => {
  return (
    <div className="navbar">
      <Menu onClick={() => props.updateData(true)} />
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
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Войти
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form action="" className="modal">
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
