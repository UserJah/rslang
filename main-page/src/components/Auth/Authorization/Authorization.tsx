/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Logout } from '@mui/icons-material'
import AuthConstants from '../../../constants/Auth.constants'
import LoginModal from '../LoginModal/LoginModal'
import RegisterModal from '../RegisterModal/RegisterModal'
import PopUp from '../../PopUp/PopUp'
import useAuthContext from '../../../utils/hooks/useAuthContext'
import localStorageService from './../../../utils/LocalStorageService'
import { IToken, IUserInfo } from '../../../constants/Auth.interfaces'
import UserInfo from '../UserInfo/UserInfo'
import AuthPathConstants from '../../../constants/AuthPath.constants'
import classes from './Authorization.module.css'

const Authorization = () => {
  const {
    dataAuth,
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
  } = useAuthContext()

  const local = localStorageService.getItem<IUserInfo>(
    AuthConstants.USER_KEY_STORAGE
  )

  useEffect(setDBUSer, [err])

  useEffect(() => {
    async function setNewToken() {
      const user = localStorage.getItem('userInfo') as string
      if (!user) return
      const info: IUserInfo = JSON.parse(user)
      const id = info.userId

      if (info && id) {
        const now = Date.now()
        const lastVisit = Date.parse(String(info.experience))
        const tokenTimeDelta = now - lastVisit

        if (tokenTimeDelta > AuthConstants.REFRESH_TOKEN_LIFE) {
          const response = await fetch(
            `${AuthPathConstants.BASE}${AuthPathConstants.USERS}/${id}${AuthPathConstants.TOKENS}`,
            {
              headers: {
                Authorization: `Bearer ${info.refreshToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }
          )
          const status = response

          if (status.ok) {
            const resp: IToken = await response.json()

            localStorageService.setItem(AuthConstants.USER_KEY_STORAGE, {
              ...info,
              experience: new Date(),
              token: resp.token,
              refreshToken: resp.refreshToken,
            })
          }
          if (!status.ok) {
            notifyAuthFalse()
          }
        }
      }
    }

    setNewToken()
    const timerID = setInterval(setNewToken, AuthConstants.REFRESH_TOKEN_LIFE)

    return () => clearInterval(timerID)
  }, [])

  return (
    <>
      {}
      {local && local.isAuth && local.name ? (
        <>
          <UserInfo name={local.name} />
          <Logout className={classes.logOut} onClick={unAuthorization} />
        </>
      ) : (
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
            preloader={preloader}
          />
          <RegisterModal
            login={dataAuth.login as string}
            email={dataAuth.email}
            password={dataAuth.password}
            error={err}
            changeFields={handleDataFields}
            submit={handlerSubmit}
            create={createUser}
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            preloader={preloader}
          />

          {isGreeting && <PopUp text={AuthConstants.SUCCESS as string} />}
          {isAuth && <PopUp text={AuthConstants.GREETING as string} />}
          {isParting && <PopUp text={AuthConstants.PARTING as string} />}
        </>
      )}
    </>
  )
}

export default Authorization
