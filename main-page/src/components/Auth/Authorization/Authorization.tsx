/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Logout } from '@mui/icons-material'
import AuthConstants from '../../../constants/Auth.constants'
import LoginModal from '../LoginModal/LoginModal'
import RegisterModal from '../RegisterModal/RegisterModal'
import PopUp from '../../PopUp/PopUp'
import classes from './Authorization.module.css'
import useAuthContext from '../../../utils/hooks/useAuthContext'
import api from './../../../utils/AuthAPI'
import localStorageService from './../../../utils/LocalStorageService'
import { IToken, IUserInfo } from '../../../constants/Auth.interfaces'
import UserInfo from '../UserInfo/UserInfo'

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
  } = useAuthContext()

  const local = localStorageService.getItem<IUserInfo>(
    AuthConstants.USER_KEY_STORAGE
  )

  useEffect(setDBUSer, [err])

  useEffect(() => {
    const setNewToken = async () => {
      const userInfo: IUserInfo | null = localStorageService.getItem(
        AuthConstants.USER_KEY_STORAGE
      )

      if (userInfo) {
        const now = Date.now()
        const lastVisit = Date.parse(String(userInfo.experience))
        const tokenTimeDelta = now - lastVisit

        if (tokenTimeDelta > AuthConstants.REFRESH_TOKEN_LIFE) {
          const { token, refreshToken } = (await api.getNewToken(
            userInfo.userId as string,
            userInfo.refreshToken as string
          )) as IToken

          localStorageService.setItem(AuthConstants.USER_KEY_STORAGE, {
            ...userInfo,
            token,
            refreshToken,
            experience: new Date(),
          })
        }
      }
    }

    const setTimerToken = () => {
      return setInterval(setNewToken, AuthConstants.REFRESH_TOKEN_LIFE)
    }

    setNewToken()
    setTimerToken()
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
