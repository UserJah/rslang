import React from 'react'
import './Error.css'

interface ErrorMessageProp {
  text: string
}

const ErrorMessage = ({ text }: ErrorMessageProp) => {
  return <div className="error">{text}</div>
}

export default ErrorMessage
