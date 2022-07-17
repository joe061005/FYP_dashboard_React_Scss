import Home from "./pages/home/Home";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New"
import Trail from './pages/Trail/Trail'
import TrailInfo from './pages/trail Info/TrailInfo'
import Form from './pages/form/Form'
import Group from './pages/group/Group'
import Location from './pages/location/Location'
import Session from './pages/session/Session'
import "./style/dark.scss"
import { useContext, useState } from "react";
import { UserContext } from "./context/UserContext"
import SessionDetail from "./pages/session/SessionDetail"
import LocationDetail from "./pages/location/LocationDetail"
import GroupDetail from "./pages/group/GroupDetail"
import FormDetail from "./pages/form/FormDetail"
import TrailInfoDetail from "./pages/trail Info/TrailInfoDetail";
import TrailDetail from './pages/Trail/TrailDetail'
import UserDetail from './pages/list/userDetail'


function App() {

  const { dark } = useContext(UserContext)

  return (
    <div className={dark ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path="addUser" element={<New />} />
              <Route path="userDetail" element={<UserDetail />}/>
            </Route>
            <Route path="trails">
              <Route index element={<Trail />} />
              <Route path="trailDetail" element={<TrailDetail />} />
            </Route>
            <Route path="trailInfo">
              <Route index element={<TrailInfo />} />
              <Route path="infoDetail" element={<TrailInfoDetail />} />
            </Route>
            <Route path="forms">
              <Route index element={<Form />} />
              <Route path="formDetail" element={<FormDetail />} />
            </Route>
            <Route path="groups">
              <Route index element={<Group />} />
              <Route path="groupDetail" element={<GroupDetail />} />
            </Route>
            <Route path="locations">
              <Route index element={<Location />} />
              <Route path="locationDetail" element={<LocationDetail />} />
            </Route>
            <Route path="sessions">
              <Route index element={<Session />} />
              <Route path="sessionDetail" element={<SessionDetail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
