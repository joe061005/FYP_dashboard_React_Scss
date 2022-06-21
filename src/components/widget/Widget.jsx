import React from 'react'
import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

const Widget = ({ type }) => {

  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        link: "See all users",
        icon: <PersonOutlineIcon
          className='icon'
          style={{ color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)" }}
        />
      }
      break;
    case "trailInfo":
      data = {
        title: "TRAIL INFO",
        link: "See all trail info",
        icon: <InfoOutlinedIcon
          className='icon'
          style={{ color: "goldenrod", backgroundColor: "rgba(218, 165, 32, 0.2)" }}
        />
      }
      break;
    case "form":
      data = {
        title: "FORMS",
        link: "See all forms",
        icon: <ArticleOutlinedIcon
          className='icon'
          style={{ color: "green", backgroundColor: "rgba(0, 128, 0, 0.2)" }}
        />
      }
      break;
    case "hikingGroups":
      data = {
        title: "GROUPS",
        link: "See all groups",
        icon: <GroupOutlinedIcon
          className='icon'
          style={{ color: "purple", backgroundColor: "rgba(128, 0, 128, 0.2)" }}
        />
      }
      break;

  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">2123</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          20%
        </div>
        {data.icon}
      </div>
    </div>
  )
}

export default Widget