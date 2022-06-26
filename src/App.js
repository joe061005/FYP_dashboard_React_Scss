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
import {UserContext} from "./context/UserContext"

function App() {

  const {dark} = useContext(UserContext)

  return (
    <div className={dark? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path = "home" element={<Home />}/>
            <Route path="users">
              <Route index element={<List />}/>
              <Route path="addUser" element={<New />}/>
            </Route>
            <Route path="trails">
              <Route index element={<Trail />}/>
              <Route path="addTrail" element={<New />}/>
            </Route>
            <Route path="trailInfo">
              <Route index element={<TrailInfo />}/>
            </Route>
            <Route path="forms">
              <Route index element={<Form/>}/>
            </Route>
            <Route path="groups">
              <Route index element={<Group />}/>
            </Route>
            <Route path="locations">
              <Route index element={<Location />}/>
            </Route>
            <Route path="sessions">
              <Route index element={<Session />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
