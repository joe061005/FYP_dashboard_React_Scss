import React, {useState} from 'react'

export const UserContext = React.createContext();

export const UserContextProvider = ({children}) => {

  const [isLogout, setIsLogout] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [dark, setDark] = useState(false)
  // const [userName, setUserName] = useState('')

  return (
    <UserContext.Provider value={{isLogout, setIsLogout, showAlert, setShowAlert, dark, setDark}}>
        {children}
    </UserContext.Provider>
  )
}
