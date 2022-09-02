import React, { useState } from 'react'
import CardList from './cardList'
import { Button, Pagination, Typography } from '@mui/material'
import { Container } from '@mui/system'
import './wordCard.css'
import { groups, TextBookConstants, colors } from '../../constants/TextBook.constants'

export const TextBook = () => {
  const [page, setPage] = useState(
    JSON.parse(localStorage.getItem(TextBookConstants.TEXT_BOOK_INFO)!) ? JSON.parse(localStorage.getItem(TextBookConstants.TEXT_BOOK_INFO)!).page : 1
  )
  const [group, setGroup] = useState(
    JSON.parse(localStorage.getItem(TextBookConstants.TEXT_BOOK_INFO)!) ? JSON.parse(localStorage.getItem(TextBookConstants.TEXT_BOOK_INFO)!).group : 1
  )
  const [color, setColor] = useState(
    JSON.parse(localStorage.getItem(TextBookConstants.TEXT_BOOK_INFO)!) ? JSON.parse(localStorage.getItem(TextBookConstants.TEXT_BOOK_INFO)!).color : 'lightgreen'
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" textAlign="center">
        Электронный учебник страница {page}
      </Typography>
      <Typography variant="h5" textAlign="center">
        {group === 7 ? 'Сложные слова ': `Уровень ${group}`}
      </Typography>
      <Container maxWidth="sm" sx={{ display: 'flex' }}>
        {groups.map((group, index) => {
          return (
            <Container
              onClick={() => {
                setGroup(group)
                setColor(colors[index])
                setPage(1)
                localStorage.setItem(TextBookConstants.TEXT_BOOK_INFO, JSON.stringify({group, color: colors[index], page : 1}))
              }}
              onKeyDown={() => setGroup(group)}
              key={String(group) + 'key'}
              id={String(group) + 'group'}
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
              {group}
            </Container>
          )
        })}
        {localStorage.userInfo ? (
          <Container
            onClick={() => {
              setGroup(7)
              setColor('brown')
              setPage(1)
              localStorage.setItem(TextBookConstants.TEXT_BOOK_INFO, JSON.stringify({group: 7, color: 'brown', page : 1}))
            }}
            onKeyDown={() => setGroup(7)}
            key={String(7) + 'key'}
            id={String(7) + 'group'}
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
        count={group === 7 ? 1 : 30}
        showFirstButton
        showLastButton
        page={page}
        sx={{ justifySelf: 'center', alignSelf: 'center' }}
        onChange={(_, page) => {
          if (page !== null) {
            setPage(page)
            localStorage.setItem(TextBookConstants.TEXT_BOOK_INFO, JSON.stringify({group, color, page}))
          }
        }}
      />
    </div>
  )
}
