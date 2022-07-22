import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import './newTrail.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReactLoading from 'react-loading';
import API from "../../Api/Api"
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'



LoadingOverlay.propTypes = undefined

const Territories = ['Hong Kong Island', 'Kowloon', 'New Territories']


const NewTrail = () => {

    const navigate = useNavigate();

    const { setShowAlert, isLogout, showAlert } = useContext(UserContext)

    const [image, setImage] = useState("")
    const [marker, setMarker] = useState("")
    const [xlabel, setXlabel] = useState("")
    const [ylabel, setYlabel] = useState("")
    const [path, setPath] = useState("")
    const [star, setStar] = useState("")
    const [distance, setDistance] = useState("")
    const [district, setDistrict] = useState("")
    const [time, setTime] = useState("")
    const [description, setDescription] = useState("")
    const [trafficStart, setTrafficStart] = useState("")
    const [trafficEnd, setTrafficEnd] = useState("")
    const [title, setTitle] = useState("")
    const [place, setPlace] = useState("")

    const [isLoadingCreate, setIsLoadingCreate] = useState(false)
    const [showInvalidInput, setShowInvalidInput] = useState(false)

    const submit = async () => {
        if (!isValidFormInput()) return;

        const params = {
            image: image,
            marker: marker,
            xlabel: xlabel,
            ylabel: ylabel,
            path: path,
            star: star,
            distance: distance,
            district: district,
            time: time,
            description: description,
            trafficStart: trafficStart,
            trafficEnd: trafficEnd,
            title: title,
            place: place
        }

        console.log(params);

        // setIsLoadingCreate(true)

        // await API.register(params).then(([code, data, header]) => {
        //    if (code == '200'){
        //     const userData = JSON.parse(localStorage.getItem('userData'))
        //     const newUserData = [...userData, data]
        //     localStorage.setItem('userData', JSON.stringify(newUserData))
        //   }
        // })
        // setIsLoadingCreate(false)
    }

    const isValidFormInput = () => {
        console.log(district, place, title, star, distance, time, image, marker, xlabel, ylabel, path, description, trafficStart, trafficEnd);
        if (!(image && marker && xlabel && ylabel && path && star && distance && district && time && description && trafficStart && trafficEnd && title && place)) {
            setShowInvalidInput(true)
            return false
        }
        return true
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
            <ReactJsAlert
                status={showInvalidInput}
                type="error"
                title="Please enter all information!"
                Close={() => setShowInvalidInput(false)}
            />
            <div className="newTrail">
                <div className="sideBarContainer">
                    <Sidebar />
                </div>
                <div className="newTrailContainer">
                    <Navbar />
                    <div className="top">
                        <div className="goBackButton" onClick={() => { navigate(-1) }}>
                            <ArrowBackIosNewIcon />
                            <p className="goBackButtonText">Go Back</p>
                        </div>
                        <h1>Add New Trail</h1>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <img
                                src="https://i.pinimg.com/736x/5a/8c/3f/5a8c3feccecbc90c2ac53eef53d59c4a--logo-design-trail.jpg"
                                alt=""
                            />

                        </div>
                        <div className="right">
                            <div className="formInput">
                                <label>Territory</label>
                                <Dropdown options={Territories} onChange={(e) => setDistrict(e.value)} value={district} placeholder="Select a territory" />
                            </div>
                            <div className="formInput">
                                <label>District</label>
                                <input
                                    type="text"
                                    placeholder='District'
                                    value={place}
                                    onChange={(e) => { setPlace(e.target.value) }}
                                    className="sameHeight"
                                />
                            </div>
                            <div className="formInput">
                                <label>Trail Name</label>
                                <input
                                    type="text"
                                    placeholder='Trail Name'
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value) }}
            
                                />
                            </div>
                            <div className="formInput">
                                <label>Difficulty (1-5 stars)</label>
                                <input
                                    type="text"
                                    placeholder='Star(s)'
                                    value={star}
                                    onChange={(e) => { setStar(e.target.value) }}
                                />
                            </div>
                            <div className="formInput">
                                <label>Distance (km)</label>
                                <input
                                    type="text"
                                    placeholder='Distance'
                                    value={distance}
                                    onChange={(e) => { setDistance(e.target.value) }}
                                />
                            </div>
                            <div className="formInput">
                                <label>Time (hours)</label>
                                <input
                                    type="text"
                                    placeholder='Time'
                                    value={time}
                                    onChange={(e) => { setTime(e.target.value) }}
                                />
                            </div>
                            <div className="textAreaContainer">
                                <label>Image URLs</label>
                                <textarea
                                    value={image}
                                    onChange={(e) => { setImage(e.target.value) }}
                                    className="textArea"
                                />
                            </div>
                            <div className="textAreaContainer">
                                <label>Markers</label>
                                <textarea
                                    value={marker}
                                    onChange={(e) => { setMarker(e.target.value) }}
                                    className="textArea"
                                />
                            </div>
                            <div className="textAreaContainer">
                                <label>X Labels</label>
                                <textarea
                                    value={xlabel}
                                    onChange={(e) => { setXlabel(e.target.value) }}
                                    className="textArea"
                                />
                            </div>
                            <div className="textAreaContainer">
                                <label>Y Labels</label>
                                <textarea
                                    value={ylabel}
                                    onChange={(e) => { setYlabel(e.target.value) }}
                                    className="textArea"
                                />
                            </div>
                            <div className="textAreaContainer">
                                <label>Paths</label>
                                <textarea
                                    value={path}
                                    onChange={(e) => { setPath(e.target.value) }}
                                    className="textArea"
                                />
                            </div>
                            <div className="textAreaContainer">
                                <label>Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value) }}
                                    className="textArea"
                                />
                            </div>
                            <div className="textAreaContainer">
                                <label>Traffic info at starting point</label>
                                <textarea
                                    value={trafficStart}
                                    onChange={(e) => { setTrafficStart(e.target.value) }}
                                    className="textArea"
                                />
                            </div>
                            <div className="textAreaContainer">
                                <label>Traffic info at ending point</label>
                                <textarea
                                    value={trafficEnd}
                                    onChange={(e) => { setTrafficEnd(e.target.value) }}
                                    className="textArea"
                                />
                            </div>

                            {isLoadingCreate ?
                                <div className="loading">
                                    <ReactLoading type="spin" color="teal" />
                                </div>
                                :
                                <button onClick={() => { submit() }}>Create</button>
                            }
                        </div>
                    </div>
                </div>                                                                                  
            </div>
        </LoadingOverlay>
    )
}

export default NewTrail