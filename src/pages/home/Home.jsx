import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.scss'
import { useLocation } from 'react-router-dom'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import Widget from '../../components/widget/Widget'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import TableUI from '../../components/Table/TableUI'
import { UserContext } from '../../context/UserContext';
import API from '../../Api/Api'
import { DataSaverOffRounded } from '@mui/icons-material'
import ReactLoading from 'react-loading';


const Home = () => {
  const location = useLocation();

  const { setShowAlert, isLogout, showAlert } = useContext(UserContext)


  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState([])
  const [infoData, setInfoData] = useState([])
  const [formData, setFormData] = useState([])
  const [groupData, setGroupData] = useState([])
  const [detailDataType, setDetailDataType] = useState('')
  const [detailData, setDetailData] = useState([])


  const getUserData = async () => {
    await API.getUserData().then(([code, data, header]) => {
      if (code == '401' || code == '500') {
        console.log(data)
      } else if (code == '200') {
        setUserData(data)
      }
    })
  }

  const getInfoData = async () => {
    await API.getInfoData().then(([code, data, header]) => {
      if (code == '401' || code == '500') {
        console.log(data)
      } else if (code == '200') {
        setInfoData(data)
      }
    })
  }

  const getFormData = async () => {
    await API.getFormData().then(([code, data, header]) => {
      if (code == '401' || code == '500') {
        console.log(data)
      } else if (code == '200') {
        setFormData(data)
      }
    })
  }

  const getGroupData = async () => {
    await API.getGroupData().then(([code, data, header]) => {
      if (code == '401' || code == '500') {
        console.log(data)
      } else if (code == '200') {
        setGroupData(data)
      }
    })
  }

  useEffect(() => {
    Promise.all([getUserData(), getInfoData(), getFormData(), getGroupData()]).then(() => {
      setIsLoading(false);
      setDetailDataType('userData')
    })
  }, [])

  useEffect(() => {
    switch (detailDataType) {
      case 'userData':
        setDetailData(userData)
        break;

      case 'infoData':
        setDetailData(infoData)
        break;

      case 'formData':
        setDetailData(formData)
        break;

      case 'groupData':
        setDetailData(groupData)
        break;
    }
  }, [detailDataType])

  return isLoading ? (
    <LoadingOverlay
      active={isLogout}
      spinner
      text='Logout...'
    >
      <ReactJsAlert
        status={showAlert}
        type="error"
        title="Please try again later!"
        Close={() => setShowAlert(false)}
      />
      <div className='home'>
        <div className="sideBarContainer">
          <Sidebar />
        </div>
        <div className="homeContainer">
          <Navbar />
          <div className="loading">
            <ReactLoading type="spin" color="#6439ff" />
          </div>
        </div>
      </div>
    </LoadingOverlay>
  ) : (
    <LoadingOverlay
      active={isLogout}
      spinner
      text='Logout...'
    >
      <ReactJsAlert
        status={showAlert}
        type="error"
        title="Please try again later!"
        Close={() => setShowAlert(false)}
      />
      <div className='home'>
        <div className="sideBarContainer">
          <Sidebar />
        </div>
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <div className='widgetContainer' onClick={() => { setDetailDataType('userData') }}>
              <Widget type="user" passedData={userData} clicked={detailDataType == 'userData' ? true : false} />
            </div>
            <div className='widgetContainer' onClick={() => { setDetailDataType('infoData') }}>
              <Widget type="trailInfo" passedData={infoData} clicked={detailDataType == 'infoData' ? true : false} />
            </div>
            <div className='widgetContainer' onClick={() => { setDetailDataType('formData') }}>
              <Widget type="form" passedData={formData} clicked={detailDataType == 'formData' ? true : false} />
            </div>
            <div className='widgetContainer' onClick={() => { setDetailDataType('groupData') }}>
              <Widget type="hikingGroups" passedData={groupData} clicked={detailDataType == 'groupData' ? true : false} />
            </div>
          </div>
          <div className="charts">
            <Featured data={detailData} />
            <Chart data={detailData} />
          </div>
          {/*
            <div className="listContainer">
              <div className="listTitle">Latest Tx</div>
              <TableUI data={detailData} />
            </div>
            */}
        </div>
      </div>
    </LoadingOverlay>
  )
}


export default Home;