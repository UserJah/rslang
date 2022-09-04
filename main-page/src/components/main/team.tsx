import { Typography } from '@mui/material'
import React from 'react'
import ImgMediaCard from './team-card'
import img1 from '../../assets/img/bird1.png'
import img2 from '../../assets/img/bird2.png'
import img3 from '../../assets/img/bird3.png'

const Team = () => {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          mb: 2,
          pt: 2,
        }}
      >
        Наша команда
      </Typography>
      <div className="team">
        <ImgMediaCard
          name="Рустам"
          photoLink={img1}
          description="Разработал главную страницу, электронный учебник, дизайн приложения."
          href="https://github.com/UserJah"
        />
        <ImgMediaCard
          name="Илья"
          photoLink={img2}
          description="Разработал игры Спринт и Аудиовызов. Настроил API для общения с сервером."
          href="https://github.com/jardozzz"
        />
        <ImgMediaCard
          name="Дмитрий"
          photoLink={img3}
          description="Прикрутил авторизацию, настроил роутинг, разработал раздел статистики."
          href="https://github.com/PartyZzzan77"
        />
      </div>
    </>
  )
}

export default Team
