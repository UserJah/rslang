import * as React from 'react'
import { Paper } from '@mui/material'
import { Box } from '@mui/system'

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
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 5,
          width: { width },
          height: { height },
          borderRadius: 3,
        },
      }}
    >
      <Paper
        elevation={16}
        sx={{ display: 'flex', justifyContent: 'space-around' }}
      >
        {children}
      </Paper>
    </Box>
  )
}

export default StatCard
