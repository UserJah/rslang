import React, { useState } from 'react'
import CardList from './cardList'
import { Button, Pagination, Typography } from '@mui/material'
import { Container } from '@mui/system'
import './wordCard.css'

export const TextBook = () => {
  const [page, setPage] = useState(
    JSON.parse(localStorage.getItem('page')!) || 1
  )
  const [group, setGroup] = useState(
    JSON.parse(localStorage.getItem('group')!) || 1
  )
  const [color, setColor] = useState(
    JSON.parse(localStorage.getItem('color')!) || 'lightgreen'
  )

  const levels = [1, 2, 3, 4, 5, 6]
  const colors = [
    'lightgreen',
    'lightskyblue',
    'yellow',
    'orange',
    'orangered',
    'red',
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" textAlign="center">
        Электронный учебник страница {page}
      </Typography>

      <Typography variant="h5" textAlign="center">
        Уровень {group}
      </Typography>
      <Container maxWidth="sm" sx={{ display: 'flex' }}>
        {levels.map((level, index) => {
          return (
            <Container
              onClick={() => {
                setGroup(level)
                setColor(colors[index])
                setPage(1)
                localStorage.setItem('group', JSON.stringify(level))
                localStorage.setItem('color', JSON.stringify(colors[index]))
                localStorage.setItem('page', JSON.stringify(1))
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
        {localStorage.userInfo ? (
          <Container
            onClick={() => {
              setGroup(7)
              setColor('brown')
              setPage(1)
              localStorage.setItem('group', JSON.stringify(7))
              localStorage.setItem('color', JSON.stringify('brown'))
              localStorage.setItem('page', JSON.stringify(1))
            }}
            onKeyDown={() => setGroup(7)}
            key={String(7) + 'key'}
            id={String(7) + 'level'}
            sx={{
              backgroundColor: 'brown',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: '1px solid black',
            }}
          >
            {7}
          </Container>
        ) : null}
      </Container>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          justifySelf: 'center',
          alignSelf: 'center',
        }}
      >
        <Button variant="contained" sx={{ backgroundColor: color }}>
          Аудиовызов
        </Button>
        <Button variant="contained" sx={{ backgroundColor: color }}>
          Спринт
        </Button>
      </Container>
      <CardList page={page} group={group} color={color} />
      <Pagination
        count={30}
        showFirstButton
        showLastButton
        defaultPage={page}
        sx={{ justifySelf: 'center', alignSelf: 'center' }}
        onChange={(_, page) => {
          if (page !== null) {
            setPage(page)
            localStorage.setItem('page', JSON.stringify(page))
          }
        }}
      />
    </div>
  )
}
