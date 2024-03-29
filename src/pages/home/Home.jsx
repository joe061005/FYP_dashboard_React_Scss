import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.scss'
import { useLocation, useNavigationType } from 'react-router-dom'
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
LoadingOverlay.propTypes = undefined


const Home = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  const { setShowAlert, isLogout, showAlert } = useContext(UserContext)


  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState([])
  const [infoData, setInfoData] = useState([])
  const [formData, setFormData] = useState([])
  const [groupData, setGroupData] = useState([])
  const [detailDataType, setDetailDataType] = useState('')
  const [detailData, setDetailData] = useState([])

  const getAllData = async () => {
    await API.getAllData().then(([code, data, header]) => {
      if (code == '401' || code == '500') {
        console.log(data)
      } else if (code == '200') {
        setUserData(data.user)
        setInfoData(data.info)
        setFormData(data.form)
        setGroupData(data.group)
        localStorage.setItem('userDB', JSON.stringify(data.user))
        localStorage.setItem('infoDB', JSON.stringify(data.info))
        localStorage.setItem('formDB', JSON.stringify(data.form))
        localStorage.setItem('groupDB', JSON.stringify(data.group))
      }
    })
  }

  useEffect(() => {
    if (navigationType != "POP") {
      Promise.all([getAllData()]).then(() => {
        setIsLoading(false);
        setDetailDataType('userData')
      })
    } else {
      setUserData(JSON.parse(localStorage.getItem('userDB')))
      setInfoData(JSON.parse(localStorage.getItem('infoDB')))
      setFormData(JSON.parse(localStorage.getItem('formDB')))
      setGroupData(JSON.parse(localStorage.getItem('groupDB')))
      setIsLoading(false);
      setDetailDataType('userData')
    }
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

  return (
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
          {isLoading ?
            <div className="loading">
              <ReactLoading type="spin" color="#6439ff" />
            </div>
            :
            <>
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
            </>
          }

        </div>
      </div>
    </LoadingOverlay>
  )
}


export default Home;