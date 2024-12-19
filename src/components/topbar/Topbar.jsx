import React from 'react'
import './topbar.css'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';

const Topbar = () => {

  return (
    <div className="topbar-fields">
            <LanguageIcon className="icon"/>
            <NotificationsNoneOutlinedIcon className="icon" />
            <SettingsIcon className="icon" />
            <img src="https://img.freepik.com/premium-photo/cute-girl-3d-character-design-cartoon-girl-avatar_432516-5512.jpg" alt="profile-picture"/>
    </div>
  )
}

export default Topbar
