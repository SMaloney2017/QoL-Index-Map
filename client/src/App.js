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
