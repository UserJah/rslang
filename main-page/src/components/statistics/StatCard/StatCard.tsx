import * as React from 'react'
import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import classes from './StatCard.module.css'

const StatCard = ({
  width,
  height,
  children,
}: {
  children: React.ReactNode
  width: number
  height: number
}) => {
  return (
    <Box
      className={classes.box}
      sx={{
        display: 'flex',

        '& > :not(style)': {
          m: 4,
          maxWidth: { width },
          maxHeight: { height },
          borderRadius: 3,
        },
      }}
    >
      <Paper
        elevation={16}
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: 'white',
          opacity: 0.8,
        }}
      >
        {children}
      </Paper>
    </Box>
  )
}

export default StatCard
