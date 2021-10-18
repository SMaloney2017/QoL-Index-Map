import React from "react";
import "./Toolbar.css";
import { BsTools } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Slider } from "@mui/material";
import { TextField } from "@mui/material";

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      COORDS: [0, 0],
      overall: [0, 6],
      government: [0, 6],
      industry: [0, 6],
      beauty: [0, 6],
      safety: [0, 6],
      social: [0, 6],
      cost: [0, 6],
      startDate: "",
      endDate: "",
      selectedOption: "overall",
    };

    this.selectData = this.selectData.bind(this);
    this.clearData = this.clearData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.default = this.state;
  }

  toggleView = () => {
    this.setState({ active: !this.state.active }, () => {
      console.log("Toolbar.js (toggleView) - ", this.state.active);
    });
  };

  selectData(e) {
    this.setState({ selectedOption: String(e.target.value) }, () => {
      console.log("Toolbar.js (selectData) - ", e.target.value);
    });
  }

  clearData(e) {
    this.setState(this.default);
    this.setState({ active: true });
    this.getDateRange();
    this.sendDataToParent(e, []);
    console.log("Toolbar.js (clearData)");
  }

  setValue = (name) => (e, value) => {
    this.setState({ [name]: value }, () => {
      console.log("Toolbar.js (setValue) - ", name, value);
    });
  };

  setDate = (name) => (e) => {
    this.setState({ [name]: e.target.value }, () => {
      console.log("Toolbar.js (setDate) - ", name, e.target.value);
    });
  };

  getDataFromDb = async (e) => {
    e.preventDefault();
    try {
      const data = {
        overall: this.state.overall,
        government: this.state.government,
        industry: this.state.industry,
        beauty: this.state.beauty,
        safety: this.state.safety,
        social: this.state.social,
        cost: this.state.cost,
        selectedOption: this.state.selectedOption,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      };
      const response = await fetch("http://localhost:5000/query", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const receivedData = await response.json();
      console.log(receivedData);
      this.sendDataToParent(e, receivedData);
    } catch (error) {
      console.log(error.message);
    }
  };

  sendDataToParent = (e, receivedData) => {
    this.props.shareData(receivedData);
    e.preventDefault();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    var validation = true;
    validation &= this.sendDataToParent(e);
    validation &= this.getDataFromDb(e);
    return validation;
  };

  getDateRange() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = String(currentDate.getMonth() + 1).padStart(2, "0");
    var day = String(currentDate.getDate()).padStart(2, "0");
    var presentDate = year + "-" + month + "-" + day;
    this.setState({ startDate: "1776-12-25" });
    this.setState({ endDate: presentDate }, () => {
      console.log("Toolbar.js (componentDidMount) - ", this.state);
    });
  }

  componentDidMount() {
    this.getDateRange();
  }

  render() {
    const {
      overall,
      government,
      industry,
      beauty,
      safety,
      social,
      cost,
      startDate,
      endDate,
    } = this.state;

    return (
      <>
        <div className="toolbar-icon">
          <BsTools onClick={this.toggleView} />
        </div>
        <div
          className={this.state.active ? "toolbar-menu active" : "toolbar-menu"}
        >
          <div>
            <button className="toolbar-close">
              <span className="toolbar-close-front">
                <AiOutlineCloseCircle onClick={this.toggleView} />
              </span>
            </button>
            <form onSubmit={this.handleSubmit}>
              <div className="toolbar-query">
                <div className="toolbar-header">Query</div>
                <hr size="1" width="90%" color="#272727" />
                <div className="toolbar-text">
                  data visable:{" "}
                  <span style={{ color: "#ff2929" }}>
                    {this.state.selectedOption}
                  </span>
                </div>
                <div className="toolbar-select-container">
                  <div className="toolbar-subtext">
                    <div>
                      <input
                        type="radio"
                        onChange={this.selectData}
                        value="overall"
                        name="selectedOption"
                        checked={this.state.selectedOption === "overall"}
                      />
                      overall
                    </div>
                    <div>
                      <input
                        type="radio"
                        onChange={this.selectData}
                        value="government"
                        name="selectedOption"
                        checked={this.state.selectedOption === "government"}
                      />
                      government
                    </div>
                    <div>
                      <input
                        type="radio"
                        onChange={this.selectData}
                        value="industry"
                        name="selectedOption"
                        checked={this.state.selectedOption === "industry"}
                      />
                      industry
                    </div>
                    <div>
                      <input
                        type="radio"
                        onChange={this.selectData}
                        value="beauty"
                        name="selectedOption"
                        checked={this.state.selectedOption === "beauty"}
                      />
                      beauty
                    </div>
                  </div>
                  <div className="toolbar-subtext">
                    <div>
                      <input
                        type="radio"
                        onChange={this.selectData}
                        value="safety"
                        name="selectedOption"
                        checked={this.state.selectedOption === "safety"}
                      />
                      safety
                    </div>
                    <div>
                      <input
                        type="radio"
                        onChange={this.selectData}
                        value="social"
                        name="selectedOption"
                        checked={this.state.selectedOption === "social"}
                      />
                      social
                    </div>
                    <div>
                      <input
                        type="radio"
                        onChange={this.selectData}
                        value="cost"
                        name="selectedOption"
                        checked={this.state.selectedOption === "cost"}
                      />
                      cost
                    </div>
                  </div>
                </div>
                <br />
                <div className="toolbar-range-container">
                  <div className="toolbar-text">
                    overall range:{" "}
                    <span style={{ color: "#00ff95c5" }}>
                      {this.state.overall[0]} - {this.state.overall[1]}
                    </span>
                  </div>
                  <Slider
                    style={{ width: "70%" }}
                    value={overall}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.setValue("overall")}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                  />
                  <div className="toolbar-text">
                    government range:{" "}
                    <span style={{ color: "#00ff95c5" }}>
                      {this.state.government[0]} - {this.state.government[1]}
                    </span>
                  </div>
                  <Slider
                    style={{ width: "70%" }}
                    value={government}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.setValue("government")}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                  />
                  <div className="toolbar-text">
                    industry range:{" "}
                    <span style={{ color: "#00ff95c5" }}>
                      {this.state.industry[0]} - {this.state.industry[1]}
                    </span>
                  </div>
                  <Slider
                    style={{ width: "70%" }}
                    value={industry}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.setValue("industry")}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                  />
                  <div className="toolbar-text">
                    beauty range:{" "}
                    <span style={{ color: "#00ff95c5" }}>
                      {this.state.beauty[0]} - {this.state.beauty[1]}
                    </span>
                  </div>
                  <Slider
                    style={{ width: "70%" }}
                    value={beauty}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.setValue("beauty")}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                  />
                  <div className="toolbar-text">
                    safety range:{" "}
                    <span style={{ color: "#00ff95c5" }}>
                      {this.state.safety[0]} - {this.state.safety[1]}
                    </span>
                  </div>
                  <Slider
                    style={{ width: "70%" }}
                    value={safety}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.setValue("safety")}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                  />
                  <div className="toolbar-text">
                    social range:{" "}
                    <span style={{ color: "#00ff95c5" }}>
                      {this.state.social[0]} - {this.state.social[1]}
                    </span>
                  </div>
                  <Slider
                    style={{ width: "70%" }}
                    value={social}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.setValue("social")}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                  />
                  <div className="toolbar-text">
                    cost range:{" "}
                    <span style={{ color: "#00ff95c5" }}>
                      {this.state.cost[0]} - {this.state.cost[1]}
                    </span>
                  </div>
                  <Slider
                    style={{ width: "70%" }}
                    value={cost}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.setValue("cost")}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                  />
                </div>
                <br />
                <div className="toolbar-datepicker-container">
                  <div className="datepicker">
                    <TextField
                      id="startDate"
                      label="Start Date"
                      type="date"
                      value={startDate}
                      onChange={this.setDate("startDate")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  <div className="datepicker">
                    <TextField
                      id="endDate"
                      label="End Date"
                      type="date"
                      value={endDate}
                      onChange={this.setDate("endDate")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                </div>
                <br />
                <br />
                <button
                  className="toolbar-submit"
                  type="submit"
                  onClick={this.toggleView}
                >
                  <span className="toolbar-submit-front">Submit</span>
                </button>
                <button
                  className="toolbar-clear"
                  type="reset"
                  onClick={this.clearData}
                >
                  <span className="toolbar-clear-front">Clear</span>
                </button>
                <br />
                <br />
              </div>
              <br />
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Toolbar;
