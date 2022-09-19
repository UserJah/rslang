import React, { useState } from 'react'
import AuthConstants from '../../constants/Auth.constants'
import { ISignin, IUserInfo } from './../../constants/Auth.interfaces'
import LocalStorageService from './../../utils/LocalStorageService'
import { defaultstats } from '../../common/stats'
import api from './../../utils/AuthAPI'

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
  const [preloader, setPreloader] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleOpenLogin = () => setOpenLogin(true)

  const handleCloseLogin = () => setOpenLogin(false)

  const unAuthorization = () => {
    setUserState({ isAuth: false })
    setParting(true)

    setTimeout(() => setParting(false), AuthConstants.POP_UP_DELAY)

    window.location.reload()

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
      setPreloader(false)
      return
    }

    if (password.length < 8) {
      setErr(AuthConstants.ERROR_PASS)
      setPreloader(false)
      return
    }

    if (!login) {
      setErr(AuthConstants.ERROR_LOGIN)
      setPreloader(false)
      return
    }

    setPreloader(true)

    const newUser = { email, password, name: login }

    api.createUser(newUser).then((response) => {
      if (response && response.status === 417) {
        setErr(AuthConstants.ERROR_CREATE)
        setPreloader(false)
      } else {
        setErr('')
        setGreeting(true)
        setTimeout(() => {
          setGreeting(false)
          setOpen(false)
          setPreloader(false)
          setOpenLogin(true)

          api.loginUser({ email, password, login }).then(async (resp) => {
            if (resp && resp.ok) {
              const { userId, token } = await resp.json()

              api
                .getStat(userId as string, token as string)
                .then(async (resp) => {
                  if (resp && resp.status === 404) {
                    api.updateStat(
                      userId as string,
                      token as string,
                      defaultstats
                    )
                  }
                })
            }
          })
        }, AuthConstants.POP_UP_DELAY)
      }
    })
  }

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
    setPreloader(true)

    api.loginUser({ email, password, login }).then(async (response) => {
      if (response && response.status === 404) {
        setErr(AuthConstants.ERROR_AUTH)
        setPreloader(false)
      }
      if (response && response.status === 403) {
        setErr(AuthConstants.ERROR_SIGIN)
        setPreloader(false)
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
          name,
          experience,
        })

        setDataAuth(initialDataAuth)
        setPreloader(false)
        setOpenLogin(false)
        setGreeting(true)

        setTimeout(() => {
          setAuth(false)
          setGreeting(false)

          window.location.reload()
        }, AuthConstants.POP_UP_DELAY)
      }
    })
  }

  const notifyAuthFalse = () => {
    const userInfo: IUserInfo | null = LocalStorageService.getItem(
      AuthConstants.USER_KEY_STORAGE
    )
    setErr(AuthConstants.ERROR_TOKEN_MISS)
    setAuth(false)
    LocalStorageService.setItem(AuthConstants.USER_KEY_STORAGE, {
      ...userInfo,
      isAuth: false,
    })
    handleOpenLogin()
  }

  const setDBUSer = (): void => {
    if (err === '') {
      setOpen(false)
    }
  }

  return {
    dataAuth,
    userState,
    err,
    isGreeting,
    isParting,
    open,
    isAuth,
    openLogin,
    handleOpen,
    handleClose,
    unAuthorization,
    handlerSubmit,
    handleDataFields,
    createUser,
    setDBUSer,
    handleOpenLogin,
    handleCloseLogin,
    logInUser,
    preloader,
    notifyAuthFalse,
  }
}

export default useAuthContext
