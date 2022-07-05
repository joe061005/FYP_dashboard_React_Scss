import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import './form.scss'
import ReactLoading from 'react-loading';
import { useNavigationType } from 'react-router-dom'
import API from '../../Api/Api'
import FormDT from '../../components/FormDT/FormDT';

const Form = () => {

    const navigationType = useNavigationType();

    const { setShowAlert, isLogout, showAlert } = useContext(UserContext)

    const [formData, setFormData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getFormData = async () => {
        await API.getAllForm().then(([code, data, header]) => {
            if (code == '401' || code == '500') {
                console.log(data)
            } else if (code == '200') {
                setFormData(data)
                localStorage.setItem('formData', JSON.stringify(data))
                setIsLoading(false)
            }
        })

    }

    useEffect(() => {
        console.log(navigationType)
        if (navigationType != "POP") {
            getFormData()
        } else {
            setFormData(JSON.parse(localStorage.getItem('formData')))
            setIsLoading(false)
        }
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
            <div className="form">
                <div className="sideBarContainer">
                    <Sidebar />
                </div>
                <div className="formContainer">
                    <Navbar />
                    {isLoading ?
                        <div className="loading">
                            <ReactLoading type="spin" color="#6439ff" />
                        </div>
                        :
                        <FormDT data={formData} />
                    }
                </div>
            </div>
        </LoadingOverlay>
    )
}

export default Form