import React, { useState } from "react";
import "./App.css";
import Survey from "./components/Survey";
import Toolbar from "./components/Toolbar";
import Display from "./components/Display";
import Analysis from "./components/Analysis";

function App() {
  const [getData, shareData] = useState([]);
  const [getCenter, shareCenter] = useState({ lat: 28.56, lng: -80.64 });
  const [getSelectedCenter, shareSelectedCenter] = useState({ lat: 28.56, lng: -80.64 });
  const [getRange, shareRange] = useState(0);
/*
  function changeColor(color) {
    document.body.style.backgroundColor = color;
  } 
*/  

  return (
    <>
      <div className="app-header">
        <Toolbar shareData={shareData} /> <Survey />
        <header className="header-text">Quality of Life Map.</header>
        <div className="header-subtext">
          A tool for creating and analyzing a database of user perspectives
          around the world.
          <br />
          Built with React.js, Node.js, PostgreSQL, and Google Maps.
        </div>
        {/* <div className="header-button-container">
          <button
            onClick={() => changeColor("#6085ff")}
            className="header-button-shadow"
            style={{ backgroundColor: "#6085ff70" }}
          >
            <span
              className="header-button"
              style={{ backgroundColor: "#6085ff" }}
            ></span>
          </button>
          <button
            onClick={() => changeColor("#ff6060")}
            className="header-button-shadow"
            style={{ backgroundColor: "#ff606070" }}
          >
            <span
              className="header-button"
              style={{ backgroundColor: "#ff6060" }}
            ></span>
          </button>
          <button
            onClick={() => changeColor("#00ff95")}
            className="header-button-shadow"
            style={{ backgroundColor: "#00ff9570" }}
          >
            <span
              className="header-button"
              style={{ backgroundColor: "#00ff95" }}
            ></span>
          </button>
          <button
            onClick={() => changeColor("#575757")}
            className="header-button-shadow"
            style={{ backgroundColor: "#ffffff70" }}
          >
            <span
              className="header-button-bw"
              style={{ backgroundColor: "#ffffff" }}
            ></span>
          </button>
        </div> */}
      </div>
      <>
        <Display
          getData={getData}
          getCenter={getCenter}
          getRange={getRange}
          shareCenter={shareCenter}
          getSelectedCenter={getSelectedCenter}
        />
        <Analysis getCenter={getCenter} shareRange={shareRange} shareSelectedCenter={shareSelectedCenter} />
      </>
    </>
  );
}

export default App;
