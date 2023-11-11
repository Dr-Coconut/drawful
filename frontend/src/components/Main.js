import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Badges from "../pages/Badges";
import Comments from "../pages/Comments";
import DifficultyPage from "../pages/DifficultyPage";
import Drawing from "../pages/Drawing";
import Friends from "../pages/Friends";
import FriendsMemories from "../pages/FriendsMemories";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Memories from "../pages/Memories";
import Notifications from "../pages/Notifications";
import PrivateRoute from "../pages/PrivateRoute";
import Settings from "../pages/Settings";
import Accessibility from "../pages/Settings/Accessibility";
import SignUp from "../pages/SignUp";
import TodaysDrawings from "../pages/TodaysDrawings";

function Main(props) {
  const AuthContext = React.createContext(null);
  const [error, setError] = useState("");
  const naviagate = useNavigate();

  useEffect(() => {
    const isLightMode = localStorage.getItem("isLightMode") === "true";
    const isContrast = localStorage.getItem("isContrast") === "true";
    const isFont = localStorage.getItem("isFont") === "true";
    //const isPog = localStorage.getItem("isPog") === "true";
    const isLarge = localStorage.getItem("isLarge") === "true";

    if (isLightMode) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }

    if (isContrast) {
      document.body.classList.add("contrast");
    } else {
      document.body.classList.remove("contrast");
    }

    if (isFont) {
      document.body.classList.add("font");
    } else {
      document.body.classList.remove("font");
    }

    /*if (isPog) {
      document.body.classList.add("pog");
    } else {
      document.body.classList.remove("pog");
    }*/

    if (isLarge) {
      document.body.classList.add("large");
    } else {
      document.body.classList.remove("large");
    }
  }, []);

  return (
    <Routes>
      <Route
        path="*"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/feed"
        element={
          <PrivateRoute>
            <TodaysDrawings />
          </PrivateRoute>
        }
      ></Route>
      <Route
        exact
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      ></Route>

      <Route
        path="/friends"
        element={
          <PrivateRoute>
            <Friends />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/memories"
        element={
          <PrivateRoute>
            <Memories getProfilePicture={props.getProfilePicture} />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/notifications" element={<Notifications />}></Route>
      <Route
        path="/badges"
        element={
          <PrivateRoute>
            <Badges />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/drawing"
        element={
          <PrivateRoute>
            <Drawing />
          </PrivateRoute>
        }
      ></Route>
      {/* <Route path="/difficulty" element={<DifficultyPage />}></Route> */}
      <Route
        path="/comments/:ID"
        element={
          <PrivateRoute>
            <Comments />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/friends/memories/:username"
        element={
          <PrivateRoute>
            <FriendsMemories />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
    </Routes>
  );
}

export default Main;
