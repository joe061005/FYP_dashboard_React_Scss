import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import './trailInfo.scss'
import ReactLoading from 'react-loading';
import { useNavigationType } from 'react-router-dom'
import API from '../../Api/Api'
import InfoDT from '../../components/InfoDT/InfoDT';
LoadingOverlay.propTypes = undefined

const TrailInfo = () => {

    const navigationType = useNavigationType();

    const { setShowAlert, isLogout, showAlert } = useContext(UserContext)


    const [infoData, setInfoData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getInfoData = async () => {
        await API.getAllInfo().then(([code, data, header]) => {
            if (code == '401' || code == '500') {
                console.log(data)
            } else if (code == '200') {
                setInfoData(data)
                localStorage.setItem('infoData', JSON.stringify(data))
                setIsLoading(false)
            }
        })

    }

    useEffect(() => {
        console.log(navigationType)
        if (navigationType != "POP") {
            getInfoData()
        } else {
            setInfoData(JSON.parse(localStorage.getItem('infoData')))
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
            <div className="trailInfo">
                <div className="sideBarContainer">
                    <Sidebar />
                </div>
                <div className="trailInfoContainer">
                    <Navbar />
                    {isLoading ?
                        <div className="loading">
                            <ReactLoading type="spin" color="#6439ff" />
                        </div>
                        :
                        <InfoDT data={infoData} />
                    }
                </div>
            </div>
        </LoadingOverlay>
    )
}

export default TrailInfo