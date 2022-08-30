import React, { useState } from 'react';
import AuthConstants from "../../constants/Auth.constants"
import { ISignin, IUserInfo } from '../../constants/Auth.interfaces';
import LocalStorageService from "./../../utils/LocalStorageService"
import api from './../../utils/AuthAPI';

const initialDataAuth: ISignin = {
  email: '',
  password: '',
  login: '',
}

const useAuthContext = () => {

  const [userState, setUserState] = useState<IUserInfo>({ isAuth: false })
  const [dataAuth, setDataAuth] = useState<ISignin>(initialDataAuth)
  const [err, setErr] = useState<string>('')
  const [isGreeting, setGreeting] = useState<boolean>(false)
  const [isParting, setParting] = useState<boolean>(false)
  const [open, setOpen] = useState(false)

  const [isAuth, setAuth] = useState<boolean>(false)
  const [openLogin, setOpenLogin] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const unAuthorization = () => {
    setUserState({ isAuth: false })
    setParting(true)

    setTimeout(() => setParting(false), AuthConstants.POP_UP_DELAY)

    LocalStorageService.clear()
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
      if (response && response.status === 403) {
        setErr(AuthConstants.ERROR_SIGIN)
      }

      if (response && response.status === 200) {
        const body = (await response.json()) as IUserInfo
        const { token, refreshToken, userId, name } = body
        const userInfo: IUserInfo = { token, refreshToken, userId, name }
        const experience = new Date()

        setUserState({ isAuth: true })
        setAuth(true)
        LocalStorageService.setItem(AuthConstants.USER_KEY_STORAGE, {
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

  const notifyAuth = () => {
    const userInfo: IUserInfo | null = LocalStorageService.getItem(
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
  }

  return { dataAuth,userState, err, isGreeting, isParting, open, isAuth, openLogin, handleOpen, handleClose, unAuthorization, handlerSubmit, handleDataFields, createUser, setDBUSer, handleOpenLogin, handleCloseLogin, logInUser, notifyAuth }
}

export default useAuthContext;
