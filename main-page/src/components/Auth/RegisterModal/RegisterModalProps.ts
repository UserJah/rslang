import { ILoginModalProps } from './../LoginModal/LoginModalProps'

export interface IRegisterModalProps extends ILoginModalProps {
  login: string
  create: () => void
}
