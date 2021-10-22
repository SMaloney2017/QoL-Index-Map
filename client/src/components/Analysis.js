import React from "react";
import { AiOutlineCloseCircle, AiFillCalculator } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RiFolderChartLine, RiLineChartLine } from "react-icons/ri";
import { BiReset } from "react-icons/bi";
import {
  mean,
  mode,
  sampleSkewness,
  standardDeviation,
  sampleCorrelation,
} from "simple-statistics";
import { bar } from "react-chartjs-2";
import "./Analysis.css";

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
        cost: { mean: 0, mode: 0, skew: 0, deviation: 0 },
      },
      dataSets: {
        overall: [0, 0, 0],
        government: [0, 0, 0],
        industry: [0, 0, 0],
        beauty: [0, 0, 0],
        safety: [0, 0, 0],
        social: [0, 0, 0],
        cost: [0, 0, 0],
      },
      activeTab: "analysis-start",
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

  toggleTab = (tabView) => {
    this.setState({ activeTab: tabView });
  };

  resetAnalysis = () => {
    this.setState(this.default);
    this.setState({ view: false });
    this.setState({ center: this.props.getCenter});
    this.setState({dataSets:{overall: [0, 0, 0], government: [0, 0, 0], industry: [0, 0, 0], beauty: [0, 0, 0], safety: [0, 0, 0], social: [0, 0, 0], cost: [0, 0, 0]}});
    document.getElementById("radius").className = "radius-button";
    document.getElementById("radius").onClick = null;
    this.props.shareRange(0);
  };

  validateInput = () => {
    if (isNaN(+this.state.r)) {
      this.setState({ cmdLine: ".ENTRY MUST BE INTEGER" });
    } else if (this.state.r <= 0 || this.state.r > 2000) {
      this.setState({ cmdLine: ".ENTRY MUST BE > 0 && < 2000" });
    } else {
      document.getElementById("radius").className = "radius-flashing";
      this.setState({ cmdLine: ".DRAG MAP TO DESIRED AREA THEN CLICK MARKER ICON" });
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
    this.state.dataSets.overall.splice(0, 3)
    this.state.dataSets.government.splice(0, 3)
    this.state.dataSets.industry.splice(0, 3)
    this.state.dataSets.beauty.splice(0, 3)
    this.state.dataSets.safety.splice(0, 3)
    this.state.dataSets.social.splice(0, 3)
    this.state.dataSets.cost.splice(0, 3)
    console.log(this.state.dataSets);
  };

  startAnalysis = (e) => {
    this.setState({selectedCenter: this.state.center});
    this.setState({coordsChosen: true});
    document.getElementById("radius").className = "radius-active";
    document.getElementById("radius").onclick =
      this.toggleTab("analysis-start");
    this.props.shareRange(this.state.r * 1000);
    this.props.shareSelectedCenter(this.state.selectedCenter);
    this.setState({ cmdLine: ".AREA SELECTED, CLICK STATS/ GRAPHS ICON TO VIEW" });
    this.getDataForAnalysis(e);
  };

  componentDidUpdate(prevProps) {
    if (this.props.getCenter !== prevProps.getCenter) {
      this.setState({ center: this.props.getCenter });
    }
  }

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
              <span className={this.state.view ? "hidden" : "analysis-info"}>
                <div
                  className={
                    this.state.activeTab === "analysis-start"
                      ? "info-text"
                      : "hidden"
                  }
                >
                  {this.state.cmdLine}<br />
                  <span className={this.state.coordsChosen ? "hidden" : null}>.{"{"}{this.state.center.lat.toFixed(2)},{this.state.center.lng.toFixed(2)}{"}"}</span>
                  <span className={this.state.coordsChosen ? "coords-chosen" : "hidden"}>.{"{"}{this.state.selectedCenter.lat.toFixed(2)},{this.state.selectedCenter.lng.toFixed(2)}{"}"}</span>
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
                <div
                  className={
                    this.state.activeTab === "analysis-stats" && this.state.coordsChosen
                      ? "info-stats"
                      : "hidden"
                  }
                >
                  .STATISTICS<br />
                  <table>
                    <tr>
                      <th>INDEX</th>
                      <th>MEAN</th>
                      <th>MODE</th>
                      <th>STDEV</th>
                      <th>SKEW</th>
                    </tr>
                    <tr>
                      <td>OVERALL</td>
                      <td>{mean(this.state.dataSets.overall).toFixed(2)}</td>
                      <td>{mode(this.state.dataSets.overall).toFixed(2)}</td>
                      <td>{standardDeviation(this.state.dataSets.overall).toFixed(2)}</td>
                      <td>{sampleSkewness(this.state.dataSets.overall).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>GOVERNMENT</td>
                      <td>{mean(this.state.dataSets.government).toFixed(2)}</td>
                      <td>{mode(this.state.dataSets.government).toFixed(2)}</td>
                      <td>{standardDeviation(this.state.dataSets.government).toFixed(2)}</td>
                      <td>{sampleSkewness(this.state.dataSets.government).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>INDUSTRY</td>
                      <td>{mean(this.state.dataSets.industry).toFixed(2)}</td>
                      <td>{mode(this.state.dataSets.industry).toFixed(2)}</td>
                      <td>{standardDeviation(this.state.dataSets.industry).toFixed(2)}</td>
                      <td>{sampleSkewness(this.state.dataSets.industry).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>BEAUTY</td>
                      <td>{mean(this.state.dataSets.beauty).toFixed(2)}</td>
                      <td>{mode(this.state.dataSets.beauty).toFixed(2)}</td>
                      <td>{standardDeviation(this.state.dataSets.beauty).toFixed(2)}</td>
                      <td>{sampleSkewness(this.state.dataSets.beauty).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>SAFETY</td>
                      <td>{mean(this.state.dataSets.safety).toFixed(2)}</td>
                      <td>{mode(this.state.dataSets.safety).toFixed(2)}</td>
                      <td>{standardDeviation(this.state.dataSets.safety).toFixed(2)}</td>
                      <td>{sampleSkewness(this.state.dataSets.safety).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>SOCIAL</td>
                      <td>{mean(this.state.dataSets.social).toFixed(2)}</td>
                      <td>{mode(this.state.dataSets.social).toFixed(2)}</td>
                      <td>{standardDeviation(this.state.dataSets.social).toFixed(2)}</td>
                      <td>{sampleSkewness(this.state.dataSets.social).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>COST</td>
                      <td>{mean(this.state.dataSets.cost).toFixed(2)}</td>
                      <td>{mode(this.state.dataSets.cost).toFixed(2)}</td>
                      <td>{standardDeviation(this.state.dataSets.cost).toFixed(2)}</td>
                      <td>{sampleSkewness(this.state.dataSets.cost).toFixed(2)}</td>
                    </tr>
                  </table>
                </div>
                <div
                  className={
                    this.state.activeTab === "analysis-graphs" && this.state.coordsChosen
                      ? "info-graphs"
                      : "hidden"
                  }
                >
                  .GRAPHS<br />
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
