import React, { useState } from 'react'
import CardList from './cardList'
import { Container, Pagination, Typography } from '@mui/material'
import { Path } from '../../api/types'

export const TextBook = () => {
  const [page, setPage] = useState(1)

  return (
    <>
      <Typography variant="h3" textAlign="center">
        Электронный учебник страница {page}
      </Typography>
      <Typography color="gray" variant="overline" textAlign="center">
        *Для прослушивания аудио кликните на изображение
      </Typography>
      <CardList {...useState(page)} />
      <Pagination
        count={30}
        showFirstButton
        showLastButton
        onChange={(_, page) => {
          if (page !== null) {
            setPage(page)
          }
        }}
      />
    </>
  )
}
