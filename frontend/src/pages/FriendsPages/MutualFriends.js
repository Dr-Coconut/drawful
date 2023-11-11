import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import drawings from "../../drawingData.js";
import "../../styles/Friends/MutualFriends.css";
import { VscCircleFilled } from "react-icons/vsc";
import axios from "axios";
import validator from "validator";
import { BsPersonSquare, BsFillTaxiFrontFill} from "react-icons/bs"

//import drawings from "../../drawingData";

function Mutualusers() {

  const [selected, setSelected] = useState("");
  var selec2ded = "";
  
  const handleSelectionClick = (fProfile) => {
    setSelected(fProfile);
  };

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = validator.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  function getUsername() {
    return getCookie('username');
  }


  //#########################################################################
  
  const allUsernames = [];
  const users = [];
  const finalIdea = []

  var skipSelf = false;

  var running2 = false;
  var running = false;
  var running3 = false;

  function alterations(val){
    selec2ded = val;
    console.log(selec2ded);
    var data2 = friendProfileDisplay();
    document.getElementById("loaduserprofile").innerHTML = data2;
    var awwFriends =document.getElementById("befriend");
    awwFriends.onclick=function(){addfriend(selec2ded)}
  }

  function setusers(name) {
    finalIdea.push(name)
  }







  function addfriend(name){


    var names = [];
    axios.get("/getFriendsNames", { params: { username: getUsername() } }).then((data) => { //Gets the users friends list
      //console.log("Length is: " + (data?.data.users[0].friends).length);
      for (var i = 0; i < (data?.data.users[0].friends).length; i++) {
        names.push(data?.data.users[0].friends[i]);
        console.log("ANME IS: " + names[i]);
      }})
    var line ="{";



    for (var i = 0; i< names.length;i++){
      line =line+names[i]+","
      console.log("XDCFGYBHUJI: " + names[i]);
    }
    line = line + name;
    line = line +"}";
    axios.get("/updateFriends", { params: { username: getCookie("username"),friends: line  } }).then((data) => { //gets the friends entry in User_Accounts
      console.log(data);
      if (data != "false"){   
        window.location.replace(window.location.href);
      }
    })
  }









  var isReady = false;

  useEffect(() => {
    if (isReady === false) {
      isReady = true;
      axios.get("/api/user_accounts/").then((data) => { //Gets all users
        for (var i = 0; i < (data?.data).length; i++) {
          allUsernames.push(data?.data[i].username);
        }
        console.log("JOJO - HERE -> ALLUSERNAMES[0]: " + allUsernames[0]);

        for (var j = 0; j < allUsernames.length; j++) {
          axios.get("/getUserEntry", { params: { username: allUsernames[j] } }).then((data) => { //gets the users entry in User_Accounts
            users.push(data?.data.singleFriend[0]);
            console.log("Running this code is: " + users[0].username);
            console.log("AAAAND is... " + users.length);

            console.log(users.length, allUsernames.length);
            if (users.length == allUsernames.length) {
              //console.log("YEET")
              var data = usersListDisplay();
              //console.log("yeet: " + data);

              
              if (running2 === false) {
                running2 = true;
                document.getElementById("loaduserlist").innerHTML = data;
                for (var i = 0; i < allUsernames.length; i++) {
                  var but = document.getElementById(allUsernames[i]);
                  but.onclick= function(){alterations(this.id)};
                }
              }


              var data2 = friendProfileDisplay();
              console.log("TOMISalterations");
              console.log("feat: " + data2);
              if (running3 === false) {
                running3 = true;
                document.getElementById("loaduserprofile").innerHTML = data2;
                var awwFriends =document.getElementById("befriend");
                awwFriends.onclick=function(){addfriend(selec2ded)}
              }
            }
            console.log("selec2ded is:" + selec2ded);
            console.log("updated");
          });
        }
        console.log("SDVTEYHUIJXITY");
      });
    }
    //for (var z=0; z<storeallUsernames.length; z++;){

    //console.log("SPRINTING");
    //}
  }, [getUsername()])


  function usersListDisplay() {
    if (running == false) {
      running = true;
      console.log(" Top of list display Len is... " + users.length);
      console.log("The list has ");
      if (users.length < 1) {
        var boi = "TmIsalterations";
        console.log("boi" + boi);
        return '<button class="User-preview"> <BsPersonSquare class="Friend-picture" /><Col> <div class="Friend-username">Username</div> </Col> </button>';
      } else {
        return loadList();
      }
    }
  }




  function loadList() {
    
    var TOMISalterations = "";
    for (var i = 0; i < users.length; i++) {
      if (users[i].username != getUsername()){
      TOMISalterations = TOMISalterations + '<button class="User-preview" id='+users[i].username+'> <img class="Friend-picture" src=' + users[i].profilePicture + ' alt="test image" /><Col><div class="Friend-username">' + users[i].username + '</div></Col></button>';
     } else{
      TOMISalterations = TOMISalterations;
     }
    }
    return TOMISalterations;
  }

  function friendProfileDisplay() {
    if (users.length < 1 || selec2ded === "") {
      return '<div><div class="Profile-details"><img class="Profile-picture"/><div class="Profile-bio-container"><div class="Profile-bio">This is where my bio would be if I were a user!!</div></div><div class="Profile-stat-bar">Badges Unlocked:  0</div><div class="Profile-stat-bar">Highest Streak: 0</div><div class="Profile-stat-bar">Average Rating:0</div><div class="Profile-stat-bar">Total Stars Earned: 0</div><button class="Profile-befriend-button">Befriend</button><button class="Profile-unfriend-mf-button" disabled={true}>Unfriend</button><div class="Profile-username">Example Account</div></div></div>'
    } else {
      return loadProf();
    }
  }



  function loadProf(){
    var loadded = selec2ded;
    for (var j = 0; j < users.length; j++) {
      if (loadded === users[j].username){
        console.log("Loadded prints...: " + users[j].username);
        //console.log("Laod List: " + users[0].profilePicture);
        var profile = '<div><div class="Profile-details"><img class="Profile-picture" src= ' + users[j].profilePicture + ' alt={"pfp image"} /><div class="Profile-bio-container"><div class="Profile-bio">'+ users[j].bio + '</div></div><div class="Profile-stat-bar">Badges Unlocked:  ' + users[j].badgesEarned + '</div><div class="Profile-stat-bar">Highest Streak: ' + users[j].maxStreak + '</div><div class="Profile-stat-bar">Average Rating:' + users[j].averageRating + '</div><div class="Profile-stat-bar">Total Stars Earned: ' + users[j].totalStars + '</div><button class="Profile-befriend-button" id="befriend">Befriend</button><button class="Profile-unfriend-mf-button">Unfriend</button><div class="Profile-username">' + users[j].username + '</div></div></div>'
      }
    }
    return profile;
  }


  return (
    <div className="Profiles-container">
      <Col className="Friend-m-side">
        <div className="Mutual-title">Find users</div>
          
          <div className="Friends-list" id="loaduserlist">
            {/*displayAllUsers()*/}
          </div>
      </Col>


      <Col className="Profile-side">
        <div className="Details-to-fill" id= "loaduserprofile">
          {/*displayUserProfile()*/}
        </div>
      </Col>

    </div>
  );
}
        
export default Mutualusers;