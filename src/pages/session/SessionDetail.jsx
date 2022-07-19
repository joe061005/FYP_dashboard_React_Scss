import React, { useState, useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useLocation } from 'react-router-dom';
import './sessionDetail.scss'
import '../../components/customUI/customUI.scss'
import momentTz from 'moment-timezone'
import ReactLoading from 'react-loading';
import API from '../../Api/Api';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
LoadingOverlay.propTypes = undefined


const SessionDetail = () => {

    const navigate = useNavigate();

    const { state } = useLocation();
    const { sessionData } = state

    const { setShowAlert, isLogout, showAlert } = useContext(UserContext)

    const [isLoadingDelete, setIsLoadingDelete] = useState(false)

    const deleteSessionsConfirm = (id) => {
        console.log("called", id)
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>{`Do you want to delete this session record (ID: ${id})`}</p>
                        <button onClick={() => { deleteSession(id); onClose() }}>Yes</button>
                        <button onClick={() => { onClose() }}>No</button>
                    </div>
                )
            }
        })

    }

    const deleteSession = async (id) => {
        const params = {
            sessionList: [id]
        };

        setIsLoadingDelete(true)

        await API.deleteSessions(params).then(([code, data, header]) => {
            if (code == '401' || code == '500') {
                console.log(data)
            } else if (code == '200') {
                const filteredData = JSON.parse(localStorage.getItem('sessionData'))
                const newList = filteredData.filter((row, index) => {
                    return row._id != id
                })
                localStorage.setItem('sessionData', JSON.stringify(newList))
            }
        })
        setIsLoadingDelete(false)
        navigate(-1)
    }



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
            <div className="sessionDetail">
                <div className="sideBarContainer">
                    <Sidebar />
                </div>
                <div className="newContainer">
                    <Navbar />
                    <div className="top">
                        <div className="goBackButton" onClick={() => { navigate(-1) }}>
                            <ArrowBackIosNewIcon />
                            <p className="goBackButtonText">Go Back</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <img
                                src="https://cdn.pixabay.com/photo/2020/11/28/11/25/cookie-5784367_960_720.png"
                                alt=""
                            />

                        </div>
                        <div className="right">
                            <div className='detailContainer'>
                                <div className="formInput">
                                    <label>Session ID:</label>
                                    <p className="datatext">{sessionData._id}</p>
                                </div>
                                <div className="formInput">
                                    <label>Expires:</label>
                                    <p className="datatext">{momentTz.tz(sessionData.expires, "Asia/Hong_Kong").format("DD-MM-YYYY HH:mm:ss")}</p>
                                </div>
                                <div className="formInput">
                                    <label>Active Time:</label>
                                    <p className="datatext">{sessionData.activeTime}</p>
                                </div>
                                <div className="formInput">
                                    <label>User ID:</label>
                                    {
                                        sessionData.iden != "Admin"?
                                        <p className="datatext" onClick={()=> {navigate('/users/userDetail', { state: { userId: sessionData.session.iden } }) }} style={{cursor: 'pointer', color:'#08a8ff'}}>{sessionData.session.iden}</p>
                                        :
                                        <p className="datatext">{sessionData.session.iden}</p>
                                    }
                               
                                </div>
                                <div className="formInput">
                                    <label>Max Age (ms):</label>
                                    <p className="datatext">{sessionData.session.cookie.originalMaxAge}</p>
                                </div>
                                <div className="formInput">
                                    <label>Secure:</label>
                                    <p className="datatext">{sessionData.session.cookie.secure? sessionData.session.cookie.secure: "null"}</p>
                                </div>
                                <div className="formInput">
                                    <label>HTTP Only:</label>
                                    <p className="datatext">{sessionData.session.cookie.httpOnly.toString()}</p>
                                </div>
                                <div className="formInput">
                                    <label>Domain:</label>
                                    <p className="datatext">{sessionData.session.cookie.domain? sessionData.session.cookie.domain: "null"}</p>
                                </div>
                                <div className="formInput">
                                    <label>Path:</label>
                                    <p className="datatext">{sessionData.session.cookie.path}</p>
                                </div>
                                <div className="formInput">
                                    <label>Same Site:</label>
                                    <p className="datatext">{sessionData.session.cookie.sameSite? sessionData.session.cookie.sameSite: "null"}</p>
                                </div>
                                {isLoadingDelete ?
                                    <div className="loading">
                                        <ReactLoading type="spin" color="#de4949" />
                                    </div>
                                    :
                                    <button onClick={() => {deleteSessionsConfirm(sessionData._id)}}>Delete</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoadingOverlay>
    )
}

export default SessionDetail