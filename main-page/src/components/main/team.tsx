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
          name="Rustam"
          photoLink={img1}
          description="Create mainpage"
          href="https://github.com/UserJah"
        />
        <ImgMediaCard
          name="Ilya"
          photoLink={img2}
          description="Create games"
          href="https://github.com/jardozzz"
        />
        <ImgMediaCard
          name="Dmitry"
          photoLink={img3}
          description="Create user auth"
          href="https://github.com/PartyZzzan77"
        />
      </div>
    </>
  )
}

export default Team
