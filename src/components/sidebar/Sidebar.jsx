import React, {useState, useContext} from 'react'
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
import API from '../../Api/Api.js'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
const Sidebar = () => {

  const navigate = useNavigate();
  const {setIsLogout, setShowAlert} = useContext(UserContext)
  

  const logout = async () => {
    setIsLogout(true)
    await API.logout().then(async ([code, data, header]) => {
      if (code == '200') {
        setIsLogout(false)
        navigate("/", {replace: true})
      }else {
        setIsLogout(false)
        setShowAlert(true)
      }
    })
  }

  return (
    <div className='sidebar'>
      <div className="top">
        <span className="logo" onClick={() => { navigate("/home")}}>
          topic
        </span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li onClick={() => { navigate("/home")}}>
            <DashboardIcon className='icon'/>
            <span>Dashboard</span>
          </li>
          <p className="title">DB INFORMATION</p>
          <li onClick={() => { navigate("/users")}}>
            <PersonOutlineOutlinedIcon className='icon'/>
            <span>Users</span>
          </li>
          <li onClick={() => { navigate("/trails")}}>
            <LandscapeOutlinedIcon className='icon'/>
            <span>Trails</span>
          </li>
          <li onClick={() => { navigate("/trailInfo")}}>
            <InfoOutlinedIcon className='icon' />
            <span>Trail Information</span>
          </li>
          <li onClick={() => { navigate("/forms")}}>
            <ArticleOutlinedIcon className='icon'/>
            <span>Forms</span>
          </li>
          <li onClick={() => { navigate("/groups")}}>
            <GroupOutlinedIcon className='icon'/>
            <span>Hiking Groups</span>
          </li>
          <li onClick={() => { navigate("/locations")}}>
            <MyLocationOutlinedIcon className='icon'/>
            <span>Locations</span>
          </li>
          <li onClick={() => { navigate("/sessions")}}>
            <CookieOutlinedIcon className='icon'/>
            <span>Sessions</span>
          </li>
          <p className="title">USER</p>
          <li onClick={() => { logout()}}>
            <ExitToAppOutlinedIcon className='icon'/>
            <span>Logout</span>
          </li>
        </ul>

      </div>
      <div className="bottom">
        <div className="colorOption"/>
        <div className="colorOption"/>         
      </div>
    </div>
  )
}

export default Sidebar