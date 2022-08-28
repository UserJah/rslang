import React, { useState } from 'react'
import CardList from './cardList'
import { Pagination, Typography } from '@mui/material'
import { Container } from '@mui/system'

export const TextBook = () => {
  const [page, setPage] = useState(1)
  const [group, setGroup] = useState(1)

  const levels = [1, 2, 3, 4, 5, 6]

  return (
    <>
      <Typography variant="h3" textAlign="center">
        Электронный учебник страница {page}
      </Typography>
      <Typography color="gray" variant="overline" textAlign="center">
        *Для прослушивания аудио кликните на изображение
      </Typography>
      <Typography variant="h5" textAlign="center">
        Уровень {group}
      </Typography>
      <div className="levels">
        {levels.map((level) => {
          return (
            <Container
              onClick={() => {
                setGroup(level)
              }}
              onKeyDown={() => setGroup(level)}
              key={String(level) + 'key'}
              id={String(level) + 'level'}
              sx={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              {level}
            </Container>
          )
        })}
      </div>
      <CardList page={page} group={group} />
      <Pagination
        count={30}
        showFirstButton
        showLastButton
        onChange={(_, page) => {
          if (page !== null) {
            setPage(page)
          }
        }}
        sx={{ alignSelf: 'center' }}
      />
    </>
  )
}
