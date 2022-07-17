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
import SimpleImageSlider from "react-simple-image-slider";
import { MapContainer, TileLayer, useMap, Marker, Popup, Tooltip, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'

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
                                        {/* <div className="formInput">
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
                                                    `${trailDetail.time.split(".")[0]} hour(s)`
                                                    :
                                                    `${trailDetail.time.split(".")[0]} hour(s) and ${trailDetail.time.split(".")[1]} minutes`
                                            }</p>
                                        </div>
                                        <div className="imageContainer">
                                            <p>Images: </p>
                                            <SimpleImageSlider
                                                images={images}
                                                showBullets={true}
                                                showNavs={true}
                                                width={'48%'}
                                                height={500}
                                                autoPlay={true}
                                            />
                                        </div>
                                        <div className="mapContainer" style={{ zIndex: 0 }}>
                                            <p>Map: </p>
                                            <MapContainer center={[trailDetail.marker[0].latlong.latitude, trailDetail.marker[0].latlong.longitude]} zoom={15} className="map">
                                                <TileLayer
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                {
                                                    trailDetail.marker.map((marker, index) => (
                                                        <Marker position={[marker.latlong.latitude, marker.latlong.longitude]} icon={myIcon} key={index}>
                                                            <Tooltip permanent>
                                                                {index == 0 ? `起點: ${marker.title}` : index == trailDetail.marker.length - 1 ? `終點: ${marker.title}` : `${marker.title}`}
                                                            </Tooltip>
                                                        </Marker>
                                                    ))
                                                }
                                                <Polyline pathOptions={{ color: 'black' }} positions={path} />
                                            </MapContainer>
                                        </div> */}
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
                        </>
                    }

                </div>
            </div>
        </LoadingOverlay>
    )
}

export default UserDetail