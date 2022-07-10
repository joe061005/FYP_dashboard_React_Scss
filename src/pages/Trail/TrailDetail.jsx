import React, { useState, useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useLocation } from 'react-router-dom';
import './trailDetail.scss'
import '../../components/customUI/customUI.scss'
import momentTz from 'moment-timezone'
import ReactLoading from 'react-loading';
import API from '../../Api/Api';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useEffect } from 'react';


const TrailDetail = () => {

    const navigate = useNavigate();

    const { state } = useLocation();
    const { trailId } = state

    const { setShowAlert, isLogout, showAlert } = useContext(UserContext)


    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [trailDetail, setTrailDetail] = useState([])

    const deleteTrailsConfirm = (id) => {
        console.log("called", id)
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>{`Do you want to delete this trail record (ID: ${id})`}</p>
                        <button onClick={() => { deleteTrail(id); onClose() }}>Yes</button>
                        <button onClick={() => { onClose() }}>No</button>
                    </div>
                )
            }
        })

    }

    const deleteTrail = async (id) => {
        const params = {
            trailList: [id]
        };

        setIsLoadingDelete(true)

        await API.deleteTrails(params).then(([code, data, header]) => {
            if (code == '401' || code == '500') {
                console.log(data)
            } else if (code == '200') {
                const filteredData = JSON.parse(localStorage.getItem('trailData'))
                const newList = filteredData.filter((row, index) => {
                    return row._id != id
                })
                localStorage.setItem('trailData', JSON.stringify(newList))
            }
        })
        setIsLoadingDelete(false)
        navigate(-1)
    }

    const getTrailDetail = async () => {

        await API.getTrailInfo(trailId).then(([code, data, header]) => {
            if (code == '401' || code == '500') {
                console.log(data)
            } else if (code == '200') {
                setTrailDetail(data[0])
                setIsLoading(false)
            }
        })
    }

    useEffect(() => {
        getTrailDetail()
    })



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
            <div className="trailDetail">
                <div className="sideBarContainer">
                    <Sidebar />
                </div>
                <div className="newContainer">
                    <Navbar />
                    {isLoading ?
                        <div className="loading">
                            <ReactLoading type="spin" color="#6439ff" />
                        </div>
                        :
                        <>
                            <div className="top">
                                <div className="goBackButton" onClick={() => { navigate(-1) }}>
                                    <ArrowBackIosNewIcon />
                                    <p className="goBackButtonText">Go Back</p>
                                </div>
                            </div>
                            <div className="bottom">
                                <div className="left">
                                    <img
                                        src="https://img.favpng.com/4/14/21/logo-graphic-design-png-favpng-SAzNNejqb3tVJq6VNqCZP4FQ7.jpg"
                                        alt=""
                                    />

                                </div>
                                <div className="right">
                                    <div className='detailContainer'>
                                        <div className="formInput">
                                            <label>Creation Time:</label>
                                            <p className="datatext">{trailDetail.timestamp}</p>
                                        </div>
                                        <div className="formInput">
                                            <label>Territory:</label>
                                            <p className="datatext">{trailDetail.district}</p>
                                        </div>
                                        <div className="formInput">
                                            <label>District:</label>
                                            <p className="datatext">{trailDetail.place}</p>
                                        </div>
                                        <div className="formInput">
                                            <label>Trail Name:</label>
                                            <p className="datatext">{trailDetail.title}</p>
                                        </div>
                                        <div className="formInput">
                                            <label>Description:</label>
                                            <p className="datatext">{trailDetail.description}</p>
                                        </div>
                                        <div className="formInput">
                                            <label>Distance (km):</label>
                                            <p className="datatext">{trailDetail.distance}</p>
                                        </div>
                                        <div className="formInput">
                                            <label>Difficulty (1-5 stars):</label>
                                            <p className="datatext">{trailDetail.star.filter((star) => { return star == '1' }).length}</p>
                                        </div>
                                        <div className="formInput">
                                            <label>Time:</label>
                                            <p className="datatext">{trailDetail.time.split(".")[0] == '0' ?
                                                `${trailDetail.time.split(".")[1]} minutes`
                                                :
                                                trailDetail.time.split(".")[1] == '0' ?
                                                    `${trailDetail.time.split(".")[0]} hours`
                                                    :
                                                    `${trailDetail.time.split(".")[0]} hours and ${trailDetail.time.split(".")[1]} minutes`
                                            }</p>
                                        </div>
                                        <div className="mapContainer">
                                        </div>
                                        {isLoadingDelete ?
                                            <div className="loading">
                                                <ReactLoading type="spin" color="#de4949" />
                                            </div>
                                            :
                                            <button onClick={() => { deleteTrailsConfirm(trailId) }}>Delete</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                </div>
            </div>
        </LoadingOverlay>
    )
}

export default TrailDetail