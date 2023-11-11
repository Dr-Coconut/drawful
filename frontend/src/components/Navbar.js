import axios from "axios";
import { React, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  AiOutlineBell,
  AiOutlineCalendar,
  AiOutlineHome,
} from "react-icons/ai";
import { BsAward, BsPeople, BsVectorPen } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import memories from "../pages/Memories";

import logo from "../navbarLogo.png";
import "../styles/Navbar.css";
function Navbar(props) {
  const navigate = useNavigate();

  const getUsername = () => {
    return sessionStorage.getItem("token");
  };
  function signOut() {
    sessionStorage.removeItem("token");
    console.log("Signed out");
    navigate("/login");
  }

  return (
    <div className="Navbar">
      <div className="logo">
        <Link to="/" aria-label="Link to home">
          <img src={logo} alt="drawful logo" />
        </Link>
      </div>
      <div className="links">
        <div className="home">
          <Link to="/">
            <AiOutlineHome size={30} />
            <div>Home</div>
          </Link>
        </div>
        <div className="ViewDraws">
          <Link to="/feed">
            <BsVectorPen size={30} />
            <div>Today's Drawings</div>
          </Link>
        </div>
        <div className="settings">
          <Link to="/settings">
            <FiSettings size={30} />
            <div>Settings</div>
          </Link>
        </div>
        <div className="friends">
          <Link to="/friends">
            <BsPeople size={30} />
            <div>Friends</div>
          </Link>
        </div>
        <div className="memories" style={{}}>
          <Link to="/memories">
            <AiOutlineCalendar size={30} />
            <div>Memories</div>
          </Link>
        </div>
        {/* <div className="notifications">
          <Link to="/notifications">
            <AiOutlineBell
              style={
                {
                  // height: "2.7vh",
                  // width: "2.7vh",
                  // position: "relative",
                  // top: "30%",
                }
              }
              size={30}
            />
            <div>Notifications</div>
          </Link>
        </div> */}
        {
          <div className="badges">
            <Link to="/badges">
              <BsAward
                style={{
                  height: "2.7vh",
                  width: "2.7vh",
                  position: "relative",
                  top: "30%",
                }}
                size={30}
              />
              <div>Badges</div>
            </Link>
          </div>
        }
      </div>
      {sessionStorage.getItem("token") && (
        <>
          <div className="profile">
            <Link to="/settings" aria-label="Profile Picture, Link to settings">
              <img src={props.props} className="profilePic" />
            </Link>
            <div className="username-signout">
              <div className="userName">@{getUsername()}</div>
              <Button className="sign-out" onClick={() => signOut()}>
                Sign out
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
