import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useLocation } from 'react-router-dom';
import './userDetail.scss'
import '../../components/customUI/customUI.scss'
import ReactLoading from 'react-loading';
import API from '../../Api/Api';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { MapContainer, TileLayer, useMap, Marker, Popup, Tooltip, Polyline } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import useCollapse from 'react-collapsed';

const myIcon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})

LoadingOverlay.propTypes = undefined


const UserDetail = () => {

    const navigate = useNavigate();

    const { state } = useLocation();
    const { userId } = state

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

    const { setShowAlert, isLogout, showAlert } = useContext(UserContext)


    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [userDetail, setUserDetail] = useState([])

    const deleteUsersConfirm = (id) => {
        console.log("called", id)
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>{`Do you want to delete this user record (ID: ${id})`}</p>
                        <button onClick={() => { deleteUser(id); onClose() }}>Yes</button>
                        <button onClick={() => { onClose() }}>No</button>
                    </div>
                )
            }
        })

    }

    const deleteUser = async (id) => {
        const params = {
            userList: [id]
        };

        setIsLoadingDelete(true)

        await API.deleteUsers(params).then(([code, data, header]) => {
            if (code == '401' || code == '500') {
                console.log(data)
            } else if (code == '200') {
                const filteredData = JSON.parse(localStorage.getItem('userData'))
                const newList = filteredData.filter((row, index) => {
                    return row._id != id
                })
                localStorage.setItem('userData', JSON.stringify(newList))
            }
        })
        setIsLoadingDelete(false)
        navigate(-1)
    }

    const getUserDetail = async () => {

        await API.getUserInfo(userId).then(([code, data, header]) => {
            if (code == '401' || code == '500') {
                console.log(data)
            } else if (code == '200') {
                setUserDetail(data)
                setIsLoading(false)
            }
        })
    }

    useEffect(() => {
        getUserDetail()
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
            <div className="userDetail">
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
                                        src="https://icon2.cleanpng.com/20180920/att/kisspng-user-logo-information-service-design-5ba34f886b6700.1362345615374293844399.jpg"
                                        alt=""
                                    />

                                </div>
                                <div className="right">
                                    <div className='detailContainer'>
                                        <div className="formInput">
                                            <label>Creation Time:</label>
                                            <p className="datatext">{userDetail.user.timestamp}</p>
                                        </div>
                                        <div className="formInput">
                                            <label>User ID:</label>
                                            <p className="datatext">{userDetail.user._id}</p>
                                        </div>
                                        <div className="formInput">
                                            <label>Username:</label>
                                            <p className="datatext">{userDetail.user.username}</p>
                                        </div>
                                        <div className="formInput">
                                            <label>Password:</label>
                                            <p className="datatext">{userDetail.user.password}</p>
                                        </div>
                                        <div className="formInput">
                                            <label>Email:</label>
                                            <p className="datatext">{userDetail.user.email}</p>
                                        </div>
                                        <div className="formInput">
                                            <label>Confirmed:</label>
                                            <p className="datatext">{userDetail.user.confirmed ? "True" : "False"}</p>
                                        </div>

                                        {isLoadingDelete ?
                                            <div className="loading">
                                                <ReactLoading type="spin" color="#de4949" />
                                            </div>
                                            :
                                            <button onClick={() => { deleteUsersConfirm(userId) }}>Delete</button>
                                        }
                                    </div>
                                </div>
                            </div>



                            <div className="infoContainer">
                                <div className="header" {...getToggleProps()}>
                                    {isExpanded ? 'Hide Info details' : 'Expand Info details'}
                                </div>
                                <div {...getCollapseProps()}>
                                    <div className="content">
                                        {userDetail.info.length > 0 ?
                                            userDetail.info.map((info, index) => (
                                                <div className="bottom" key={info._id}>
                                                    <div className="left">
                                                        <img
                                                            src="https://www.clipartmax.com/png/small/343-3432875_computer-icons-information-angle-logo-brand-nfl-atlanta-falcons-power-decal-light.png"
                                                            alt=""
                                                        />

                                                    </div>
                                                    <div className="right">
                                                        <div className='detailContainer'>
                                                            <div className="formInput">
                                                                <label>Creation Time:</label>
                                                                <p className="datatext">{info.timestamp}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>Info ID:</label>
                                                                <p className="datatext">{info._id}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>District:</label>
                                                                <p className="datatext">{info.district}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>Trail:</label>
                                                                <p className="datatext">{info.trail}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>Info Type:</label>
                                                                <p className="datatext">{info.type}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>Description:</label>
                                                                <p className="datatext">{info.description}</p>
                                                            </div>
                                                            <div className="mapContainer">
                                                                <label className='mapLabel'>Coordinate: {`(${info.location.latitude}, ${info.location.longitude})`}</label>
                                                                <iframe
                                                                    src={`https://leaflet-api.vercel.app/?center=${info.location.latitude},${info.location.longitude}&zoom=18&marker=Info%20Location|${info.location.latitude},${info.location.longitude}`}
                                                                    className="map"
                                                                    allow='geolocation'

                                                                />
                                                            </div>
                                                            <div className="imageContainer">
                                                                <label>Image: </label>
                                                                <img
                                                                    src={info.image}
                                                                    alt=""
                                                                    width="100%"
                                                                    height="100%"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))

                                            :

                                            <p>This user didn't provide any info</p>
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

export default UserDetail