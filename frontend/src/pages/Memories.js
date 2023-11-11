import axios from "axios";
import { React, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import drawings from "../drawingData";
import "../styles/Memories.css";
function Memories(props) {
  const [ID, setID] = useState(0);
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState({ code: "", message: "" });
  const [profileErrors, setprofileErrors] = useState("");

  const onDateChange = (newDate) => {
    let formattedDate = newDate;

    const day = formattedDate.getDate();
    let month = formattedDate.getMonth() + 1;
    month = month.toString().padStart(2, "0");
    const year = formattedDate.getFullYear();

    formattedDate = year + "-" + month + "-" + day;

    const found = data.find((x) => x.date === formattedDate);

    if (found) {
      setID(data.indexOf(found));
      console.log("found");
    }
    setDate(newDate);
  };
  // const findrecentDate = () => {
  //   const recent = data
  //     .map((obj) => new Date(obj.date))
  //     .reduce((prev, curr) => (curr > prev ? curr : prev), 0);

  //   return recent;
  // };

  function sortByDate(data) {
    let sortedMems = data.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return sortedMems;
  }

  const getData = () => {
    axios
      .get(`/api/user_memories/?username=${getUsername()}`)
      .then((data) => {
        const sortedData = sortByDate(data.data);
        setData(sortedData);
        setID(sortedData.length - 1);
        setLoaded(true);
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
    props.getProfilePicture();
    // let sorted = sortByDate(data);
    // setSortedData(sorted);

    // setDate(findrecentDate());
  }, []);

  const downloadImage = async (imgURL) => {
    var a = document.createElement("a"); //Create <a>
    a.href = imgURL; //Image Base64 Goes here
    a.download =
      date.getFullYear() +
      "-" +
      date.getMonth() +
      "-" +
      date.getDate() +
      ".png"; //File name Here
    a.click(); //Downloaded file
  };
  const convertDates = () => {
    let count = 0;
    const highlightedDates = [];
    data.map((drawing, id) => {
      highlightedDates[count] = convertDateStringtoObj(drawing.date);
      count += 1;
    });
    return highlightedDates;
  };
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      // Check if the date is in the array of highlighted dates
      if (
        highlightedDates.some(
          (d) =>
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear()
        )
      ) {
        // If the date is in the array of highlighted dates, return a div with a class name
        return "highlight";
      } else {
        return null;
      }
    }
  };

  const convertDateStringtoObj = (dateStr) => {
    let newDate = new Date(dateStr);
    return newDate;
  };

  const handleLeftClick = () => {
    setID((prevID) => {
      const newID = prevID === 0 ? data.length - 1 : prevID - 1;
      setDate(convertDateStringtoObj(data[newID].date));
      return newID;
    });
  };
  const handleRightClick = () => {
    setID((prevID) => {
      const newID = (prevID + 1) % data.length;
      setDate(convertDateStringtoObj(data[newID].date));
      return newID;
    });
  };
  const isDateAllowed = (date) => {
    return highlightedDates.some(
      (allowedDate) =>
        allowedDate.getDate() === date.getDate() &&
        allowedDate.getMonth() === date.getMonth() &&
        allowedDate.getFullYear() === date.getFullYear()
    );
  };
  const setProfileButton = (ID) => {
    axios
      .get("/updateProfilePicture", {
        params: { username: getUsername(), id: ID },
      })
      .then((data) => {
        setprofileErrors(data.data);
        props.getProfilePicture();
        // this.forceUpdate();
      })
      .catch(function (error) {
        setprofileErrors("Error changing profile picture, please try again");
      });

    window.location.reload(true);
  };

  const getUsername = () => {
    return sessionStorage.getItem("token");
  };
  const highlightedDates = convertDates();

  console.log("Sorted: ");
  console.log(data);
  console.log(ID);

  if (errors.code !== "")
    return (
      <div className="m-errors">
        Error code: {errors.code}
        <br />
        Message: {errors.message}
      </div>
    );

  if (!loaded) return <div className="m-errors">Loading...</div>;

  // if (data === null) return <p>Server error</p>;
  return (
    <div className="m-memories">
      <div className="m-title">Memories Page!</div>
      <div className="calanderDrawing">
        <div className="side-menu">
          <Calendar
            onChange={onDateChange}
            value={date}
            tileClassName={tileContent}
            showWeekDays={false}
            className="cal"
          />
          {/* <div className="date">Date selected is: {date}</div> */}

          <div className="twoButtons">
            <div className="downloadButton">
              <Button onClick={() => downloadImage(data[ID].drawing)}>
                Download Drawing
              </Button>
            </div>
            <div className="setProfileButton">
              <Button onClick={() => setProfileButton(data[ID].id)}>
                Set Drawing as Profile Picture
              </Button>
              <div className="profile-message">{profileErrors}</div>
            </div>
          </div>
        </div>
        {data.length !== 0 ? (
          <>
            <div className="drawingContainer">
              <button onClick={() => handleLeftClick()} className="arrow">
                <HiArrowCircleLeft
                  aria-label="Left Arrow"
                  size={45}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleLeftClick();
                    }
                  }}
                />
              </button>

              <div className="m-drawing">
                <img src={data[ID]?.drawing} alt={"drawing image"} />
              </div>
              <button onClick={() => handleRightClick()} className="arrow">
                <HiArrowCircleRight
                  aria-label="Right Arrow"
                  size={45}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleRightClick();
                    }
                  }}
                />
              </button>
            </div>
            <div className="currentDate">{date.toDateString()}</div>{" "}
          </>
        ) : (
          <p>No memories yet, submit a drawing first!</p>
        )}
      </div>

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

export default Memories;
