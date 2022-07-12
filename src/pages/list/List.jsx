import React, { useState, useContext, useEffect } from 'react'
import DatatableUI from '../../components/datatable/DatatableUI'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import './list.scss'
import API from '../../Api/Api'
import ReactLoading from 'react-loading';
import momentTz from 'moment-timezone'
LoadingOverlay.propTypes = undefined

const List = () => {

  const { setShowAlert, isLogout, showAlert } = useContext(UserContext)

  const [userData, setUserData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getUserData = async () => {
    await API.getAllUser().then(([code, data, header]) => {
      if (code == '401' || code == '500') {
        console.log(data)
      } else if (code == '200') {
        setUserData(data)
        setIsLoading(false)
      }
    })
  }

  useEffect(() => {
    getUserData()
  }, [])

  return(
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
          {isLoading ?
            <div className="loading">
              <ReactLoading type="spin" color="#6439ff" />
            </div>
            :
            <DatatableUI data={userData} />
          }
        </div>
      </div>
    </LoadingOverlay>
  )
}

export default List