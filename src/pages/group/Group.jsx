import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import './group.scss'
import GroupDT from '../../components/GroupDT/GroupDT'
import API from '../../Api/Api'
import ReactLoading from 'react-loading';
import { useNavigationType } from 'react-router-dom'


const Group = () => {
    const navigationType = useNavigationType();

    const { setShowAlert, isLogout, showAlert } = useContext(UserContext)

    const [groupData, setGroupData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getGroupData = async () => {
        await API.getAllGroup().then(([code, data, header]) => {
            if (code == '401' || code == '500') {
                console.log(data)
            } else if (code == '200') {
                setGroupData(data)
                localStorage.setItem('groupData', JSON.stringify(data))
                setIsLoading(false)
            }
        })
    }

    useEffect(() => {
        console.log(navigationType)
        if (navigationType != "POP") {
            getGroupData()
        } else {
            setGroupData(JSON.parse(localStorage.getItem('groupData')))
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
            <div className='group'>
                <div className="sideBarContainer">
                    <Sidebar />
                </div>
                <div className="groupContainer">
                    <Navbar />
                    {isLoading ?
                        <div className="loading">
                            <ReactLoading type="spin" color="#6439ff" />
                        </div>
                        :
                        <GroupDT data={groupData} />
                    }
                </div>
            </div>
        </LoadingOverlay>
    )
}

export default Group