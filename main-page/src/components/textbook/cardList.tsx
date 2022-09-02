import React, { useEffect, useState } from 'react'
import WordCard from './wordCard'
import { Container } from '@mui/material'
import AuthPathConstants from '../../constants/AuthPath.constants'
import { Word, WordSignature } from '../../api/types'

const CardList = ({ page, group, color }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    if (group === 7) {
      const NonStringedUser = localStorage.getItem('userInfo') as string
      const user = JSON.parse(NonStringedUser)
      const token = user.token
      fetch(AuthPathConstants.BASE + AuthPathConstants.USERS +  `/${user.userId}` + AuthPathConstants.AGGREGATED_WORDS + `?wordsPerPage=600&`+ AuthPathConstants.FILTER_BY_HARD,     
        {headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }})
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true)
            setItems(Object.entries(...result)[0][1])
            console.log(Object.entries(...result)[0][1]);
          },
          (error) => {
            setIsLoaded(true)
            setError(error)
          }
        )
    } else {
    fetch(AuthPathConstants.BASE + AuthPathConstants.WORDS + '?' + `group=${group - 1}&page=${page - 1}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItems(result)
          console.log(items);
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
      }
  }, [group, page])

  if (error) {
    return <div>Ошибка: {error}</div>
  } else if (!isLoaded) {
    return <div>Загрузка...</div>
  } else {
    return (
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {items.map((item: Word) => (
          group === 7 ? <WordCard props={item} key={item.word} color={color} /> : <WordCard props={item} key={item.id} color={color} />
          
        ))}
      </Container>
    )
  }
}

export default CardList
