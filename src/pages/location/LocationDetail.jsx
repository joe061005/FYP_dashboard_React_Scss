import React, { useState, useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useLocation } from 'react-router-dom';
import './locationDetail.scss'
import '../../components/customUI/customUI.scss'
import momentTz from 'moment-timezone'
import ReactLoading from 'react-loading';
import API from '../../Api/Api';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { MapContainer, TileLayer, useMap, Marker, Popup, Tooltip, Polyline} from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'

const myIcon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})

LoadingOverlay.propTypes = undefined

const LocationDetail = () => {

    const navigate = useNavigate();

    const { state } = useLocation();
    const { locationData } = state

    const { setShowAlert, isLogout, showAlert } = useContext(UserContext)


    const [isLoadingDelete, setIsLoadingDelete] = useState(false)

    const deleteLocationsConfirm = (id) => {
        console.log("called", id)
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>{`Do you want to delete this location record (ID: ${id})`}</p>
                        <button onClick={() => { deleteLocation(id); onClose() }}>Yes</button>
                        <button onClick={() => { onClose() }}>No</button>
                    </div>
                )
            }
        })

    }

    const deleteLocation = async (id) => {
        const params = {
            locationList: [id]
        };

        setIsLoadingDelete(true)

        await API.deleteLocations(params).then(([code, data, header]) => {
            if (code == '401' || code == '500') {
                console.log(data)
            } else if (code == '200') {
                const filteredData = JSON.parse(localStorage.getItem('locationData'))
                const newList = filteredData.filter((row, index) => {
                    return row._id != id
                })
                localStorage.setItem('locationData', JSON.stringify(newList))
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
            <div className="locationDetail">
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
                                src="https://cdn-icons-png.flaticon.com/512/535/535137.png"
                                alt=""
                            />

                        </div>
                        <div className="right">
                            <div className='detailContainer'>
                                <div className="formInput">
                                    <label>Location ID:</label>
                                    <p className="datatext">{locationData._id}</p>
                                </div>
                                <div className="formInput">
                                    <label>Group ID:</label>
                                    <p className="datatext">{locationData.groupID ? locationData.groupID : "No group"}</p>
                                </div>
                                <div className="formInput">
                                    <label>User ID:</label>
                                    <p className="datatext" onClick={()=> {navigate('/users/userDetail', { state: { userId: locationData.userID} }) }} style={{cursor: 'pointer', color:'#08a8ff'}}>{locationData.userID}</p>
                                </div>
                                <div className="formInput">
                                    <label>Date:</label>
                                    <p className="datatext">{momentTz.tz(locationData.date, "Asia/Hong_Kong").format("DD-MM-YYYY HH:mm:ss")}</p>
                                </div>
                                <div className="mapContainer">
                                    <label className='mapLabel'>Coordinate: {`(${locationData.coordinate.latitude}, ${locationData.coordinate.longitude})`}</label>
                                    <MapContainer center={[locationData.coordinate.latitude, locationData.coordinate.longitude]} zoom={17} className="map">
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[locationData.coordinate.latitude, locationData.coordinate.longitude]} icon={myIcon}>
                                            <Tooltip permanent>
                                                User's Location
                                            </Tooltip>
                                        </Marker>
                                    </MapContainer>
                                </div>
                                {isLoadingDelete ?
                                    <div className="loading">
                                        <ReactLoading type="spin" color="#de4949" />
                                    </div>
                                    :
                                    <button onClick={() => { deleteLocationsConfirm(locationData._id) }}>Delete</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoadingOverlay>
    )
}

export default LocationDetail