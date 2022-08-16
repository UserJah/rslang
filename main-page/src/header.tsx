import { LanguageSharp } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import React from "react"

function Header() {
  return (
    <AppBar>
      <Toolbar>
        <Typography>
          RS Lang
        </Typography>
        <IconButton>
          <LanguageSharp />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header