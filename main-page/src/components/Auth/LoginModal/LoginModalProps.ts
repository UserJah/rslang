import React from 'react'

export interface ILoginModalProps {
  email: string
  password: string
  error: string
  open: boolean
  preloader: boolean
  logIn?: () => void
  handleOpen: () => void
  handleClose: () => void
  changeFields: (e: React.FormEvent) => void
  submit: (e: React.FormEvent) => void
}
