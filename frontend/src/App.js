import axios from "axios";
import { useEffect, useState } from "react";
import validator from "validator";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import "./styles/App.css";

function App() {
  const [profilePic, setprofilePic] = useState("");
  // Displays the main component and the navbar
  function getUsername() {
    return sessionStorage.getItem("token");
  }

  function getProfilePicture() {
    if (getUsername()) {
      axios.get(`/getProfilePicture?username=${getUsername()}`).then((data) => {
        setprofilePic(data.data);
        console.log("Triggered");
      });
    }
  }
  useEffect(() => {
    getProfilePicture();
  }, []);
  return (
    <div className="App">
      <div className="Nav">
        <Navbar props={profilePic} />
      </div>
      <div className="Main">
        <Main getProfilePicture={getProfilePicture} />
      </div>
    </div>
  );
}

export default App;
