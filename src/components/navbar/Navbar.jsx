import React from 'react'
import './navbar.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import user from '../../asset/user.png'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder='Search...'/>
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className='logo' />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon className='logo'/>
          </div>
          <div className="item">
            <FullscreenOutlinedIcon className='logo'/>
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className='logo'/>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className='logo'/>
          </div>
          <div className="item">
            <ListOutlinedIcon />
          </div>
          <div className="item">
            <img 
              src={user}
              alt=''
              className='avatar'
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar