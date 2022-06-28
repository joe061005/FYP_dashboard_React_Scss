import React, { useState, useContext } from 'react'
import DatatableUI from '../../components/datatable/DatatableUI'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import './list.scss'

const List = () => {

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
      <div className="list">
        <div className="sideBarContainer">
          <Sidebar />
        </div>
        <div className="listContainer">
          <Navbar />
          <DatatableUI />
        </div>
      </div>
    </LoadingOverlay>
  )
}

export default List