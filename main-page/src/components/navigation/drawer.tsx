import { Circle, Menu } from '@mui/icons-material'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
      <Menu  onClick={toggleDrawer(true)} cursor="pointer"></Menu>
      <Drawer open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  )
}

export default TemporalyDrawer
