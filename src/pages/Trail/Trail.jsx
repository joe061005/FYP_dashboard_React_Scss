import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import './trail.scss'
import ReactLoading from 'react-loading';
import { useNavigationType } from 'react-router-dom'
import API from '../../Api/Api'
import TrailDT from '../../components/TrailDT/TrailDT'
LoadingOverlay.propTypes = undefined


const Trail = () => {

    const navigationType = useNavigationType();

    const { setShowAlert, isLogout, showAlert } = useContext(UserContext)

    const [trailData, setTrailData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getTrailData = async () => {
        await API.getAllTrail().then(([code, data, header]) => {
            if (code == '401' || code == '500') {
                console.log(data)
            } else if (code == '200') {
                setTrailData(data)
                localStorage.setItem('trailData', JSON.stringify(data))
                setIsLoading(false)
            }
        })

    }

    useEffect(() => {
        console.log(navigationType)
        if (navigationType != "POP") {
            getTrailData()
        } else {
            setTrailData(JSON.parse(localStorage.getItem('trailData')))
            setIsLoading(false)
        }
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
            <div className="trail">
                <div className="sideBarContainer">
                    <Sidebar />
                </div>
                <div className="trailContainer">
                    <Navbar />
                    {isLoading ?
                        <div className="loading">
                            <ReactLoading type="spin" color="#6439ff" />
                        </div>
                        :
                        <TrailDT data={trailData} />
                    }
                </div>
            </div>
        </LoadingOverlay>
    )
}

export default Trail