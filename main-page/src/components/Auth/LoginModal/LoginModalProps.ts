import React from 'react'

export interface ILoginModalProps {
  email: string;
  password: string;
  error: string;
  open: boolean,
  logIn?: () => void,
  handleOpen: () => void,
  handleClose: () => void,
  changeFields: (e: React.FormEvent) => void;
  submit: (e: React.FormEvent) => void;
}