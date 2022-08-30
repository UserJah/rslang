import React, { useEffect, useState } from 'react'
import { Logout } from '@mui/icons-material'

import AuthConstants from '../../../constants/Auth.constants'
import LoginModal from '../LoginModal/LoginModal'
import RegisterModal from '../RegisterModal/RegisterModal'
import localStorageService from '../../../utils/LocalStorageService'
import { ISignin, IUserInfo } from '../../../constants/Auth.interfaces'
import api from './../../../utils/AuthAPI'
import PopUp from '../../PopUp/PopUp'
import classes from './Authorization.module.css'

const initialDataAuth: ISignin = {
  email: '',
  password: '',
  login: '',
}

const Authorization = () => {
  const [userState, setUserState] = useState<IUserInfo>({ isAuth: false })
  const [dataAuth, setDataAuth] = useState<ISignin>(initialDataAuth)
  const [err, setErr] = useState<string>('')
  const [isGreeting, setGreeting] = useState<boolean>(false)
  const [isParting, setParting] = useState<boolean>(false)
  const [open, setOpen] = useState(false)

  //===========

  const [isAuth, setAuth] = useState<boolean>(false)
  const [openLogin, setOpenLogin] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const unAuthorization = () => {
    setUserState({ isAuth: false })
    setParting(true)

    setTimeout(() => setParting(false), AuthConstants.POP_UP_DELAY)

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
          setOpen(false)
          setOpenLogin(true)
        }, AuthConstants.POP_UP_DELAY)
      }
    })
  }

  const setDBUSer = (): void => {
    if (err === '') {
      setOpen(false)
    }
  }
  //==============

  const handleOpenLogin = () => setOpenLogin(true)

  const handleCloseLogin = () => setOpenLogin(false)

  const logInUser = () => {
    const { email, password, login } = dataAuth

    if (!validateEmail(email)) {
      setErr(AuthConstants.ERROR_EMAIL)
      return
    }

    if (password.length < 8) {
      setErr(AuthConstants.ERROR_PASS)
      return
    }

    api.loginUser({ email, password, login }).then(async (response) => {
      if (response && response.status === 404) {
        setErr(AuthConstants.ERROR_AUTH)
      }

      if (response && response.status === 200) {
        const body = (await response.json()) as IUserInfo
        const { token, refreshToken, userId, name } = body
        const userInfo: IUserInfo = { token, refreshToken, userId, name }
        const experience = new Date()

        setUserState({ isAuth: true })
        setAuth(true)
        localStorageService.setItem(AuthConstants.USER_KEY_STORAGE, {
          ...userInfo,
          isAuth: true,
          experience,
        })
        setDataAuth(initialDataAuth)
        setOpenLogin(false)

        setTimeout(() => {
          setAuth(false)
        }, AuthConstants.POP_UP_DELAY)
      }
    })
  }

  //======
  useEffect(setDBUSer, [err])

  useEffect(() => {
    const userInfo: IUserInfo | null = localStorageService.getItem(
      AuthConstants.USER_KEY_STORAGE
    )

    if (userInfo) {
      const now = Date.now()
      const lastVisit = Date.parse(String(userInfo.experience))
      const tokenTimeDelta = now - lastVisit

      if (tokenTimeDelta > AuthConstants.REFRESH_TOKEN_LIFE) {
        setErr(AuthConstants.ERROR_TOKEN_MISS)
        handleOpenLogin()
      }
    }
  }, [userState])

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
      <Logout className={classes.logOut} onClick={unAuthorization} />
      {isGreeting && <PopUp text={AuthConstants.SUCCESS as string} />}
      {isAuth && <PopUp text={AuthConstants.GREETING as string} />}
      {isParting && <PopUp text={AuthConstants.PARTING as string} />}
    </>
  )
}

export default Authorization
