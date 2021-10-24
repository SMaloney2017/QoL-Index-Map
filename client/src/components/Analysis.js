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
import { Bar, Radar } from "react-chartjs-2";
import "./css/Analysis.css";

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

  render() {
    const data = {
      labels: ['Awful (0)', 'Bad (1)', 'Poor (2)', 'Okay (3)', 'Better (4)', 'Agreeable (5)', 'Excellent (6)'],
      datasets: [
        {
          label: 'Overall',
          data: this.state.occurenceCount.overall,
          backgroundColor: '#f94144b0',
          borderColor: '#f94144',
        },
        {
          label: 'Government',
          data: this.state.occurenceCount.government,
          backgroundColor: '#f3722cb0',
          borderColor: '#f3722c',
        },
        {
          label: 'Industry',
          data: this.state.occurenceCount.industry,
          backgroundColor: '#f8961eb0',
          borderColor: '#f8961e',
        },
        {
          label: 'Beauty',
          data: this.state.occurenceCount.beauty,
          backgroundColor: '#f9c74fb0',
          borderColor: '#f9c74f',
        },
        {
          label: 'Safety',
          data: this.state.occurenceCount.safety,
          backgroundColor: '#90be6db0',
          borderColor: '#90be6d',
        },
        {
          label: 'Social',
          data: this.state.occurenceCount.social,
          backgroundColor: '#43aa8bb0',
          borderColor: '#43aa8b',
        },
        {
          label: 'Cost',
          data: this.state.occurenceCount.cost,
          backgroundColor: '#577590b0',
          borderColor: '#577590',
        },
      ],
    };

    const options = {
      scales: {
        r: {
          ticks: {
            showLabelBackdrop: false,
            stepSize: 2,
            z: 1
          },
          angleLines: {
            lineWidth: 3
          },
          grid: {
            drawTicks: false,
            circular: true,
            lineWidth: 3
          },
          pointLabels: {
            color: '#fff562'
          }
        }
      }
    };

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
                <div
                  className={
                    this.state.activeTab === "analysis-start"
                      ? "screen-text"
                      : "hidden"
                  }
                >
                  {this.state.cmdLine}
                  <br />
                  <span className={this.state.coordsChosen ? "hidden" : null}>
                    {"{"}
                    {this.state.center.lat.toFixed(2)},
                    {this.state.center.lng.toFixed(2)}
                    {"}"}
                  </span>
                  <span
                    className={
                      this.state.coordsChosen ? "coords-chosen" : "hidden"
                    }
                  >
                    {"{"}
                    {this.state.selectedCenter.lat.toFixed(2)},
                    {this.state.selectedCenter.lng.toFixed(2)}
                    {"}"}
                  </span>
                  <br />
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
                    this.state.activeTab === "analysis-stats" &&
                    this.state.coordsChosen
                      ? "stats-view"
                      : "hidden"
                  }
                >
                  .STATISTICS
                  <br />
                  <table>
                    <tbody>
                      <tr>
                        <th>INDEX</th>
                        <th>MEAN</th>
                        <th>MODE</th>
                        <th>STDEV</th>
                        <th>SKEW</th>
                      </tr>
                      <tr>
                        <td>OVERALL</td>
                        <td>
                          {this.state.dataSets.overall.length > 0
                            ? mean(this.state.dataSets.overall).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.overall.length > 0
                            ? mode(this.state.dataSets.overall).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.overall.length > 0
                            ? standardDeviation(
                                this.state.dataSets.overall
                              ).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.overall.length > 3
                            ? sampleSkewness(this.state.dataSets.overall).toFixed(
                                2
                              )
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td>GOVERNMENT</td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? mean(this.state.dataSets.government).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? mode(this.state.dataSets.government).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? standardDeviation(
                                this.state.dataSets.government
                              ).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 3
                            ? sampleSkewness(
                                this.state.dataSets.government
                              ).toFixed(2)
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td>INDUSTRY</td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? mean(this.state.dataSets.industry).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? mode(this.state.dataSets.industry).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? standardDeviation(
                                this.state.dataSets.industry
                              ).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 3
                            ? sampleSkewness(
                                this.state.dataSets.industry
                              ).toFixed(2)
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td>BEAUTY</td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? mean(this.state.dataSets.beauty).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? mode(this.state.dataSets.beauty).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? standardDeviation(
                                this.state.dataSets.beauty
                              ).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 3
                            ? sampleSkewness(this.state.dataSets.beauty).toFixed(
                                2
                              )
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td>SAFETY</td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? mean(this.state.dataSets.safety).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? mode(this.state.dataSets.safety).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? standardDeviation(
                                this.state.dataSets.safety
                              ).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 3
                            ? sampleSkewness(this.state.dataSets.safety).toFixed(
                                2
                              )
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td>SOCIAL</td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? mean(this.state.dataSets.social).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? mode(this.state.dataSets.social).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? standardDeviation(
                                this.state.dataSets.social
                              ).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 3
                            ? sampleSkewness(this.state.dataSets.social).toFixed(
                                2
                              )
                            : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td>COST</td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? mean(this.state.dataSets.cost).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? mode(this.state.dataSets.cost).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 0
                            ? standardDeviation(this.state.dataSets.cost).toFixed(
                                2
                              )
                            : "N/A"}
                        </td>
                        <td>
                          {this.state.dataSets.government.length > 3
                            ? sampleSkewness(this.state.dataSets.cost).toFixed(2)
                            : "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <>
                    CORRELATION OF{"\t"}
                    <div className="correlation-dropdown">
                      <button className="correlation-dropdown-button">
                        {this.state.coorelation[0]}
                      </button>
                      <div className="correlation-dropdown-content">
                        <div
                          className="correlation-dropdown-item"
                          onMouseDown={() => this.setComparison("overall", 0)}
                        >
                          OVERALL
                        </div>
                        <div
                          className="correlation-dropdown-item"
                          onMouseDown={() => this.setComparison("government", 0)}
                        >
                          GOVERNMENT
                        </div>
                        <div
                          className="correlation-dropdown-item"
                          onMouseDown={() => this.setComparison("industry", 0)}
                        >
                          INDUSTRY
                        </div>
                        <div
                          className="correlation-dropdown-item"
                          onMouseDown={() => this.setComparison("beauty", 0)}
                        >
                          BEAUTY
                        </div>
                        <div
                          className="correlation-dropdown-item"
                          onMouseDown={() => this.setComparison("safety", 0)}
                        >
                          SAFETY
                        </div>
                        <div
                          className="correlation-dropdown-item"
                          onMouseDown={() => this.setComparison("social", 0)}
                        >
                          SOCIAL
                        </div>
                        <div
                          className="correlation-dropdown-item"
                          onMouseDown={() => this.setComparison("cost", 0)}
                        >
                          COST
                        </div>
                      </div>
                    </div>
                    {"\t"}
                    AND{"\t"}
                    <div className="correlation-dropdown">
                      <button className="correlation-dropdown-button">
                        {this.state.coorelation[1]}
                      </button>
                      <div className="correlation-dropdown-content">
                        <div
                          className="correlation-dropdown-item"
                          onMouseDown={() => this.setComparison("overall", 1)}
                        >
                          OVERALL
                        </div>
                        <div
                          className="correlation-dropdown-item"
                          onMouseDown={() => this.setComparison("government", 1)}
                        >
                          GOVERNMENT
                        </div>
                        <div
                          className="correlation-dropdown-item"
                          onMouseDown={() => this.setComparison("industry", 1)}
                        >
                          INDUSTRY
                        </div>
                        <div
                          className="correlation-dropdown-item"
                          onMouseDown={() => this.setComparison("beauty", 1)}
                        >
                          BEAUTY
                        </div>
                        <div
                          className="correlation-dropdown-item"
                          onMouseDown={() => this.setComparison("safety", 1)}
                        >
                          SAFETY
                        </div>
                        <div
                          className="correlation-dropdown-item"
                          onMouseDown={() => this.setComparison("social", 1)}
                        >
                          SOCIAL
                        </div>
                        <div
                          className="correlation-dropdown-item"
                          onMouseDown={() => this.setComparison("cost", 1)}
                        >
                          COST
                        </div>
                      </div>
                    </div>
                    {"\t"}:{"\t"}
                    <span className="coorelation-result">
                      {this.checkLength(
                        this.state.coorelation[0],
                        this.state.coorelation[1]
                      )
                        ? sampleCorrelation(
                            this.state.dataSets[this.state.coorelation[0]],
                            this.state.dataSets[this.state.coorelation[1]]
                          ).toFixed(2)
                        : "N/A"}
                    </span>
                  </>
                </div>
                <div
                  className={
                    this.state.activeTab === "analysis-graphs" &&
                    this.state.coordsChosen
                      ? "graphs-view"
                      : "hidden"
                  }
                >
                  .GRAPHS
                  <div className='graphs-visual'>
                    <Radar data={data} options={options}/>
                  </div>
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
