import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import drawings from "../../drawingData.js";
import "../../styles/Friends/FriendRequests.css";
import { BsPersonSquare, BsFillTaxiFrontFill } from "react-icons/bs";
import { VscCircleFilled } from "react-icons/vsc";

function FriendRequests() {
  
  //return (
    //<div className="Profiles-container">
        //<div className="search-bar">
            //<input type="text" placeholder="   Search" />
        //</div>
    //</div>
  //);
  const [selected, setSelected] = useState(0);
  const [friendsAdded, setFriendsAdded] = useState([]);
  
  const handleSelectionClick = (fProfile) => {
    setSelected(fProfile);
  };
  /*return (
    <div className="Profiles-container">
      <Col className="Friend-r-side">
        <div className="Requests-title">Friend Requests</div>
        
        <div className="Friends-r-list">
          {drawings.map((post, id) => {
            return (
              <button className="User-r-preview"  id={id} onClick={() => handleSelectionClick(post.id)}>
                <img className="Friend-r-picture"  id={id} src={post.drawing} alt={"drawing image"} />
                <VscCircleFilled className="Friend-r-status"/>
                <Col>
                  <div className="Friend-r-username">
                    {post.username}
                  </div>
                  <div className="Mutual-m-friends">
                      {post.mutualFriends} Mutual friends
                  </div>
                </Col>
              </button>
            )})}
        </div>
      </Col>
    </div>
  )*/


  function friendProfileDisplay() {
    if (friendsAdded.length < 2){
      return (
        <div>
          <div className="Profile-details">
            <Row>
              <Col>
                <img className="Profile-picture" alt={"pfp image"} />
              </Col>

              <Col>
                <div className="Profile-bio-container">
                  <div className="Profile-bio">
                    This is where my bio would be if I were your friend!
                  </div>
                </div>
              </Col>
            </Row>


            <Row>
              <Col>
                <div className="Profile-username">
                  Username
                </div>
              </Col>

              <Col>
                <div className="Profile-section-header1">
                  Favourite Draw
                </div>
              </Col>
            </Row>


            <Row>
              <Col>
                <div className="Profile-stat-bar">
                  Highest Streak: 0
                </div>
                <div className="Profile-stat-bar">
                  Average Rating: 0
                </div>
                <div className="Profile-stat-bar">
                  Total Stars Earned: 0
                </div>
                <div className="Profile-stat-bar">
                  Badges Unlocked: 0
                </div>
              </Col>

              <Col>
                <img className="Profile-fav-draw" alt={"fav draw image"} />
              </Col>
            </Row>


            <Row>
              <Col>
                <button className="Profile-unfriend-button-default" disabled={true}>
                  Unfriend
                </button>
              </Col>

              <Col>
                  <button className="Profile-view-memories-default" disabled={true}>
                    Memories
                  </button>
              </Col>
            </Row>


            <Row>
              <Col>
                <div className="Profile-section-header2">
                  Badges
                </div>
              </Col>
            </Row>


            <Row>
              <Col>
                <div className="Profile-badges-container">
                
                </div>
              </Col>
            </Row>


          </div>
        </div>
      )
    }
  }



  return (
    <div className="Profiles-container">
      <Col className="Friend-r-side">
        <div className="Requests-title">Friend Requests</div>
        <div className="Friends-r-list">
        </div>
      </Col>


      <Col className="Profile-side">
        <div className="Details-to-fill">
          {friendProfileDisplay()}
        </div>
      </Col>

    </div>
  );
}
export default FriendRequests;