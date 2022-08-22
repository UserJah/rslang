import { Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import React from 'react'
import img from '../../assets/img/rs_school.svg'
import './footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <div className="rs-logo">
        <a href="https://rs.school/">
          <img src={img} alt="rs-logo" />
        </a>
      </div>
      <div className="app-year">
        <Typography>(c) 2022</Typography>
      </div>
      <div className="githubs">
        <div className="github">
          <GitHubIcon />
          <a href="https://github.com/UserJah">
            <Typography>Рустам</Typography>
          </a>
        </div>
        <div className="github">
          <GitHubIcon />
          <a href="https://github.com/jardozzz">
            <Typography>Илья</Typography>
          </a>
        </div>
        <div className="github">
          <GitHubIcon />
          <a href="https://github.com/PartyZzzan77">
            <Typography>Дмитрий</Typography>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
