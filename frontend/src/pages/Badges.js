import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import validator from "validator";
import minion from "../minion.png";
import "../styles/Badges.css";

function Badges() {
  const [badgesData, setBadges] = useState([]);
  const [badgesEarned, setBadgesEarned] = useState([]);

  const username = sessionStorage.getItem("token");

  const getBadgeData = (badgesEarned) => {
    axios.get("/api/badges/").then((badgesData) => {
      setBadges(badgesData?.data);

      // set badge unlocked value from user data
      for (let i = 0; i < badgesData.data.length; i++) {
        if (badgesEarned.toString()[i] == 1)
          badgesData.data[i].badgeUnlocked = true;
        else if (badgesEarned.toString()[i] == 0)
          badgesData.data[i].badgeUnlocked = false;
      }
    }, []);
  };

  const updateBadgesEarned = (badgesEarned) => {
    axios.get("updateBadges", { params: { username, badgesEarned } }).then();
    getBadgesEarned();
  };

  const updateBadgeTime = (badgeName) => {
    axios.get("updateBadgeTime", { params: { badgeName } });
    getBadgesEarned();
  };

  const getBadgesEarned = () => {
    axios.get("getBadgesEarned", { params: { username } }).then(
      (badgesEarned) => {
        unlockBadges(badgesEarned.data);
        getBadgeData(badgesEarned.data);
      },
      [username]
    );
  };

  function changeBadgesEarned(badgesEarned, index) {
    badgesEarned = badgesEarned.toString().split("");
    badgesEarned[index] = "1";
    badgesEarned = badgesEarned.join("");
    return badgesEarned;
  }

  function fixGenreData(data) {
    var words = [];
    var current_word = "";

    for (var i = 0; i < data.length; i++) {
      var char = data[i];
      if (/[a-zA-Z]/.test(char)) {
        current_word += char;
      } else {
        if (current_word) {
          words.push(current_word);
          current_word = "";
        }
      }
    }
    if (current_word) {
      words.push(current_word);
    }
    return words;
  }

  function findLargestNumber(data) {
    const values = data.split(")(");
    let max = -Infinity;
    for (let i = 0; i < values.length; i++) {
      const value = parseFloat(values[i].replace(/\(|\)/g, ""));
      if (!isNaN(value) && value > max) {
        max = value;
      }
    }
    return max;
  }

  const unlockBadges = (badgesEarned) => {
    var change = 0;

    const requests = [
      axios.get("getTotalDrawings", { params: { username } }),
      axios.get("getAvgRating", { params: { username } }),
      axios.get("getPromptGenre", { params: { username } }),
    ];

    Promise.all(requests).then(([totalDrawings, avgRating, promptGenre]) => {
      totalDrawings = totalDrawings.data;

      if (totalDrawings >= 1 && badgesEarned.toString()[0] !== "1") {
        badgesEarned = changeBadgesEarned(badgesEarned, 0);
        setBadgesEarned(badgesEarned);
        console.log("unlocked 1 drawings completed", badgesEarned);
        change = 1;
      }
      if (totalDrawings >= 5 && badgesEarned.toString()[1] !== "1") {
        badgesEarned = changeBadgesEarned(badgesEarned, 1);
        setBadgesEarned(badgesEarned);
        console.log("unlocked 5 drawings completed");
        change = 1;
      }
      if (totalDrawings >= 20 && badgesEarned.toString()[2] !== "1") {
        badgesEarned = changeBadgesEarned(badgesEarned, 2);
        setBadgesEarned(badgesEarned);
        console.log("unlocked 20 drawings completed");
        change = 1;
      }
      if (totalDrawings >= 50 && badgesEarned.toString()[3] !== "1") {
        badgesEarned = changeBadgesEarned(badgesEarned, 3);
        setBadgesEarned(badgesEarned);
        console.log("unlocked 50 drawings completed");
        change = 1;
      }

      const largestAvgRating = findLargestNumber(avgRating.data);
      if (largestAvgRating >= "4" && badgesEarned.toString()[4] !== "1") {
        badgesEarned = changeBadgesEarned(badgesEarned, 4);
        setBadgesEarned(badgesEarned);
        console.log("unlocked high rating badge");
        change = 1;
      }

      if (largestAvgRating >= "5" && badgesEarned.toString()[5] !== "1") {
        badgesEarned = changeBadgesEarned(badgesEarned, 5);
        setBadgesEarned(badgesEarned);
        console.log("unlocked highest rating badge");
        change = 1;
      }

      // all genres user has done
      promptGenre = fixGenreData(promptGenre.data);

      if (
        badgesEarned.toString()[6] === "1" &&
        badgesEarned.toString()[7] === "1" &&
        badgesEarned.toString()[8] === "1" &&
        badgesEarned.toString()[9] === "1" &&
        badgesEarned.toString()[10] === "1"
      ) {
        console.log("Genres already unlocked");
      } else {
        for (var i = 0; i < promptGenre.length; i++) {
          var genre = promptGenre[i];
          if (genre === "Food" && badgesEarned.toString()[6] !== "1") {
            badgesEarned = changeBadgesEarned(badgesEarned, 6);
            setBadgesEarned(badgesEarned);
            console.log("Unlocked Food genre");
            change = 1;
          } else if (
            genre === "Building" &&
            badgesEarned.toString()[7] !== "1"
          ) {
            badgesEarned = changeBadgesEarned(badgesEarned, 7);
            setBadgesEarned(badgesEarned);
            console.log("Unlocked Building genre");
            change = 1;
          } else if (genre === "Scene" && badgesEarned.toString()[8] !== "1") {
            badgesEarned = changeBadgesEarned(badgesEarned, 8);
            setBadgesEarned(badgesEarned);
            console.log("Unlocked Scene genre");
            change = 1;
          } else if (genre === "Animal" && badgesEarned.toString()[9] !== "1") {
            badgesEarned = changeBadgesEarned(badgesEarned, 9);
            setBadgesEarned(badgesEarned);
            console.log("Unlocked Animal genre");
            change = 1;
          } else if (
            genre === "Vehicle" &&
            badgesEarned.toString()[10] !== "1"
          ) {
            badgesEarned = changeBadgesEarned(badgesEarned, 10);
            setBadgesEarned(badgesEarned);
            console.log("Unlocked Vehicle genre");
            change = 1;
          } else if (
            genre === "Nature" &&
            badgesEarned.toString()[11] !== "1"
          ) {
            badgesEarned = changeBadgesEarned(badgesEarned, 11);
            setBadgesEarned(badgesEarned);
            console.log("Unlocked Nature genre");
            change = 1;
          } else {
            console.log("Genre already unlocked: " + genre);
          }
        }
      }

      if (change == 1) {
        console.log("update");
        updateBadgesEarned(badgesEarned);
      }
    });
  };

  useEffect(() => {
    console.log(username);
    getBadgesEarned();
  }, []);

  const [activeSortButton, setActiveSortButton] = React.useState(null);
  const [activeFilterButton, setActiveFilterButton] = React.useState(null);
  var [sortedBadgesArray, setSortedBadgesArray] = React.useState([]);
  const [originalBadgesArray, setOriginalBadgesArray] = React.useState([]);

  useEffect(() => {
    setSortedBadgesArray(badgesData);
    setOriginalBadgesArray(badgesData);
  }, [badgesData]);

  useEffect(() => {
    setFilteredBadges(sortedBadgesArray);
  }, [sortedBadgesArray]);

  const handleSort = (option) => {
    if (activeSortButton === option) {
      setActiveSortButton(null);
    }

    if (activeFilterButton === option) {
      setActiveFilterButton(null);
    }

    if (activeSortButton === option || activeFilterButton === option) {
      handleReset();
    }

    // sort the data based on the selected option
    else if (option === "alphabetical") {
      setActiveSortButton(option);
      // sort by alphabetical
      const sortedBadges = [...sortedBadgesArray].sort((a, b) => {
        if (a.badgeName < b.badgeName) {
          return -1;
        }
        if (a.badgeName > b.badgeName) {
          return 1;
        }
        return 0;
      });
      setSortedBadgesArray(sortedBadges);
    } else if (option === "reverseAlpha") {
      setActiveSortButton(option);
      // sort by alphabetical
      const sortedBadges = [...sortedBadgesArray].sort((a, b) => {
        if (a.badgeName > b.badgeName) {
          return -1;
        }
        if (a.badgeName < b.badgeName) {
          return 1;
        }
        return 0;
      });
      setSortedBadgesArray(sortedBadges);
    } else {
      setActiveFilterButton(option);
      if (option === "number") {
        // sort by number of drawings
        sortedBadgesArray = handleReset();
        const sortedBadges = [...sortedBadgesArray].slice(0, 4);
        setSortedBadgesArray(sortedBadges);
      } else if (option === "genre") {
        // sort by genre
        sortedBadgesArray = handleReset();
        const sortedBadges = [...sortedBadgesArray].slice(6, 12);
        setSortedBadgesArray(sortedBadges);
      } else if (option === "rating") {
        // sort by genre
        sortedBadgesArray = handleReset();
        const sortedBadges = [...sortedBadgesArray].slice(4, 6);
        setSortedBadgesArray(sortedBadges);
      }
    }
  };

  const handleReset = () => {
    setSortedBadgesArray([...originalBadgesArray]);
    return [...originalBadgesArray];
  };

  //search bar
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBadges, setFilteredBadges] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredBadges = sortedBadgesArray.filter(
      (filteredBadge) =>
        filteredBadge.badgeName
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        filteredBadge.badgeDescription
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
    );
    console.log(event.target.value);
    console.log(filteredBadges);
    setFilteredBadges(filteredBadges);
  };

  // seperates badges into unlocked and locked with filter and sort
  const unlockedBadges = sortedBadgesArray.filter(
    (badge) => badge.badgeUnlocked && filteredBadges.includes(badge)
  );
  const lockedBadges = sortedBadgesArray.filter(
    (badge) => !badge.badgeUnlocked && filteredBadges.includes(badge)
  );

  function createBadgeElements(badges) {
    return (
      <Col>
        {badges.map((badge, id) => (
          <div className="badgeElement" key={id}>
            <Badge
              name={badge.badgeName}
              image={`data:image/png;base64,${badge.badgeIcon}`}
              description={badge.badgeDescription}
              unlocked={badge.badgeUnlocked}
            />
          </div>
        ))}
      </Col>
    );
  }

  function Badge(props) {
    const { name, image, unlocked, description } = props;
    return (
      <div className={`badge ${unlocked ? "unlocked" : "locked"}`}>
        <Row>
          <Col>
            <img className="badgeIcon" src={image} alt={name} />
          </Col>
          <Col>
            <Row>
              <div className="badgeName">{name}</div>
            </Row>
            <Row>
              <div className="badgeDescription">{description}</div>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="Badges">
      <div className="filtersBar">
        <h2 className="filters">Filters</h2>
        <svg className="seperator">
          <rect></rect>
        </svg>

        <div className="searchBar">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Filter Badges..."
          />
        </div>

        <svg className="seperator">
          <rect></rect>
        </svg>

        <h2 className="filterHeading">Sort</h2>

        <div className="sortButtons">
          <button
            className={`sortAlphabetical ${
              activeSortButton === "alphabetical" ? "toggled" : ""
            }`}
            onClick={() => {
              setActiveSortButton("alphabetical");
              handleSort("alphabetical");
            }}
          >
            Alphabetical
          </button>
          <button
            className={`sortReverseAlpha ${
              activeSortButton === "reverseAlpha" ? "toggled" : ""
            }`}
            onClick={() => {
              setActiveSortButton("reverseAlpha");
              handleSort("reverseAlpha");
            }}
          >
            Reverse Alphabetical
          </button>
        </div>

        <svg className="seperator">
          <rect></rect>
        </svg>

        <h2 className="filterHeading">Badge Type</h2>

        <div className="sortButtons">
          <button
            className={`filterNumber ${
              activeFilterButton === "number" ? "toggled" : ""
            }`}
            onClick={() => {
              setActiveFilterButton("number");
              handleSort("number");
            }}
          >
            Number of Drawings
          </button>
          <button
            className={`filterGenre ${
              activeFilterButton === "genre" ? "toggled" : ""
            }`}
            onClick={() => {
              setActiveFilterButton("genre");
              handleSort("genre");
            }}
          >
            Genres Completed
          </button>
          <button
            className={`filterRating ${
              activeFilterButton === "rating" ? "toggled" : ""
            }`}
            onClick={() => {
              setActiveFilterButton("rating");
              handleSort("rating");
            }}
          >
            Rating
          </button>
        </div>
        <svg className="seperator">
          <rect></rect>
        </svg>
      </div>

      <div className="badgesContainer">
        <div className="badgesUnlocked">
          <div className="underline">
            <h1 className="badgeHeading">Badges (Unlocked)</h1>
          </div>

          <div className="badgeElement">
            <Row>{createBadgeElements(unlockedBadges)}</Row>
          </div>
        </div>

        <div className="badgesLocked">
          <div className="underline">
            <h1 className="badgeHeading">Badges (Locked)</h1>
          </div>
          <div className="badgeElement">
            <Row>{createBadgeElements(lockedBadges)}</Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Badges;
