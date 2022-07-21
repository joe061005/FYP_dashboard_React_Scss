import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import { UserContext } from '../../context/UserContext';
import './new.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReactLoading from 'react-loading';
import API from "../../Api/Api"
LoadingOverlay.propTypes = undefined


const New = () => {

  const navigate = useNavigate();

  const { setShowAlert, isLogout, showAlert } = useContext(UserContext)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)

  const [showInvalidInput, setShowInvalidInput] = useState(false)
  const [showInvalidPassoword, setShowInvalidPassoword] = useState(false)
  const [showInvalidEmail, setShowInvalidEmail] = useState(false)
  const [showAccountExist, setShowAccountExist] = useState(false)
  const [showCreated, setShowCreated] = useState(false)

  const register = async () => {
    if (!isValidRegisterInput()) return;

    const params = {
      username: username,
      password: password,
      email: email
    }

    setIsLoadingCreate(true)

    await API.register(params).then(([code, data, header]) => {
      if(code == '409'){
        setShowAccountExist(true)
      }else if (code == '200'){
        const userData = JSON.parse(localStorage.getItem('userData'))
        const newUserData = [...userData, data]
        localStorage.setItem('userData', JSON.stringify(newUserData))
        setShowCreated(true)
      }
    })
    setIsLoadingCreate(false)
  }

  const isValidRegisterInput = () => {
    if (!(username && password && confirmPassword && email)) {
      setShowInvalidInput(true)
      return false
    } else if (password != confirmPassword) {
      setShowInvalidPassoword(true)
      return false
    } else {
      let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
      if (!emailRegex.test(email)) {
        setShowInvalidEmail(true)
        return false
      }
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
      <ReactJsAlert
        status={showInvalidPassoword}
        type="error"
        title="Please check the password and confirm password!"
        Close={() => setShowInvalidPassoword(false)}
      />
      <ReactJsAlert
        status={showInvalidEmail}
        type="error"
        title="Please enter a valid email!"
        Close={() => setShowInvalidEmail(false)}
      />
      <ReactJsAlert
        status={showAccountExist}
        type="error"
        title="username or email exists!"
        Close={() => setShowAccountExist(false)}
      />
      <ReactJsAlert
        status={showCreated}
        type="success"
        title="Please check your email and activate your account!"
        Close={() => {setShowCreated(false); navigate(-1)}}
      />
      <div className="new">
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
            <h1>Add New User</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                alt=""
              />

            </div>
            <div className="right">
              <div className="formInput">
                <label>Username</label>
                <input
                  type="text"
                  placeholder='username'
                  value={username}
                  onChange={(e) => { setUsername(e.target.value) }}
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  type="email"
                  placeholder='your email'
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <div className="passwordInputContainer">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder='your password'
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    className="passwordInput"
                  />
                  {showPassword ? <VisibilityOffIcon className='visibilityIcon' onClick={() => { setShowPassword((prev) => !prev) }} />
                    :
                    <VisibilityIcon className='visibilityIcon' onClick={() => { setShowPassword((prev) => !prev) }} />
                  }
                </div>
              </div>
              <div className="formInput">
                <label>Confirm Password</label>
                <div className="passwordInputContainer">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='confirm password'
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                    className="passwordInput"
                  />
                  {showConfirmPassword ? <VisibilityOffIcon className='visibilityIcon' onClick={() => { setShowConfirmPassword((prev) => !prev) }} />
                    :
                    <VisibilityIcon className='visibilityIcon' onClick={() => { setShowConfirmPassword((prev) => !prev) }} />
                  }
                </div>
              </div>
              {isLoadingCreate ?
                <div className="loading">
                  <ReactLoading type="spin" color="teal" />
                </div>
                :
                <button onClick={() => { register() }}>Create</button>
              }
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  )
}

export default New