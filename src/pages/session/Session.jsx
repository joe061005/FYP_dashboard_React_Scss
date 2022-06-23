import React, { useState, useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import './session.scss'

const Session = () => {

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
            <div className="session">
                <Sidebar />
                <div className="sessionContainer">
                    <Navbar />
                </div>
            </div>
        </LoadingOverlay>
    )
}

export default Session