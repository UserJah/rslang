import React, { useState } from 'react'
import CardList from './cardList'
import { Pagination, Typography } from '@mui/material'
import { Container } from '@mui/system'
import './wordCard.css'

export const TextBook = () => {
  const [page, setPage] = useState(1)
  const [group, setGroup] = useState(1)
  const [color, setColor] = useState('lightgreen')
  
  const levels = [1, 2, 3, 4, 5, 6]
  const colors = ['lightgreen', 'lightskyblue', 'yellow', 'orange', 'orangered', 'red']

  return (
    <>
      <Typography variant="h3" textAlign="center">
        Электронный учебник страница {page}
      </Typography>

      <Typography variant="h5" textAlign="center">
        Уровень {group}
      </Typography>
      <Typography color="gray" variant="overline" textAlign="center">
        *Для прослушивания аудио кликните на изображение
      </Typography>
      <div className="levels">
        {levels.map((level, index) => {
          return (
            <Container
              onClick={() => {
                setGroup(level)
                setColor(colors[index])
              }}
              onKeyDown={() => setGroup(level)}
              key={String(level) + 'key'}
              id={String(level) + 'level'}
              sx={{
                backgroundColor: colors[index],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '1px solid black',
              }}
            >
              {level}
            </Container>
          )
        })}
      </div>
      <CardList page={page} group={group} color={color}/>
      <Pagination
        count={30}
        showFirstButton
        showLastButton
        onChange={(_, page) => {
          if (page !== null) {
            setPage(page)
          }
        }}
        sx={{ alignSelf: 'center'}}
      />
    </>
  )
}
