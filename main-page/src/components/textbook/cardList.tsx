import React, { useEffect, useState } from 'react'
import WordCard from './wordCard'
import { Container } from '@mui/material'
import AuthPathConstants from '../../constants/AuthPath.constants'
import { Word } from '../../api/types'
import img from '../../assets/img/completed.png'

const CardList = ({ page, group, color, updateAllLearned, allLearned }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [changed, setChanged] = useState(0)

  const change = () => {
    setChanged(changed => changed+=1)
  }

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
          },
          (error) => {
            setIsLoaded(true)
            setError(error)
          }
        )
    } else {
      if (localStorage.userInfo) {
        const NonStringedUser = localStorage.getItem('userInfo') as string
        const user = JSON.parse(NonStringedUser)
        const token = user.token
      fetch(AuthPathConstants.BASE + AuthPathConstants.USERS +  `/${user.userId}` + AuthPathConstants.AGGREGATED_WORDS + '?' + `wordsPerPage=20&group=${group - 1}&page=${page - 1}`,
      {headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }}
      )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItems(Object.entries(...result)[0][1]);
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        })} else {
        fetch(AuthPathConstants.BASE + AuthPathConstants.WORDS + '?' + `group=${group - 1}&page=${page - 1}`)
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true)
            setItems(result);
          },
          (error) => {
            setIsLoaded(true)
            setError(error)
          }
        )
      }
      }
  }, [group, page, changed])

  if (localStorage.userInfo && items.filter((item) => item.userWord && item.userWord.optional && item.userWord.optional.isKnown === true).length === 20) {
    updateAllLearned(true)
  } else {
    updateAllLearned(false)
  }

  if (error) {
    return <div>Ошибка: {error}</div>
  } else if (!isLoaded) {
    return <div>Загрузка...</div>
  } else {
    return (
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', backgroundImage: allLearned ? `url(${img})`: 'none', backgroundSize: 'contain' }}
      >
        {items.map((item: Word) => (
          <WordCard props={item} key={item.word} color={color} group={group} change={change}/>
        ))}
      </Container>
    )
  }
}

export default CardList
