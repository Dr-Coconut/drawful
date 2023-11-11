import Rating from "@mui/material/Rating";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import "../Fonts/Sometimes.otf";

import { Star } from "@mui/icons-material";
import "../styles/TodaysDrawings.css";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
            {/* <AiOutlineStar size={25} className="star" /> */}
          </button>
        );
      })}
    </div>
  );
};

// Ctrl + k to comment out region
function TodaysDrawings() {
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);
  const top = {
    // Other styles
    display: "flex",
    flexDirection: "row",
  };

  function convertTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
  // stars fill states
  const [filled, setFilled] = useState([false, false, false, false, false]);

  // fills in star when clicked and all previous stars
  const handleClick = (index, id) => {
    console.log(filled);
    const newFilled = [...filled];
    newFilled[id] = newFilled[id].map((value, i) => {
      if (i <= index) {
        return true;
      } else {
        return false;
      }
    });
    setFilled(newFilled);
  };
  const getData = () => {
    let today = new Date();
    const day = today.getDate();
    let month = today.getMonth() + 1;
    month = month.toString().padStart(2, "0");
    const year = today.getFullYear();
    let formattedDate = year + "-" + month + "-" + day;

    axios
      .get("/api/user_memories/?date=" + formattedDate)
      .then((data) => {
        setPosts(data.data);

        setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          setErrors({
            code: error.response.status,
            message: error.response.data,
          });
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(posts);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h2 className="Title">Today's Drawings</h2>

      {posts.map((post, id) => {
        return (
          <>
            <div className="p-container">
              <div className="post">
                <div className="top-bar">
                  <div className="UserName">
                    @{post.username} {" - "}{" "}
                    {new Date(post.date).toDateString()} -{" "}
                    {convertTime(post.timeCompleted).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </div>

                  <div className="PromptName">
                    Today's Prompt: {post.prompt}
                  </div>
                </div>
                <div className="userDrawing">
                  <img src={post.drawing} alt={"drawing image"} />
                </div>

                <div className="bottom-bar">
                  <div className="Stats">
                    Time Taken:{" "}
                    {post.timeTaken
                      .split(":")
                      .reduce((acc, time) => 60 * acc + +time)}{" "}
                    seconds
                    <div className="StarBarAvg">
                      Current rating:
                      <Rating
                        className="StarRating"
                        value={1}
                        readOnly
                        precision={0.1}
                      />
                      Rate the drawing?
                      <StarRating />{" "}
                      <Button className="SubmitButton">Submit Rating</Button>
                    </div>
                  </div>
                  {/* <div className="Stats">Time taken: {post.timeTaken}</div> */}
                </div>

                <div className="Ratings">
                  {/* <div className="StarBar">
                    {console.log(id)}
                    {[...Array(5)].map((index) => (
                      <Button
                        key={index}
                        // sets class name to each uniquely
                        className={`Star${index + 1} Stars`}
                        onClick={() => handleClick(index, id)}
                      >
                        {filled[id][index] ? (
                          <AiFillStar size={25} />
                        ) : (
                          <AiOutlineStar size={25} />
                        )}
                      </Button>
                    ))}
                  </div> */}
                </div>
              </div>
              {/* <div className="CommentsBox">
                <div className="CommentHeading">Comments</div>
                <div className="Comment"></div>
              </div> */}
            </div>
          </>
        );
      })}
      <div className="disclaimer1">
        "Alpha Project Disclaimer This server is provided by the School of
        Computer Science at the University of Birmingham to allow users to
        provide feedback on software developed by students as part of an
        assignment. While we take reasonable precautions, we cannot guarantee
        the security of the data entered into the system. Do NOT enter any real
        personal data (e.g., financial information or otherwise) into the
        system. The assignment runs until May 31st 2023, at which time the
        server and all associated data will be destroyed."
      </div>
    </div>
  );
}

export default TodaysDrawings;
