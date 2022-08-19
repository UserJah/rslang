import { Typography } from '@mui/material'
import React from 'react'
import ImgMediaCard from './team-card'

const Team = () => {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          borderTop: '1px solid gray',
          mt: 4,
          pt: 2,
        }}
      >
        Наша команда
      </Typography>
      <div className="team">
        <ImgMediaCard />
        <ImgMediaCard />
        <ImgMediaCard />
      </div>
    </>
  )
}

export default Team
