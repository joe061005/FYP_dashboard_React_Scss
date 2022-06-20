import React, { useState } from 'react'
import './login.scss'
import logo from '../../asset/logo.png'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import API from "../../Api/Api.js"
import ReactJsAlert from "reactjs-alert"
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showEmptyAlert, setShowEmptyAlert] = useState(false)
  const [showIncorrectAlert, setShowIncorrectAlert] = useState(false)
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)

  const isValidLoginInput = () => {
    return (username && password)
  }

  const login = async () => {
    if (!isValidLoginInput()) {
      setShowEmptyAlert(true)
      return
    }

    setIsLoadingLogin(true)


    const params = {
      username: username,
      password: password
    }

    console.log(params)

    API.login(params).then(([code, data, header]) => {
      if (code == '401') {
        setIsLoadingLogin(false)
        setShowIncorrectAlert(true)
      } else if (code == '400') {
        setIsLoadingLogin(false)
        setShowIncorrectAlert(true)
      } else {
        navigate("/home", {state: {user: data}, replace: true})
      }
    })
    

  }

  return (
    <div className="loginBackground">
      <ReactJsAlert
        status={showEmptyAlert}
        type="error"
        title="Please enter username and password!"
        Close={() => setShowEmptyAlert(false)}
      />
       <ReactJsAlert
        status={showIncorrectAlert}
        type="error"
        title="Invalid username or password!"
        Close={() => setShowIncorrectAlert(false)}
      />
      <img
        src={logo}
        alt=""
        className='logo'
      />
      <div className="loginFormContainer">
        <div className="formContainer">
          <div className="title">
            <p className="titleText">
              Login
            </p>
          </div>
          <div className="input">
            <p>Username</p>
            <div className="inputField">
              <div className="iconContainer">
                <PersonIcon className='icon' />
              </div>
              <div className="inputContainer">
                <input
                  className='userName'
                  type='text'
                  value={username}
                  onChange={(e) => { setUsername(e.target.value) }}
                  placeholder='Username'
                />
              </div>
            </div>
          </div>
          <div className="input">
            <p>Password</p>
            <div className="inputField">
              <div className="iconContainer">
                <LockIcon className='icon' />
              </div>
              <div className="inputContainer">
                <input
                  className='passowrd'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                  placeholder='Password'
                />
                {showPassword ? <VisibilityOffIcon className='visibilityIcon' onClick={() => { setShowPassword((prev) => !prev) }} />
                  :
                  <VisibilityIcon className='visibilityIcon' onClick={() => { setShowPassword((prev) => !prev) }} />
                }
              </div>
            </div>
          </div>
          <div className="loginButton">
            {isLoadingLogin ?
              <ReactLoading type = "spin" color = "#82f0ff"/>
              :
              <button className="btn" onClick={() => { login() }}>
                Login
              </button>
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login