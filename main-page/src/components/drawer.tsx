import { Circle } from '@mui/icons-material'
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import React from 'react'

function TemporalyDrawer(state: boolean | undefined) {
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

  const list = () => (
    <Box
      sx={{ widnth: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Главная', 'Учебник', 'Аудиовызов', 'Спринт', 'Статистика'].map(
          (text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Circle />
                </ListItemIcon>
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
      <Button onClick={toggleDrawer(true)}>ASDADAS</Button>
      <Drawer open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  )
}

export default TemporalyDrawer
