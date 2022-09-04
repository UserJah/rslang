import React from 'react'
import { Button, Modal, TextField } from '@mui/material'
import { Box } from '@mui/system'
import ErrorMessage from '../Error/ErrorMessage'
import { style } from '../../../utils/styleVars'
import AuthConstants from '../../../constants/Auth.constants'
import { IRegisterModalProps } from './RegisterModalProps'

const RegisterModal = ({
  email,
  password,
  login,
  error,
  changeFields,
  submit,
  create,
  open,
  handleOpen,
  handleClose,
  preloader,
}: IRegisterModalProps) => {
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Регистрация
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className="modal">
          <form className="modal" onSubmit={submit}>
            <TextField
              id="outlined-basic"
              label="email"
              type="email"
              variant="outlined"
              value={email}
              required
              onChange={changeFields}
            />
            <TextField
              id="outlined-basic"
              label="login"
              type="text"
              variant="outlined"
              value={login}
              required
              onChange={changeFields}
            />
            <TextField
              id="outlined-basic"
              label="password"
              type="password"
              variant="outlined"
              value={password}
              required
              onChange={changeFields}
            />
            {error === AuthConstants.ERROR_PASS && (
              <ErrorMessage text={AuthConstants.ERROR_PASS as string} />
            )}

            {error === AuthConstants.ERROR_EMAIL && (
              <ErrorMessage text={AuthConstants.ERROR_EMAIL as string} />
            )}

            {error === AuthConstants.ERROR_CREATE && (
              <ErrorMessage text={AuthConstants.ERROR_CREATE as string} />
            )}

            {error === AuthConstants.ERROR_LOGIN && (
              <ErrorMessage text={AuthConstants.ERROR_LOGIN as string} />
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={preloader}
              onClick={create}
            >
              Регистрация
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default RegisterModal
