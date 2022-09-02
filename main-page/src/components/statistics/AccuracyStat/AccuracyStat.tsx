import * as React from 'react'
import { Typography } from '@mui/material'

const AccuracyStat = () => {
  return (
    <div
      style={{
        padding: '1rem 0',
        display: 'flex',
        gap: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'space-around'
      }}
    >
      <Typography variant="h5" component="h5" sx={{ fontWeight: 'bold' }}>
        Точность
      </Typography>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          border: '5px solid #d2cdcd',
          boxShadow: '0 0 .5rem gray',
          padding: '.5rem .5rem',
          borderRadius: 100,
        }}
      >
        0%
      </Typography>
    </div>
  )
}
export default AccuracyStat
