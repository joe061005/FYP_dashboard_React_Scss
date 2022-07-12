import React, { useState, useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useLocation } from 'react-router-dom';
import './trailInfoDetail.scss'
import '../../components/customUI/customUI.scss'
import momentTz from 'moment-timezone'
import ReactLoading from 'react-loading';
import API from '../../Api/Api';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
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


const TrailInfoDetail = () => {

    const navigate = useNavigate();

    const { state } = useLocation();
    const { infoData } = state

    const { setShowAlert, isLogout, showAlert } = useContext(UserContext)


    const [isLoadingDelete, setIsLoadingDelete] = useState(false)

    const deleteTrailInfosConfirm = (id) => {
        console.log("called", id)
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>{`Do you want to delete this trail info record (ID: ${id})`}</p>
                        <button onClick={() => { deleteTrailInfo(id); onClose() }}>Yes</button>
                        <button onClick={() => { onClose() }}>No</button>
                    </div>
                )
            }
        })

    }

    const deleteTrailInfo = async (id) => {
        const params = {
            infoList: [id]
        };

        setIsLoadingDelete(true)

        await API.deleteInfos(params).then(([code, data, header]) => {
            if (code == '401' || code == '500') {
                console.log(data)
            } else if (code == '200') {
                const filteredData = JSON.parse(localStorage.getItem('infoData'))
                const newList = filteredData.filter((row, index) => {
                    return row._id != id
                })
                localStorage.setItem('infoData', JSON.stringify(newList))
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
            <div className="trailInfoDetail">
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
                                src="https://www.clipartmax.com/png/small/343-3432875_computer-icons-information-angle-logo-brand-nfl-atlanta-falcons-power-decal-light.png"
                                alt=""
                            />

                        </div>
                        <div className="right">
                            <div className='detailContainer'>
                                <div className="formInput">
                                    <label>Creation Time:</label>
                                    <p className="datatext">{infoData.timestamp}</p>
                                </div>
                                <div className="formInput">
                                    <label>Info ID:</label>
                                    <p className="datatext">{infoData._id}</p>
                                </div>
                                <div className="formInput">
                                    <label>District:</label>
                                    <p className="datatext">{infoData.district}</p>
                                </div>
                                <div className="formInput">
                                    <label>Trail:</label>
                                    <p className="datatext">{infoData.trail}</p>
                                </div>
                                <div className="formInput">
                                    <label>Info Type:</label>
                                    <p className="datatext">{infoData.type}</p>
                                </div>
                                <div className="formInput">
                                    <label>Description:</label>
                                    <p className="datatext">{infoData.description}</p>
                                </div>
                                <div className="mapContainer">
                                    <label className='mapLabel'>Coordinate: {`(${infoData.location.latitude}, ${infoData.location.longitude})`}</label>
                                    <MapContainer center={[infoData.location.latitude, infoData.location.longitude]} zoom={17} className="map">
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[infoData.location.latitude, infoData.location.longitude]} icon={myIcon}>
                                            <Tooltip permanent>
                                                Info Location
                                            </Tooltip>
                                        </Marker>
                                    </MapContainer>
                                </div>
                                <div className="imageContainer">
                                    <label>Image: </label>
                                    <img
                                        src={infoData.image}
                                        alt=""
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                                {isLoadingDelete ?
                                    <div className="loading">
                                        <ReactLoading type="spin" color="#de4949" />
                                    </div>
                                    :
                                    <button onClick={() => { deleteTrailInfosConfirm(infoData._id) }}>Delete</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoadingOverlay>
    )
}

export default TrailInfoDetail