import React, { useEffect, useState } from 'react'
import { Path, Word } from '../../api/types'
import WordCard from './wordCard'
import { Container } from '@mui/material'

const CardList = ({ page, group, color }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(Path.base + Path.word + '?' + `group=${group - 1}&page=${page - 1}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItems(result)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [group, page])

  if (error) {
    return <div>Ошибка: {error}</div>
  } else if (!isLoaded) {
    return <div>Загрузка...</div>
  } else {
    return (
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}
      >
        {items.map((item: Word) => (
          <WordCard props={item} key={item.id} color={color}/>
        ))}
      </Container>

    )
  }
}

export default CardList
