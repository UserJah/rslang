import {
  Menu,
  Home,
  ImportContacts,
  HeadsetMic,
  DirectionsRun,
  BarChart,
} from '@mui/icons-material'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

function TemporalyDrawer() {
  const [state, setState] = useState(false)

  const toggleDrawer =
    (open: boolean | ((prevState: boolean) => boolean)) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setState(open)
    }

  const Icons = [
    <Home key={1} />,
    <ImportContacts key={2} />,
    <HeadsetMic key={3} />,
    <DirectionsRun key={4} />,
    <BarChart key={5} />,
  ]

  const list = () => (
    <Box
      sx={{ width: 250, mt: 12 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography variant="h4">Главное меню</Typography>
      <List>
        {['Главная', 'Учебник', 'Аудиовызов', 'Спринт', 'Статистика'].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{Icons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  )
  return (
    <div>
      <Menu onClick={toggleDrawer(true)} cursor="pointer"></Menu>
      <Drawer open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  )
}

export default TemporalyDrawer
