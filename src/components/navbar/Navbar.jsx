import React, {useContext} from 'react'
import './navbar.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import user from '../../asset/user.png'
import { UserContext } from '../../context/UserContext';

const Navbar = (props) => {

  const {userName} = useContext(UserContext)

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
           <p>{userName}</p> 
          </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar