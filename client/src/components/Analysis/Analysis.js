import React from "react";
import { AiOutlineCloseCircle, AiFillCalculator } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RiFolderChartLine, RiLineChartLine } from "react-icons/ri";
import { BiReset } from "react-icons/bi";
import Select from "./Select"
import Stats from "./Stats"
import Graphs from "./Graphs"
import "../css/Analysis.css";

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: true,
      inputView: true,
      cmdLine: ".ENTER AREA RADIUS",
      r: 0,
      center: { lat: 28.56, lng: -80.64 },
      selectedCenter: { lat: 28.56, lng: -80.64 },
      coordsChosen: false,
      simpleStats: {
        overall: { mean: 0, mode: 0, skew: 0, deviation: 0 },
        government: { mean: 0, mode: 0, skew: 0, deviation: 0 },
        industry: { mean: 0, mode: 0, skew: 0, deviation: 0 },
        beauty: { mean: 0, mode: 0, skew: 0, deviation: 0 },
        safety: { mean: 0, mode: 0, skew: 0, deviation: 0 },
        social: { mean: 0, mode: 0, skew: 0, deviation: 0 },
        cost: { mean: 0, mode: 0, skew: 0, deviation: 0 }
      },
      dataSets: {
        overall: [],
        government: [],
        industry: [],
        beauty: [],
        safety: [],
        social: [],
        cost: []
      },
      occurenceCount: {
        overall: [],
        government: [],
        industry: [],
        beauty: [],
        safety: [],
        social: [],
        cost: []
      },
      activeTab: "analysis-start",
      coorelation: ["overall", "overall"],
    };
    this.default = this.state;
    this.validateInput = this.validateInput.bind(this);
    this.startAnalysis = this.startAnalysis.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.resetAnalysis = this.resetAnalysis.bind(this);
    this.getDataSets = this.getDataSets.bind(this);
    this.setComparison = this.setComparison.bind(this);
    this.countOccurences = this.countOccurences.bind(this);
    this.setRadius = this.setRadius.bind(this);
    this.checkLength = this.checkLength.bind(this);
    this.setComparison = this.setComparison.bind(this);
  }

  toggleView = () => {
    this.setState({ view: !this.state.view });
  };

  toggleTab = (tabView) => {
    this.setState({ activeTab: tabView });
  };

  resetAnalysis = () => {
    this.setState(this.default);
    this.setState({ view: false });
    this.setState({ center: this.props.getCenter });
    this.setState({
      dataSets: {
        overall: [],
        government: [],
        industry: [],
        beauty: [],
        safety: [],
        social: [],
        cost: [],
      },
    });
    document.getElementById("radius").className = "radius-button";
    document.getElementById("radius").onClick = null;
    this.props.shareRange(0);
  };

  setComparison = (index, i) => {
    const newCoorelation = this.state.coorelation.slice();
    newCoorelation[i] = index;
    this.setState({ coorelation: newCoorelation });
  };

  checkLength = (index1, index2) => {
    if (this.state.dataSets[index1].length > 2) {
      if (
        this.state.dataSets[index1].length ===
        this.state.dataSets[index2].length
      ) {
        return true;
      }
    }
    return false;
  };

  validateInput = () => {
    if (isNaN(+this.state.r)) {
      this.setState({ cmdLine: ".ENTRY MUST BE INTEGER" });
    } else if (this.state.r <= 0 || this.state.r > 2000) {
      this.setState({ cmdLine: ".ENTRY MUST BE > 0 && < 2000" });
    } else {
      document.getElementById("radius").className = "radius-flashing";
      this.setState({
        cmdLine: ".DRAG MAP TO DESIRED AREA THEN CLICK MARKER ICON",
      });
      document.getElementById("radius").onclick = this.startAnalysis;
      this.setState({ inputView: false });
    }
  };

  getDataForAnalysis = async (e) => {
    e.preventDefault();
    try {
      const data = {
        distance: this.state.r,
        COORDS: this.state.center,
      };
      const response = await fetch("http://localhost:5000/analysis", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const receivedData = await response.json();
      this.getDataSets(receivedData);
    } catch (error) {
      console.log(error.message);
    }
  };

  getDataSets = (queriedData) => {
    for (var i in queriedData) {
      if (queriedData.hasOwnProperty(i)) {
        this.state.dataSets.overall.push(queriedData[i].overall);
        this.state.dataSets.government.push(queriedData[i].government);
        this.state.dataSets.industry.push(queriedData[i].industry);
        this.state.dataSets.beauty.push(queriedData[i].beauty);
        this.state.dataSets.safety.push(queriedData[i].safety);
        this.state.dataSets.social.push(queriedData[i].social);
        this.state.dataSets.cost.push(queriedData[i].cost);
      }
    }
    this.countOccurences()
    console.log(this.state.dataSets);
    console.log(this.state.occurenceCount)
  };

  countOccurences = () => {
    var newOccurences = {
      overall: [0, 0, 0, 0, 0, 0, 0],
      government: [0, 0, 0, 0, 0, 0, 0],
      industry: [0, 0, 0, 0, 0, 0, 0],
      beauty: [0, 0, 0, 0, 0, 0, 0],
      safety: [0, 0, 0, 0, 0, 0, 0],
      social: [0, 0, 0, 0, 0, 0, 0],
      cost: [0, 0, 0, 0, 0, 0, 0]
    }
    for(var i in this.state.dataSets){
      for(var j in this.state.dataSets[i]){
        newOccurences[i][this.state.dataSets[i][j]]++
      }
      this.setState({ occurenceCount: newOccurences});
    }
  }

  startAnalysis = (e) => {
    this.setState({ selectedCenter: this.state.center });
    this.setState({ coordsChosen: true });
    document.getElementById("radius").className = "radius active";
    document.getElementById("radius").onclick =
      this.toggleTab("analysis-start");
    this.props.shareRange(this.state.r * 1000);
    this.props.shareSelectedCenter(this.state.selectedCenter);
    this.setState({
      cmdLine: ".AREA SELECTED: STATS & GRAPHS ICONS ACTIVE",
    });
    this.getDataForAnalysis(e);
  };

  componentDidUpdate(prevProps) {
    if (this.props.getCenter !== prevProps.getCenter) {
      this.setState({ center: this.props.getCenter });
    }
  }

  setRadius = (e, value) => {
    e.preventDefault();
    this.setState({ r: value });
  }

  render() {

    return (
      <>
        <div className="analysis-container">
          <div
            className={this.state.view ? "analysis-button-shadow" : "analysis-view-shadow"}
          >
            <span
              className={
                this.state.view
                  ? "analysis-button"
                  : "analysis-view"
              }
            >
              <div
                className={
                  this.state.view ? "analysis-icon-shadow" : "analysis-icon-shadow active"
                }
                onClick={this.toggleView}
              >
                <div
                  className={
                    this.state.view
                      ? "analysis-icon"
                      : "analysis-icon active"
                  }
                >
                  <div className={this.state.view ? null : "hidden"}>
                    <AiFillCalculator />
                  </div>
                  <div className={this.state.view ? "hidden" : "analysis-close"}>
                    <AiOutlineCloseCircle />
                  </div>
                </div>
              </div>
              <div
                id="radius"
                className={this.state.view ? "hidden" : "radius-button"}
              >
                <FaMapMarkerAlt
                  value="analysis-start"
                  onClick={(e) => this.toggleTab("analysis-start")}
                />
              </div>
              <div
                id="stats"
                className={this.state.view ? "hidden" : "stats-button"}
              >
                <RiFolderChartLine
                  value="analysis-stats"
                  onClick={(e) => this.toggleTab("analysis-stats")}
                />
              </div>
              <div
                id="graphs"
                className={this.state.view ? "hidden" : "graphs-button"}
              >
                <RiLineChartLine
                  value="analysis-graphs"
                  onClick={(e) => this.toggleTab("analysis-graphs")}
                />
              </div>
              <div className={this.state.view ? "hidden" : "reset-button"}>
                <BiReset onClick={this.resetAnalysis} />
              </div>
              <span className={this.state.view ? "hidden" : "analysis-screen"}>
                <Select
                  coordsChosen={this.state.coordsChosen}
                  center={this.state.center}
                  selectedCenter={this.state.selectedCenter}
                  inputView={this.state.inputView}
                  activeTab={this.state.activeTab}
                  cmdLine={this.state.cmdLine}
                  r={this.state.r}
                  setRadius={this.setRadius}
                  validateInput={this.validateInput}
                />
                <Stats
                  activeTab={this.state.activeTab}
                  coordsChosen={this.state.coordsChosen}
                  dataSets={this.state.dataSets}
                  coorelation={this.state.coorelation}
                  setComparison={this.setComparison}
                  checkLength={this.checkLength}
                />
                <Graphs
                  occurenceCount={this.state.occurenceCount}
                  activeTab={this.state.activeTab}
                  coordsChosen={this.state.coordsChosen}
                />
              </span>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default Analysis;
