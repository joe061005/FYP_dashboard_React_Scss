import React, { useState, useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import './new.scss'


const New = () => {

  const { setShowAlert, isLogout, showAlert } = useContext(UserContext)

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
      <div className="new">
        <div className="sideBarContainer">
          <Sidebar />
        </div>
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>Add New User</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                alt=""
              />

            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label>Username</label>
                  <input type="text" placeholder='username' />
                </div>
                <div className="formInput">
                  <label>Email</label>
                  <input type="email" placeholder='your email' />
                </div>
                <div className="formInput">
                  <label>Password</label>
                  <input type="password" placeholder='your password' />
                </div>
                <button>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  )
}

export default New