import React, { useState, createContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.scss'
import { useLocation } from 'react-router-dom'
import LoadingOverlay from 'react-loading-overlay';
import ReactJsAlert from "reactjs-alert"
import Widget from '../../components/widget/Widget'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import TableUI from '../../components/Table/TableUI'

export const UserContext = createContext()

const Home = () => {
  const location = useLocation();

  const [isLogout, setIsLogout] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
 
  return (
    <UserContext.Provider value={{ setIsLogout, setShowAlert }}>
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
        <div className='home'>
          <Sidebar />
          <div className="homeContainer">
            <Navbar user={location.state.user} />
            <div className="widgets">
              <Widget type = "user"/>
              <Widget type = "trailInfo"/>
              <Widget type = "form"/>
              <Widget type = "hikingGroups"/>
            </div>
            <div className="charts">
              <Featured />
              <Chart />
            </div>
            <div className="listContainer">
              <div className="listTitle">Latest Tx</div>
              <TableUI />
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </UserContext.Provider >
  )
}

export default Home;