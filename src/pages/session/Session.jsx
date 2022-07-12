import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import './session.scss'
import SessionDT from '../../components/sessionDT/SessionDT'
import API from '../../Api/Api'
import ReactLoading from 'react-loading';
import { useNavigationType } from 'react-router-dom'
LoadingOverlay.propTypes = undefined

const Session = () => {

  const navigationType = useNavigationType();

  const { setShowAlert, isLogout, showAlert } = useContext(UserContext)

  const [sessionData, setSessionData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getSessionData = async () => {
    await API.getAllSession().then(([code, data, header]) => {
      if (code == '401' || code == '500') {
        console.log(data)
      } else if (code == '200') {
        setSessionData(data)
        localStorage.setItem('sessionData', JSON.stringify(data))
        setIsLoading(false)
      }
    })
  }

  useEffect(() => {
    console.log(navigationType)
    if (navigationType != "POP") {
      getSessionData()
    } else {
      setSessionData(JSON.parse(localStorage.getItem('sessionData')))
      setIsLoading(false)
    }
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
      <div className='session'>
        <div className="sideBarContainer">
          <Sidebar />
        </div>
        <div className="sessionContainer">
          <Navbar />
          {isLoading ?
            <div className="loading">
              <ReactLoading type="spin" color="#6439ff" />
            </div>
            :
            <SessionDT data={sessionData} />
          }
        </div>
      </div>
    </LoadingOverlay>
  )
}

export default Session