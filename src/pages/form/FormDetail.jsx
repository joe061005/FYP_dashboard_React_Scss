import React, { useState, useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useLocation } from 'react-router-dom';
import './formDetail.scss'
import '../../components/customUI/customUI.scss'
import momentTz from 'moment-timezone'
import ReactLoading from 'react-loading';
import API from '../../Api/Api';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useEffect } from 'react';
LoadingOverlay.propTypes = undefined



const FormDetail = () => {

    const navigate = useNavigate();

    const { state } = useLocation();
    const { formData } = state

    const { setShowAlert, isLogout, showAlert } = useContext(UserContext)


    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [filteredData, setFilteredData] = useState({})


    const deleteFormsConfirm = (id) => {
        console.log("called", id)
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>{`Do you want to delete the form record (User ID: ${id})`}</p>
                        <button onClick={() => { deleteForm(id); onClose() }}>Yes</button>
                        <button onClick={() => { onClose() }}>No</button>
                    </div>
                )
            }
        })

    }

    const deleteForm = async (id) => {
        const params = {
            userID: id
        }

        setIsLoadingDelete(true)

        await API.quitGroup(params).then(([code, data, header]) => {
            if (code == '401' || code == '500') {
                console.log(data)
            } else if (code == '200') {

                const filteredData = JSON.parse(localStorage.getItem('formData'))

                const newList = filteredData.filter((row, index) => {
                    return row.user != id
                })
                localStorage.setItem('formData', JSON.stringify(newList))


            }
        })
        setIsLoadingDelete(false)
        navigate(-1)
    }

    useEffect(() => {
        setFilteredData(formData)
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
            <div className="formDetail">
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
                                src="https://cdn-icons-png.flaticon.com/512/1484/1484799.png"
                                alt=""
                            />

                        </div>
                        <div className="right">
                            <div className='detailContainer'>
                                <div className="formInput">
                                    <label>Submisssion Time:</label>
                                    <p className="datatext">{filteredData.timestamp}</p>
                                </div>
                                <div className="formInput">
                                    <label>Form ID:</label>
                                    <p className="datatext">{filteredData._id}</p>
                                </div>
                                <div className="formInput">
                                    <label>User ID:</label>
                                    <p className="datatext" onClick={()=> {navigate('/users/userDetail', { state: { userId: filteredData.user} }) }} style={{cursor: 'pointer', color:'#08a8ff'}}>{filteredData.user}</p>
                                </div>
                                <div className="formInput">
                                    <label>Name:</label>
                                    <p className="datatext">{filteredData.name}</p>
                                </div>
                                <div className="formInput">
                                    <label>Phone Number:</label>
                                    <p className="datatext">{filteredData.phoneNumber ? filteredData.phoneNumber : "No phone number"}</p>
                                </div>
                                <div className="formInput">
                                    <label>Gender:</label>
                                    <p className="datatext">{filteredData.gender == 0 ? "Female" : "Male"}</p>
                                </div>
                                <div className="formInput">
                                    <label>Age:</label>
                                    <p className="datatext">{`${filteredData.age}0-${filteredData.age}9`}</p>
                                </div>
                                <div className="formInput">
                                    <label>Hiking Experience:</label>
                                    <p className="datatext">{filteredData.experience == 1 ? "0-2 year(s)" : `${filteredData.experience * 2 - 1}-${filteredData.experience * 2} year(s)`}</p>
                                </div>
                                <div className="formInput">
                                    <label>Trail Difficulty:</label>
                                    <p className="datatext">{`${filteredData.difficulty} star(s)`}</p>
                                </div>
                                <div className="formInput">
                                    <label>Trail Duration:</label>
                                    <p className="datatext">{filteredData.time == 1 ? "1-2 hour(s)" : `${filteredData.time * 2 - 1}-${filteredData.time * 2} hour(s)` }</p>
                                </div>
                                <div className="formInput">
                                    <label>Start Time:</label>
                                    <p className="datatext">{filteredData.startTime == 0 ? "Morning" : filteredData.startTime == 1 ? "Afternoon" : "Night"}</p>
                                </div>
                                <div className="formInput">
                                    <label>Trail View:</label>
                                    <p className="datatext">{`${filteredData.view} star(s)` }</p>
                                </div>


                                {isLoadingDelete ?
                                    <div className="loading">
                                        <ReactLoading type="spin" color="#de4949" />
                                    </div>
                                    :
                                    <button onClick={() => { deleteFormsConfirm(filteredData.user) }}>Delete</button>

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </LoadingOverlay>
    )
}

export default FormDetail