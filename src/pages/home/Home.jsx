import React, { useState, useContext, useEffect} from 'react'
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


const Home = () => {
  const location = useLocation();

  const {setShowAlert, isLogout, showAlert} = useContext(UserContext)

  const [userData, setUserData] = useState([])
  const [infoData, setInfoData] = useState([])
  const [formData, setFormData] = useState([])
  const [groupData, setGroupData] = useState([])

  const getUserData = async() => {
      await API.getUserData().then(([code, data, header]) => {
        if (code == '401') {
          console.log('error')
        } else if (code == '200') {
          setUserData(data)
        } 
      })
  }

  const getInfoData = async() => {
    await API.getInfoData().then(([code, data, header]) => {
      if (code == '401') {
        console.log('error')
      } else if (code == '200') {
        setInfoData(data)
      } 
    })
}

const getFormData = async() => {
  await API.getFormData().then(([code, data, header]) => {
    if (code == '401') {
      console.log('error')
    } else if (code == '200') {
      setFormData(data)
    } 
  })
}

const getGroupData = async() => {
  await API.getGroupData().then(([code, data, header]) => {
    if (code == '401') {
      console.log('error')
    } else if (code == '200') {
      setGroupData(data)
    } 
  })
}

  useEffect(() => {
    Promise.all([getUserData(), getInfoData(), getFormData(), getGroupData()])
  }, [])
 
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
          <Sidebar />
          <div className="homeContainer">
            <Navbar/>
            <div className="widgets">
              <Widget type = "user" passedData={userData}/>
              <Widget type = "trailInfo" passedData={infoData}/>
              <Widget type = "form" passedData={formData}/>
              <Widget type = "hikingGroups" passedData={groupData}/>
            </div>
            <div className="charts">
              <Featured />
              <Chart />
            </div>
            <div className="listContainer">
              <div className="listTitle">Latest Tx</div>
              <TableUI />
            </div>
          </div>
        </div>
      </LoadingOverlay>
  )
}

export default Home;