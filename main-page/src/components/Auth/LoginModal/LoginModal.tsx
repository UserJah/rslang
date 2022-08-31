import React from 'react'
import { Box, Button, Modal, TextField } from '@mui/material'

import { style } from '../../../utils/styleVars'
import ErrorMessage from '../Error/ErrorMessage'
import AuthConstants from '../../../constants/Auth.constants'
import { ILoginModalProps } from './LoginModalProps'

const LoginModal = ({
  email,
  password,
  error,
  changeFields,
  submit,
  logIn,
  open,
  handleOpen,
  handleClose,
  preloader,
}: ILoginModalProps) => {
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Войти
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
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

            {error === AuthConstants.ERROR_AUTH && (
              <ErrorMessage text={AuthConstants.ERROR_AUTH as string} />
            )}

            {error === AuthConstants.ERROR_TOKEN_MISS && (
              <ErrorMessage text={AuthConstants.ERROR_TOKEN_MISS as string} />
            )}

            {error === AuthConstants.ERROR_SIGIN && (
              <ErrorMessage text={AuthConstants.ERROR_SIGIN as string} />
            )}
            <Button type="submit" variant="contained" disabled={preloader} onClick={logIn}>
              Войти
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default LoginModal
