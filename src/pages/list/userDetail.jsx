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
import momentTz from 'moment-timezone'

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

    const [isInfoExpanded, setInfoExpanded] = useState(false)
    const infoCollapse = useCollapse({ isInfoExpanded })
    const [getInfoCollapseProps, getInfoToggleProps] = [infoCollapse.getCollapseProps, infoCollapse.getToggleProps]

    const [isFormExpanded, setFormExpanded] = useState(false)
    const formCollapse = useCollapse({ isFormExpanded })
    const [getFormCollapseProps, getFormToggleProps] = [formCollapse.getCollapseProps, formCollapse.getToggleProps]

    const [isGroupExpanded, setGroupExpanded] = useState(false)
    const groupCollapse = useCollapse({ isGroupExpanded })
    const [getGroupCollapseProps, getGroupToggleProps] = [groupCollapse.getCollapseProps, groupCollapse.getToggleProps]

    const [isLocationExpanded, setLocationExpanded] = useState(false)
    const locationCollapse = useCollapse({ isLocationExpanded })
    const [getLocationCollapseProps, getLocationToggleProps] = [locationCollapse.getCollapseProps, locationCollapse.getToggleProps]

    const [isSessionExpanded, setSessionExpanded] = useState(false)
    const sessionCollapse = useCollapse({ isSessionExpanded })
    const [getSessionCollapseProps, getSessionToggleProps] = [sessionCollapse.getCollapseProps, sessionCollapse.getToggleProps]

    const rounding = (num) => {
        return Math.round(num * 10) / 10
    }

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
                                            <p className="datatext">{userDetail.user.confirmed ? "Yes" : "No"}</p>
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
                            <div className="expandListContainer">
                                <div className="header" {...getInfoToggleProps({
                                    onClick: () => setInfoExpanded((prev) => !prev)
                                })}>
                                    {isInfoExpanded ? 'Hide Info Details' : `Expand Info Details (Total: ${userDetail.info.length})`}
                                </div>
                                <div {...getInfoCollapseProps()}>
                                    <div className="content">
                                        {userDetail.info.length > 0 ?
                                            userDetail.info.map((info, index) => (
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

                                            <p className='emptyText'>This user didn't provide any info</p>
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className="expandListContainer">
                                <div className="header" {...getFormToggleProps({
                                    onClick: () => setFormExpanded((prev) => !prev)
                                })}>
                                    {isFormExpanded ? 'Hide Form Details' : `Expand Form Details`}
                                </div>
                                <div {...getFormCollapseProps()}>
                                    <div className="content">
                                        {userDetail.form?
                                            (
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
                                                                <p className="datatext">{userDetail.form.timestamp}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>Form ID:</label>
                                                                <p className="datatext">{userDetail.form._id}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>User ID:</label>
                                                                <p className="datatext">{userDetail.form.user}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>Name:</label>
                                                                <p className="datatext">{userDetail.form.name}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>Phone Number:</label>
                                                                <p className="datatext">{userDetail.form.phoneNumber ? userDetail.form.phoneNumber : "No phone number"}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>Gender:</label>
                                                                <p className="datatext">{userDetail.form.gender == 0 ? "Female" : "Male"}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>Age:</label>
                                                                <p className="datatext">{`${userDetail.form.age}0-${userDetail.form.age}9`}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>Hiking Experience:</label>
                                                                <p className="datatext">{userDetail.form.experience == 1 ? "0-2 year(s)" : `${userDetail.form.experience * 2 - 1}-${userDetail.form.experience * 2} year(s)`}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>Trail Difficulty:</label>
                                                                <p className="datatext">{`${userDetail.form.difficulty} star(s)`}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>Trail Duration:</label>
                                                                <p className="datatext">{userDetail.form.time == 1 ? "1-2 hour(s)" : `${userDetail.form.time * 2 - 1}-${userDetail.form.time * 2} hour(s)`}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>Start Time:</label>
                                                                <p className="datatext">{userDetail.form.startTime == 0 ? "Morning" : userDetail.form.startTime == 1 ? "Afternoon" : "Night"}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>Trail View:</label>
                                                                <p className="datatext">{`${userDetail.form.view} star(s)`}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )

                                            :

                                            <p className='emptyText'>This user didn't submit the form</p>
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className="expandListContainer">
                                <div className="header" {...getGroupToggleProps({
                                    onClick: () => setGroupExpanded((prev) => !prev)
                                })}>
                                    {isGroupExpanded ? 'Hide Group Details' : `Expand Group Details`}
                                </div>
                                <div {...getGroupCollapseProps()}>
                                    <div className="content">
                                        {userDetail.group ?
                                            (
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
                                                                <p className="datatext">{userDetail.group._id}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>Creation Time:</label>
                                                                <p className="datatext">{userDetail.group.timestamp}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>Start Time:</label>
                                                                <p className="datatext">{userDetail.group.startTime == 0 ? "Morning" : userDetail.group.startTime == 1 ? "Afternoon" : "Night"}</p>
                                                            </div>
                                                            <div className="formInput">
                                                                <label>(Age, Experience, Difficulty, Time, View):</label>
                                                                <p className="datatext">{`(${rounding(userDetail.group.centroids[0])}, ${rounding(userDetail.group.centroids[1])}, ${rounding(userDetail.group.centroids[2])}, ${rounding(userDetail.group.centroids[3])}, ${rounding(userDetail.group.centroids[4])})`}</p>
                                                            </div>
                                                            <div className="GroupDetail">
                                                                <label>Group Member (Phone Number):</label>
                                                                {userDetail.group.record.map((value, index) => {
                                                                    return (
                                                                        <div className="groupMember" key={index} style={{background: value.user == userId?  '#03fcf0' : ''}}>
                                                                            <p className="datatext">{`${value.name}${value.phoneNumber ? ` (${value.phoneNumber})` : ""}  - ${value.age},${value.experience},${value.difficulty},${value.time},${value.view}`}</p>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )

                                            :

                                            <p className='emptyText'>This user didn't join a group</p>
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className="expandListContainer">
                                <div className="header" {...getLocationToggleProps({
                                    onClick: () => setLocationExpanded((prev) => !prev)
                                })}>
                                    {isLocationExpanded ? 'Hide Location Details' : `Expand Location Details`}
                                </div>
                                <div {...getLocationCollapseProps()}>
                                    <div className="content">
                                        {userDetail.location.length > 0 ?
                                            userDetail.location.map((location, index) => (
                                                <div key={location._id}>
                                                    <p className='number'>Location {index + 1}:</p>
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
                                                                    <p className="datatext">{location._id}</p>
                                                                </div>
                                                                <div className="formInput">
                                                                    <label>Group ID:</label>
                                                                    <p className="datatext">{location.groupID ? location.groupID : "No group"}</p>
                                                                </div>
                                                                <div className="formInput">
                                                                    <label>User ID:</label>
                                                                    <p className="datatext">{location.userID}</p>
                                                                </div>
                                                                <div className="formInput">
                                                                    <label>Date:</label>
                                                                    <p className="datatext">{momentTz.tz(location.date, "Asia/Hong_Kong").format("DD-MM-YYYY HH:mm:ss")}</p>
                                                                </div>
                                                                <div className="mapContainer">
                                                                    <label className='mapLabel'>Coordinate: {`(${location.coordinate.latitude}, ${location.coordinate.longitude})`}</label>
                                                                    <iframe
                                                                        src={`https://leaflet-api.vercel.app/?center=${location.coordinate.latitude},${location.coordinate.longitude}&zoom=18&marker=User%20Location|${location.coordinate.latitude},${location.coordinate.longitude}`}
                                                                        className="map"
                                                                        allow='geolocation'

                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))

                                            :

                                            <p className='emptyText'>This user didn't provide location information</p>
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className="expandListContainer">
                                <div className="header" {...getSessionToggleProps({
                                    onClick: () => setSessionExpanded((prev) => !prev)
                                })}>
                                    {isSessionExpanded ? 'Hide Session Details' : `Expand Session Details`}
                                </div>
                                <div {...getSessionCollapseProps()}>
                                    <div className="content">
                                        {userDetail.session.length > 0 ?
                                            userDetail.session.map((session, index) => (
                                                <div key={session._id}>
                                                    <p className='number'>Session {index + 1}:</p>
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
                                                                    <p className="datatext">{session._id}</p>
                                                                </div>
                                                                <div className="formInput">
                                                                    <label>Expires:</label>
                                                                    <p className="datatext">{momentTz.tz(session.expires, "Asia/Hong_Kong").format("DD-MM-YYYY HH:mm:ss")}</p>
                                                                </div>
                                                                <div className="formInput">
                                                                    <label>Active Time:</label>
                                                                    <p className="datatext">{session.activeTime}</p>
                                                                </div>
                                                                <div className="formInput">
                                                                    <label>User ID:</label>
                                                                    <p className="datatext">{session.session.iden}</p>
                                                                </div>
                                                                <div className="formInput">
                                                                    <label>Max Age (ms):</label>
                                                                    <p className="datatext">{session.session.cookie.originalMaxAge}</p>
                                                                </div>
                                                                <div className="formInput">
                                                                    <label>Secure:</label>
                                                                    <p className="datatext">{session.session.cookie.secure ? session.session.cookie.secure : "null"}</p>
                                                                </div>
                                                                <div className="formInput">
                                                                    <label>HTTP Only:</label>
                                                                    <p className="datatext">{session.session.cookie.httpOnly.toString()}</p>
                                                                </div>
                                                                <div className="formInput">
                                                                    <label>Domain:</label>
                                                                    <p className="datatext">{session.session.cookie.domain ? session.session.cookie.domain : "null"}</p>
                                                                </div>
                                                                <div className="formInput">
                                                                    <label>Path:</label>
                                                                    <p className="datatext">{session.session.cookie.path}</p>
                                                                </div>
                                                                <div className="formInput">
                                                                    <label>Same Site:</label>
                                                                    <p className="datatext">{session.session.cookie.sameSite ? session.session.cookie.sameSite : "null"}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))

                                            :
                                            <p className='emptyText'>This user didn't have session information</p>
                                        }
                                    </div>
                                </div>

                            </div>
                        </>
                    }

                </div>
            </div>
        </LoadingOverlay >
    )
}

export default UserDetail