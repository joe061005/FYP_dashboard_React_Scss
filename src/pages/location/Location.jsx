import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import './location.scss'
import ReactLoading from 'react-loading';
import { useNavigationType } from 'react-router-dom'
import API from '../../Api/Api'
import LocationDT from '../../components/LocationDT/LocationDT';


const Location = () => {

    const navigationType = useNavigationType();

    const { setShowAlert, isLogout, showAlert } = useContext(UserContext)

    const [locationData, setLocationData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getLocationData = async () => {
        await API.getAllLocation().then(([code, data, header]) => {
            if (code == '401' || code == '500') {
                console.log(data)
            } else if (code == '200') {
                setLocationData(data)
                localStorage.setItem('locationData', JSON.stringify(data))
                setIsLoading(false)
            }
        })

    }

    useEffect(() => {
        console.log(navigationType)
        if (navigationType != "POP") {
            getLocationData()
        } else {
            setLocationData(JSON.parse(localStorage.getItem('locationData')))
            setIsLoading(false)
        }
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
            <div className='location'>
                <div className="sideBarContainer">
                    <Sidebar />
                </div>
                <div className="locationContainer">
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
            <div className="location">
                <div className="sideBarContainer">
                    <Sidebar />
                </div>
                <div className="locationContainer">
                    <Navbar />
                    <LocationDT data={locationData} />
                </div>
            </div>
        </LoadingOverlay>
    )
}

export default Location