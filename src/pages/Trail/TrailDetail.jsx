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
import SimpleImageSlider from "react-simple-image-slider";
import { MapContainer, TileLayer, useMap, Marker, Popup, Tooltip, Polyline } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import Chart from '../../components/chart/Chart';
import TransportDT from '../../components/TransportDT/TransportDT';
import useCollapse from 'react-collapsed';

const myIcon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})

LoadingOverlay.propTypes = undefined


const TrailDetail = () => {

    const navigate = useNavigate();

    const { state } = useLocation();
    const { trailId } = state

    const { setShowAlert, isLogout, showAlert } = useContext(UserContext)


    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [trailDetail, setTrailDetail] = useState([])
    const [images, setImages] = useState([])
    const [path, setPath] = useState([])

    const [isInfoExpanded, setInfoExpanded] = useState(false)
    const infoCollapse = useCollapse({ isInfoExpanded })
    const [getInfoCollapseProps, getInfoToggleProps] = [infoCollapse.getCollapseProps, infoCollapse.getToggleProps]

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
                const images = data[0].image.map((img) => {
                    return { url: img }
                })
                const path = data[0].path.map((path) => {
                    return [path.latitude, path.longitude]
                })
                setPath(path)
                setImages(images)
                setIsLoading(false)
            }
        })
    }

    useEffect(() => {
        getTrailDetail()
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
                                            <label>Trail ID:</label>
                                            <p className="datatext">{trailDetail._id}</p>
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
                                                                {index == 0 ? `起點${marker.title? `: ${marker.title}` : ""}` : index == trailDetail.marker.length - 1 ? `終點${marker.title? `: ${marker.title}`: ""}` : `${marker.title}`}
                                                            </Tooltip>
                                                        </Marker>
                                                    ))
                                                }
                                                <Polyline pathOptions={{ color: 'black' }} positions={path} />
                                            </MapContainer>
                                        </div>
                                        <div className="heightChartContainer">
                                            <Chart data={{ xlabel: trailDetail.xlabel, ylabel: trailDetail.ylabel }} type="trailDetail" />
                                        </div>
                                        <div className="transportChartContainer">
                                            <p>Transportation at the starting point:</p>
                                            <TransportDT data={trailDetail.trafficStart} type="start"/>
                                        </div>
                                        <div className="transportChartContainer">
                                            <p>Transportation at the ending point:</p>
                                            <TransportDT data={trailDetail.trafficEnd}  type = "end"/>
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
                            <div className="expandListContainer">
                                <div className="header" {...getInfoToggleProps({
                                    onClick: () => setInfoExpanded((prev) => !prev)
                                })}>
                                    {isInfoExpanded ? 'Hide Info Details' : `Expand Info Details (Total: ${trailDetail.info.length})`}
                                </div>
                                <div {...getInfoCollapseProps()}>
                                    <div className="content">
                                        {trailDetail.info.length > 0 ?
                                            trailDetail.info.map((info, index) => (
                                                <div key={info._id}>
                                                    <p className='number'>Info {index + 1}:</p>
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
                                                                    <p className="datatext">{info.timestamp}</p>
                                                                </div>
                                                                <div className="formInput">
                                                                    <label>Info ID:</label>
                                                                    <p className="datatext">{info._id}</p>
                                                                </div>
                                                                <div className="formInput">
                                                                    <label>Provider ID:</label>
                                                                    <p className="datatext" onClick={() => { navigate('/users/userDetail', { state: { userId: info.userID } }) }} style={{ cursor: 'pointer', color: '#08a8ff' }}>{info.userID}</p>
                                                                </div>
                                                                <div className="formInput">
                                                                    <label>Trail ID:</label>
                                                                    {
                                                                        info.trailID ?
                                                                            <p className="datatext">{info.trailID}</p>
                                                                            :
                                                                            <p className="datatext">No</p>
                                                                    }
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
                                                </div>
                                            ))

                                            :

                                            <p className='emptyText'>This trail didn't have any info</p>
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