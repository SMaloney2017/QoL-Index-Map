import React from "react";
import { AiOutlineCloseCircle, AiFillCalculator } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RiFolderChartLine, RiLineChartLine } from "react-icons/ri";
import { BiReset } from "react-icons/bi";
import { mean, mode, sampleSkewness, standardDeviation, sampleCorrelation } from 'simple-statistics'
import { bar } from 'react-chartjs-2';
import "./Analysis.css";

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: true,
      inputView: true,
      cmdLine: ".POSITION RETICLE, ENTER RADIUS",
      r: 0,
      center: { lat: 28.56, lng: -80.64 },
      simpleStats: {
        overall: {mean: 0, mode: 0, skew: 0, deviation: 0},
        government: {mean: 0, mode: 0, skew: 0, deviation: 0},
        industry: {mean: 0, mode: 0, skew: 0, deviation: 0},
        beauty: {mean: 0, mode: 0, skew: 0, deviation: 0},
        safety: {mean: 0, mode: 0, skew: 0, deviation: 0},
        social: {mean: 0, mode: 0, skew: 0, deviation: 0}, 
        cost: {mean: 0, mode: 0, skew: 0, deviation: 0},
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
      activeTab: 'analysis-info'
    };
    this.default = this.state;
    this.validateInput = this.validateInput.bind(this);
    this.startAnalysis = this.startAnalysis.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.resetAnalysis = this.resetAnalysis.bind(this);
    this.getDataSets = this.getDataSets.bind(this);
  }


  toggleView = () => {
    this.setState({ view: !this.state.view });
  };

  resetAnalysis = () => {
    this.setState(this.default);
    this.setState({ view: false });
    document.getElementById("radius").onclick = null;
    document.getElementById("radius").className = "radius-button";
    this.props.shareRange(0);
  };

  validateInput = () => {
    if (isNaN(+this.state.r)) {
      this.setState({ cmdLine: ".ENTRY MUST BE INTEGER" });
    } else if (this.state.r <= 0 || this.state.r > 2000) {
      this.setState({ cmdLine: ".ENTRY MUST BE > 0 && < 2000" });
    } else {
      document.getElementById("radius").className = "radius-flashing";
      this.setState({ cmdLine: ".CLICK MARKER ICON TO BEGIN" });
      document.getElementById("radius").onclick = this.startAnalysis;
      this.setState({ inputView: false });
    }
  };

  getDataForAnalysis = async (e) => {
    e.preventDefault();
    try {
      const data = {
        distance: this.state.r,
        COORDS: this.state.center
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
        this.state.dataSets.overall.push(queriedData[i].overall)
        this.state.dataSets.government.push(queriedData[i].government)
        this.state.dataSets.industry.push(queriedData[i].overindustryall)
        this.state.dataSets.beauty.push(queriedData[i].overbeautyall)
        this.state.dataSets.safety.push(queriedData[i].safety)
        this.state.dataSets.social.push(queriedData[i].social)
        this.state.dataSets.cost.push(queriedData[i].cost)
      }
    }
    console.log(this.state.dataSets)
  }

  startAnalysis = (e) => {
    this.props.shareRange(this.state.r * 1000);
    this.setState({ cmdLine: ".AREA STATISTICS" });
    document.getElementById("radius").className = "radius-active";
    this.getDataForAnalysis(e);
  };

  componentDidUpdate(prevProps) {
    if (this.props.getCenter !== prevProps.getCenter) {
      this.setState({ center: this.props.getCenter });
    }
  };

  render() {
    return (
      <>
        <div className="analysis-container">
          <div
            className={this.state.view ? "analysis-button" : "analysis-view"}
          >
            <span
              className={
                this.state.view
                  ? "analysis-button-front"
                  : "analysis-view-front"
              }
            >
              <div
                className={
                  this.state.view ? "analysis-icon" : "analysis-icon-active"
                }
                onClick={this.toggleView}
              >
                <div
                  className={
                    this.state.view
                      ? "analysis-icon-front"
                      : "analysis-icon-front-active"
                  }
                >
                  <div className={this.state.view ? null : "hidden"}>
                    <AiFillCalculator />
                  </div>
                  <div className={this.state.view ? "hidden" : "icon-open"}>
                    <AiOutlineCloseCircle />
                  </div>
                </div>
              </div>
              <div
                id="radius"
                className={this.state.view ? "hidden" : "radius-button"}
              >
                <FaMapMarkerAlt onClick={null} />
              </div>
              <div className={this.state.view ? "hidden" : "stats-button"}>
                <RiFolderChartLine />
              </div>
              <div className={this.state.view ? "hidden" : "graphs-button"}>
                <RiLineChartLine />
              </div>
              <div className={this.state.view ? "hidden" : "reset-button"}>
                <BiReset onClick={this.resetAnalysis} />
              </div>
              <span className={this.state.view ? "hidden" : this.state.activeTab}>
                <div className={this.state.activeTab === 'analysis-info' ? "info-text" : 'hidden'}>
                  {this.state.cmdLine}
                  <br />.{"{"}
                  {this.state.center.lat.toFixed(2)},
                  {this.state.center.lng.toFixed(2)}
                  {"}"}
                  <br />
                  .
                  <input
                    id="inputr"
                    type="text"
                    value={this.state.r}
                    className={this.state.inputView ? "input" : "hidden"}
                    onChange={(event) => {
                      this.setState({ r: event.target.value });
                    }}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        this.validateInput();
                      }
                    }}
                    autoComplete="off"
                    placeholder="%d{km}"
                  />
                  <span className={this.state.inputView ? "hidden" : null}>
                    {this.state.r}[km]r
                  </span>
                </div>
              </span>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default Analysis;
