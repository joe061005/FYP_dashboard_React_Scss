import React from 'react'
import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import MyLocationOutlinedIcon from '@mui/icons-material/MyLocationOutlined';
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="top">
        <span className="logo">
          topic
        </span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className='icon'/>
            <span>Dashboard</span>
          </li>
          <p className="title">DB INFORMATION</p>
          <li>
            <PersonOutlineOutlinedIcon className='icon'/>
            <span>Users</span>
          </li>
          <li>
            <LandscapeOutlinedIcon className='icon'/>
            <span>Trails</span>
          </li>
          <li>
            <InfoOutlinedIcon className='icon' />
            <span>Trail Information</span>
          </li>
          <li>
            <ArticleOutlinedIcon className='icon'/>
            <span>Forms</span>
          </li>
          <li>
            <GroupOutlinedIcon className='icon'/>
            <span>Hiking Groups</span>
          </li>
          <li>
            <MyLocationOutlinedIcon className='icon'/>
            <span>Locations</span>
          </li>
          <li>
            <CookieOutlinedIcon className='icon'/>
            <span>Sessions</span>
          </li>
          <p className="title">USER</p>
          <li>
            <ExitToAppOutlinedIcon className='icon'/>
            <span>Logout</span>
          </li>
        </ul>

      </div>
      <div className="bottom">
        <div className="colorOption">

        </div>
        <div className="colorOption">
          
        </div>
        <div className="colorOption">
          
        </div>
      </div>

    </div>
  )
}

export default Sidebar