import React from 'react'

const handlerSetState = (
  evt: React.FormEvent,
  cbState: React.Dispatch<React.SetStateAction<string>>,
  cbError: React.Dispatch<React.SetStateAction<string>>
): void => {
  const target = evt.target as HTMLInputElement

  cbError('')
  cbState(target.value.trim())
}

export default handlerSetState
