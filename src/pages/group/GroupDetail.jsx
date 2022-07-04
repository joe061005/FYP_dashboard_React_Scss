import React, { useState, useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useLocation } from 'react-router-dom';
import './groupDetail.scss'
import '../../components/customUI/customUI.scss'
import momentTz from 'moment-timezone'
import ReactLoading from 'react-loading';
import API from '../../Api/Api';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const GroupDetail = () => {

    const navigate = useNavigate();

    const { state } = useLocation();
    const { groupData } = state

    const { setShowAlert, isLogout, showAlert } = useContext(UserContext)


    const [isLoadingDelete, setIsLoadingDelete] = useState(false)

    const rounding = (num) => {
        return Math.round(num * 10) / 10
    }

    const deleteGroupsConfirm = (id) => {
        console.log("called", id)
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>{`Do you want to delete the selected record(s) (ID: ${id})`}</p>
                        <button onClick={() => { deleteGroup(id); onClose() }}>Yes</button>
                        <button onClick={() => { onClose() }}>No</button>
                    </div>
                )
            }
        })

    }

    const deleteGroup = async (id) => {
        const params = {
            groupList: [id]
        };

        setIsLoadingDelete(true)

        await API.deleteGroups(params).then(([code, data, header]) => {
            if (code == '401' || code == '500') {
                console.log(data)
            } else if (code == '200') {
                const filteredData = JSON.parse(localStorage.getItem('groupData'))
                const newList = filteredData.filter((row, index) => {
                    return row._id != id
                })
                localStorage.setItem('groupData', JSON.stringify(newList))
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
            <div className="groupDetail">
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
                                src="https://images-platform.99static.com//9FtPXBZ2ELdv-x-Iq4aIUw_4CPg=/0x0:2000x2000/fit-in/500x500/projects-files/106/10694/1069463/7c2a0d5b-72f9-49ab-ba93-533ab742c3d8.png"
                                alt=""
                            />

                        </div>
                        <div className="right">
                            <div className='detailContainer'>
                                <div className="formInput">
                                    <label>Group ID:</label>
                                    <p className="datatext">{groupData._id}</p>
                                </div>
                                <div className="formInput">
                                    <label>Creation Time:</label>
                                    <p className="datatext">{groupData.timestamp}</p>
                                </div>
                                <div className="formInput">
                                    <label>Start Time:</label>
                                    <p className="datatext">{groupData.startTime == 0 ? "Morning" : groupData.startTime == 1 ? "Afternoon" : "Night"}</p>
                                </div>
                                <div className="formInput">
                                    <label>(Age, Experience, Difficulty, Time, View):</label>
                                    <p className="datatext">{`(${rounding(groupData.centroids[0])}, ${rounding(groupData.centroids[1])}, ${rounding(groupData.centroids[2])}, ${rounding(groupData.centroids[3])}, ${rounding(groupData.centroids[4])})`}</p>
                                </div>
                                <div className="GroupDetail">
                                    <label>Group Member (Phone Number):</label>
                                    {groupData.record.map((value, index) => {
                                        return (
                                            <p className="datatext">{`${value.name}${value.phoneNumber? ` (${value.phoneNumber})`: ""}`}</p>
                                        )
                                    })}
                                </div>

                                {isLoadingDelete ?
                                    <div className="loading">
                                        <ReactLoading type="spin" color="#de4949" />
                                    </div>
                                    :
                                    <button onClick={() => { deleteGroupsConfirm(groupData._id) }}>Delete</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoadingOverlay>
    )
}

export default GroupDetail