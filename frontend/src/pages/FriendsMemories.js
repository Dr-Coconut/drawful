import React from "react";
import { Button, Placeholder } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GridLayout, Responsive, WidthProvider } from "react-grid-layout";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { BsFillHouseFill } from "react-icons/bs";
import "../styles/FriendsMemories.css";

//Modal.setAppElement('#FriendsMemories');

function FriendsMemories() {
  const {username} = useParams();
  //const post = drawings[ID] 
  //These are how I carried the user selected between pages in comments 
  //I left them for reference if you wish to do them similarly

  //Leaving this here as an example, working, POST request!
  /*const [prompt, setPrompt] = useState({
    id: 0,
    prompt: "",
    promptGenre: "",
    alreadyUsed: false,
    previousWinner: "",
  });

  const handleChange1 = (e) => {
    e.preventDefault();

    setPrompt({
      id: parseInt(e.target.value),
      prompt: prompt.prompt,
      promptGenre: prompt.promptGenre,
      alreadyUsed: false,
      previousWinner: "",
    });
  };

  const handleChange2 = (e) => {
    e.preventDefault();

    setPrompt({
      id: prompt.id,
      prompt: e.target.value,
      promptGenre: prompt.promptGenre,
      alreadyUsed: false,
      previousWinner: "",
    });
  };

  const handleChange3 = (e) => {
    e.preventDefault();

    setPrompt({
      id: prompt.id,
      prompt: prompt.prompt,
      promptGenre: e.target.value,
      alreadyUsed: false,
      previousWinner: "",
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    //axios
      //.post(`/api/prompts/`, { prompt })
      axios({
        method: 'post',
        url: '/api/prompts/',
        data: {
          id: prompt.id,
          prompt: prompt.prompt,
          promptGenre: prompt.promptGenre,
          alreadyUsed: prompt.alreadyUsed,
          previousWinner: "N/A",
        },
        headers: {
          "content-type": "application/json",
        }
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch ((error) => {
        if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        }
    });
  }; */

  const [userData, setUserData] = useState("");

  useEffect(() => {
    axios
    .get("/getUserDrawings", {params: {username: username} })
    //.get("/api/user_memories/")
    .then((data) => {
      setUserData(data?.data.data);
      //console.log(data?.data.data);
      setLoaded(true);
      //setUserData(["Hello"]);
    });
  }, [username]);

  const [value, setValue] = useState('date');
  const [loaded, setLoaded] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    //console.log(e.target.value);
    //console.log(value)
    userData.sort(function(a, b) {
      if (e.target.value === 'date') {
        var a_date = new Date(a.date);
        var b_date = new Date(b.date);
        return a_date - b_date;
      } else if (e.target.value === "highRate") {
        return b.avgRating - a.avgRating;
      } else if (e.target.value === "lowRate") {
        return a.avgRating - b.avgRating;
      }
    });
  };

  const [reason, setReason] = useState('default');

  const handleReportChange = (e) => {
    setReason(e.target.value);
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [picIsOpen, setPicIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function submitReport() {
    setIsOpen(false);
  }

  function openPic() {
    setPicIsOpen(true);
  }

  function afterOpenPic() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closePic() {
    setPicIsOpen(false);
  }

  function formatDate(date) {
    var dateObj = new Date(date);
    var day = dateObj.getDate();
    var month = dateObj.getMonth() + 1;
    var year = dateObj.getFullYear();

    if (day < 10) {
      day = '0' + day;
    }
    
    if (month < 10) {
        month = `0${month}`;
    }

    return day + "/" + month + "/" + year;
  }

  //Will be really easy to just load every image (with information) into the array
  //const layout = [{i: "i", x: 0, y: 0, w: 1, h:1}]
  var layout = [];

  for (let j = 0; j < userData.length; j++) {
    layout.push({i: String(j), x: (j)%4, y: Math.floor((j+1)/4), w: 1, h: 1});
    //console.log(layout);
  }

  const ResponsiveGridLayout = WidthProvider(Responsive);
  
  const GridItemWrapper = styled.div`
    background: white;
    border: 10px;
    border-color: white;
    text-align: center;
  `;
  
  const GridItemContent = styled.div`
    padding: 8px;
    color: black;
    font-size: 25px;
  `;
  
  const Root = styled.div`
    padding: 16px;
    margin-top: 20px
  `;

  if (!loaded) {
    return (
      <div className="load">
        Loading...
      </div>
    )
  }

  function displayChoice() {
    if (userData.length <= 0) {
      layout = [{ i: "Template", x: 0, y: 0, w: 1, h: 1 }]
      return (
        <div>
          <div className="NoDrawings">
            Whoops! <br></br>
            It looks like {username} hasn't done any drawings yet! <br></br>
            When they do, you will be able to see all their drawings here like this: <br></br>
          </div>

          <div className="rootDiv">
            <Root>
              <ResponsiveGridLayout
                  layouts={{ lg: layout }}
                  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                  cols={{ lg: 5, md: 5, sm: 3, xs: 1, xxs: 1 }}
                  rowHeight={300}
                  width={1000}
                  isDraggable={false}
                >
                <GridItemWrapper key="Template">
                  <GridItemContent>
                    Prompt <br></br>
                    <BsFillHouseFill size={160} /> <br></br>
                    Drawn on: YYYY/MM/DD <br></br>
                    <Button>
                      Report Inappropriate Drawing
                    </Button>
                  </GridItemContent>
                </GridItemWrapper>
              </ResponsiveGridLayout>
            </Root>
            </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="DropdownDiv">
            <label>
              Order By:
              <select value={value} onChange={handleChange}>
                <option value="date">Date Drawn</option>
                <option value="highRate">Highest Rated</option>
                <option value="lowRate">Lowest Rated</option>
              </select>
            </label>
          </div>
          <br></br>
          <Root>
            <ResponsiveGridLayout
              layouts={{ lg: layout }}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 4, md: 4, sm: 3, xs: 2, xxs: 1 }}
              rowHeight={300}
              width={1000}
              isDraggable={false}
            >
              {userData.map((item, i) => {
                return (
                  <GridItemWrapper key={i}>
                    <GridItemContent>
                      {item?.prompt} <br></br>
                      <img src={item?.drawing} alt={"Missing image"} width={300} height={165} onClick={openPic}/> <br></br>
                      <Modal
                        isOpen={picIsOpen}
                        onAfterOpen={afterOpenPic}
                        onRequestClose={closePic}
                        contentLabel="Picture Modal"
                      >
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Picture</h2>
                        <button onClick={closePic} className="closeButton">X</button>
                        <div className="enlargedPicture">
                        <img src={item?.drawing} alt={"Missing image"} width={1000} height={550}/>
                        </div>
                      </Modal>
                      Drawn on: {formatDate(item?.date)} <br></br>
                      <Button onClick={openModal}>
                        Report Inappropriate Drawing
                      </Button>
                      <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        contentLabel="Report Modal"
                      >
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Report</h2>
                        <button onClick={closeModal} className="closeButton">X</button>
                        <div className="ReportHeader">
                          <h1><u>Report {username}'s Drawing</u></h1>
                          <p>You are reporting {username}'s drawing</p>
                        </div>
                        <form className="ReportForm">
                          <label>
                            Please pick an option that best describes the drawing: <br></br>
                            <select value={reason} onChange={handleReportChange}>
                              <option value="default">Please select</option>
                              <option value="offensive">The drawing is offensive</option>
                              <option value="inappropriate">The drawing is inappropriate</option>
                              <option value="unrelated">The drawing is unrelated to the prompt</option>
                            </select>
                          </label> <br></br><br></br>
                          Any other comments? <br></br>
                          <input></input> <br></br><br></br>
                          <button onClick={submitReport}>Submit Report</button>
                          <button onClick={closeModal}>Cancel Report</button>
                        </form>
                      </Modal>
                    </GridItemContent>
                  </GridItemWrapper>
                )
              })}
            </ResponsiveGridLayout>
          </Root>
        </div>
      )
    }
  }
  

  return (
    <div className="FriendsMemoriesDiv">
      <div className="Title">
        {username}'s Drawings
      </div>
      {displayChoice()}
    </div>
  )
}
        
export default FriendsMemories;