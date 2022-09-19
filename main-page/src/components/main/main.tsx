import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import img from '../../assets/img/english-img.png'
import './main.css'
import Team from './team'
import CustomizedAccordions from './accordion'
import { Link } from 'react-router-dom'
import { YoutubeEmbed } from './youtubeEmbed'

const Main = () => {
  return (
    <>
      <div className="main">
        <Container
          className="about"
          maxWidth="md"
          sx={{
            mt: '30px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <Typography variant="h2" sx={{ color: 'red' }}>
            RS Lang
          </Typography>
          <Typography
            sx={{ color: 'gray', opacity: '70%', textAlign: 'justify' }}
          >
            Приложение для изучения иностранных слов, включающее электронный
            учебник с базой слов для изучения, мини-игры для их повторения,
            страницу статистики для отслеживания индивидуального прогресса.
          </Typography>
          <CustomizedAccordions />
        </Container>
        <Container
          maxWidth="md"
          sx={{
            backgroundImage: `url(${img})`,
            backgroundSize: '',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Link className="link" to="1">
            <Button
              variant="contained"
              color="warning"
              size="large"
              sx={{ m: 8 }}
            >
              <Typography variant="h5">Начать учиться!</Typography>
            </Button>
          </Link>
        </Container>
      </div>
      <YoutubeEmbed embedId={'SnHTTOM9OPY'} />
      <Team />
    </>
  )
}

export default Main
