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
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect } from 'react';
import { SettingsSystemDaydreamTwoTone } from '@mui/icons-material';


const GroupDetail = () => {

    const navigate = useNavigate();

    const { state } = useLocation();
    const { groupData } = state

    const { setShowAlert, isLogout, showAlert } = useContext(UserContext)


    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [filteredData, setFilteredData] = useState({ centroids: [], record: [] })

    const rounding = (num) => {
        return Math.round(num * 10) / 10
    }

    const quitGroupConfirm = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>{`Do you want to delete the group member (ID: ${id})`}</p>
                        <button onClick={() => { quitGroup(id); onClose() }}>Yes</button>
                        <button onClick={() => { onClose() }}>No</button>
                    </div>
                )
            }
        })
    }

    const quitGroup = (id) => {
        const params = {
            formID: id
        }

        const newList = filteredData.record.filter((row, index) => {
            return row._id != id
        })

        const newRecord = {...filteredData, record: newList}

        console.log("newRecord: ", newRecord)

        setFilteredData((prev) =>  ({...prev, record: newList}))

        const OgGroupData = JSON.parse(localStorage.getItem('groupData'))
        const newGpList = OgGroupData.map((row, index) => {
            return row._id == filteredData._id? newRecord : row
        })

        console.log("newGPLIST: ", newGpList)
        localStorage.setItem('groupData', JSON.stringify(newGpList))


        // setIsLoadingDelete(true)

        // await API.quitGroup(params).then(([code, data, header]) => {
        //     if (code == '401' || code == '500') {
        //         console.log(data)
        //     } else if (code == '200') {
        //         const newList = groupData.record.filter((row, index) => {
        //             return row._id != id
        //         })
        //         groupData.record = newList
        //     }
        // })
        // setIsLoadingDelete(false)
    }

    const deleteGroupsConfirm = (id) => {
        console.log("called", id)
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>{`Do you want to delete the group record (ID: ${id})`}</p>
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

    useEffect(() => {
        setFilteredData(groupData)
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
                                    <p className="datatext">{filteredData._id}</p>
                                </div>
                                <div className="formInput">
                                    <label>Creation Time:</label>
                                    <p className="datatext">{filteredData.timestamp}</p>
                                </div>
                                <div className="formInput">
                                    <label>Start Time:</label>
                                    <p className="datatext">{filteredData.startTime == 0 ? "Morning" : filteredData.startTime == 1 ? "Afternoon" : "Night"}</p>
                                </div>
                                <div className="formInput">
                                    <label>(Age, Experience, Difficulty, Time, View):</label>
                                    <p className="datatext">{`(${rounding(filteredData.centroids[0])}, ${rounding(filteredData.centroids[1])}, ${rounding(filteredData.centroids[2])}, ${rounding(filteredData.centroids[3])}, ${rounding(filteredData.centroids[4])})`}</p>
                                </div>
                                <div className="GroupDetail">
                                    <label>Group Member (Phone Number):</label>
                                    {filteredData.record.map((value, index) => {
                                        return (
                                            <div className="groupMember">
                                                <p className="datatext">{`${value.name}${value.phoneNumber ? ` (${value.phoneNumber})` : ""}`}</p>
                                                <CancelIcon className='deleteIcon' onClick={() => { quitGroupConfirm(value._id); }} />
                                            </div>
                                        )
                                    })}
                                </div>

                                {isLoadingDelete ?
                                    <div className="loading">
                                        <ReactLoading type="spin" color="#de4949" />
                                    </div>
                                    :
                                    <button onClick={() => { deleteGroupsConfirm(filteredData._id) }}>Delete</button>

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