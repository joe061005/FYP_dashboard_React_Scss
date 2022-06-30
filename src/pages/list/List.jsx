import React, { useState, useContext, useEffect } from 'react'
import DatatableUI from '../../components/datatable/DatatableUI'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import './list.scss'
import API, { getUserData } from '../../Api/Api'
import ReactLoading from 'react-loading';

const List = () => {

  const { setShowAlert, isLogout, showAlert } = useContext(UserContext)

  const [userData, setUserData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getUserData = () => {
    API.getAllUser().then(([code, data, header]) => {
      if (code == '401') {
        console.log('error')
      } else if (code == '200') {
        setUserData(data)
        setIsLoading(false)
      }
    })
  }

  useEffect(() => {
    getUserData()
  }, [])

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
      <div className='list'>
        <div className="sideBarContainer">
          <Sidebar />
        </div>
        <div className="listContainer">
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
      <div className="list">
        <div className="sideBarContainer">
          <Sidebar />
        </div>
        <div className="listContainer">
          <Navbar />
          <DatatableUI data= {userData}/>
        </div>
      </div>
    </LoadingOverlay>
  )
}

export default List