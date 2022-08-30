import React, { useEffect, useState } from 'react'
import { Logout } from '@mui/icons-material'

import AuthConstants from '../../../constants/Auth.constants'
import LoginModal from '../LoginModal/LoginModal'
import RegisterModal from '../RegisterModal/RegisterModal'
import localStorageService from '../../../utils/LocalStorageService'
import { IDataAuth, IUserInfo } from '../../../constants/Auth.interfaces'
import api from './../../../utils/AuthAPI'
import classes from './Authorization.module.css'

const initialDataAuth: IDataAuth = {
  email: '',
  password: '',
  login: '',
}

const Authorization = () => {
  const [userState, setUserState] = useState<IUserInfo>({ isAuth: false })
  const [dataAuth, setDataAuth] = useState<IDataAuth>(initialDataAuth)
  const [err, setErr] = useState<string>('')
  const [isGreeting, setGreeting] = useState<boolean>(false)
  const [open, setOpen] = useState(false)

  //===========

  const [openLogin, setOpenLogin] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const unAuthorization = () => {
    setUserState({ isAuth: false })

    localStorageService.clear()
  }

  const handleDataFields = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement

    if (target.type === 'email') {
      setDataAuth({ ...dataAuth, email: target.value.trim() })
    }
    if (target.type === 'password') {
      setDataAuth({ ...dataAuth, password: target.value.trim() })
    }
    if (target.type === 'text') {
      setDataAuth({ ...dataAuth, login: target.value.trim() })
    }
  }

  const validateEmail = (email: string): RegExpMatchArray | null => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const handlerSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
  }

  const createUser = () => {
    const { email, password, login } = dataAuth

    if (!validateEmail(email)) {
      setErr(AuthConstants.ERROR_EMAIL)
      return
    }

    if (password.length < 8) {
      setErr(AuthConstants.ERROR_PASS)
      return
    }

    const newUser = { login, email, password }

    api.createUser(newUser).then((response) => {
      if (response && response.status === 417) {
        setErr(AuthConstants.ERROR_CREATE)
      } else {
        setErr('')
        setGreeting(true)
        setTimeout(() => {
          setGreeting(false)
          setOpenLogin(true)
        }, AuthConstants.GREETING_DELAY)
      }
    })
  }

  const setDBUSer = (): void => {
    if (err === '') {
      setOpen(false)
      setDataAuth({ ...userState, ...initialDataAuth })
    }
  }
  //==============

  const handleOpenLogin = () => setOpenLogin(true)

  const handleCloseLogin = () => setOpenLogin(false)

  const logInUser = () => {}

  //======
  useEffect(setDBUSer, [err])

  return (
    <>
      <LoginModal
        email={dataAuth.email}
        password={dataAuth.password}
        error={err}
        changeFields={handleDataFields}
        submit={handlerSubmit}
        logIn={logInUser}
        open={openLogin}
        handleOpen={handleOpenLogin}
        handleClose={handleCloseLogin}
      />
      <RegisterModal
        login={dataAuth.login}
        email={dataAuth.email}
        password={dataAuth.password}
        error={err}
        changeFields={handleDataFields}
        submit={handlerSubmit}
        create={createUser}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <Logout onClick={unAuthorization} />
      {isGreeting && (
        <div
          className={classes.greeting}
        >{`${dataAuth.login} Пользователь успешно зарегистрирован `}</div>
      )}
    </>
  )
}

export default Authorization
