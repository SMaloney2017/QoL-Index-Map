import React from "react";
import { AiOutlineCloseCircle, AiOutlineForm } from "react-icons/ai";
import "../../css/Survey.css";
import Minimap from "../../Maps/Minimap";
import Buttons from "./Buttons";

class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      overall: 0,
      government: 0,
      industry: 0,
      beauty: 0,
      safety: 0,
      social: 0,
      cost: 0,
      COORDS: [26.8, -80.4],
    };
    this.sendDataToDb = this.sendDataToDb.bind(this);
    this.setValue = this.setValue.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.updateCenter = this.updateCenter.bind(this);
  }

  toggleView = () => {
    this.setState({ active: !this.state.active }, () => {
      console.log("Survey.js (toggleView) - ", this.state.active);
    });
  };

  setValue = (e, name, value) => {
    e.preventDefault(e);
    this.setState({ [name]: value }, () => {
      console.log("Survey.js (setValue) - ", name, value);
    });
  };

  sendDataToDb = async (e) => {
    e.preventDefault(e);
    try {
      const data = {
        overall: this.state.overall,
        government: this.state.government,
        industry: this.state.industry,
        beauty: this.state.beauty,
        safety: this.state.safety,
        social: this.state.social,
        cost: this.state.cost,
        lat: this.state.COORDS[0].toFixed(2),
        lng: this.state.COORDS[1].toFixed(2),
      };
      const response = await fetch("http://localhost:5000/newdata", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  updateCenter = (newCenter) => {
    this.setState({ COORDS: newCenter }, () => {
      console.log("Survey.js (updateCenter) - ", this.state.COORDS);
    });
  };

  render() {
    return (
      <>
        <div className="survey-icon">
          <AiOutlineForm onClick={this.toggleView} />
        </div>
        <div
          className={this.state.active ? "survey-menu active" : "survey-menu"}
        >
          <button className="survey-exit-shadow">
            <span className="survey-exit">
              <AiOutlineCloseCircle onClick={this.toggleView} />
            </span>
          </button>
          <div className="survey-header">Contribute</div>
          <hr size="1" width="100%" color="#552fff" />
          <div className="item-container">
            <div className="map-container">
              <Minimap updateCenter={this.updateCenter} />
            </div>
            <form className="form-container" onSubmit={this.sendDataToDb}>
              <div className="form-item">
                <div className="form-text">overall: {this.state.overall}</div>
                <div className="survey-button-container">
                  <Buttons setValue={this.setValue} name={"overall"} />
                </div>
              </div>
              <br />
              <div className="form-item">
                <div className="form-text">
                  government: {this.state.government}
                </div>
                <div className="survey-button-container">
                  <Buttons setValue={this.setValue} name={"government"} />
                </div>
              </div>
              <br />
              <div className="form-item">
                <div className="form-text">industry: {this.state.industry}</div>
                <div className="survey-button-container">
                  <Buttons setValue={this.setValue} name={"industry"} />
                </div>
              </div>
              <br />
              <div className="form-item">
                <div className="form-text">beauty: {this.state.beauty}</div>
                <div className="survey-button-container">
                  <Buttons setValue={this.setValue} name={"beauty"} />
                </div>
              </div>
              <br />
              <div className="form-item">
                <div className="form-text">safety: {this.state.safety}</div>
                <div className="survey-button-container">
                  <Buttons setValue={this.setValue} name={"safety"} />
                </div>
              </div>
              <br />
              <div className="form-item">
                <div className="form-text">social: {this.state.social}</div>
                <div className="survey-button-container">
                  <Buttons setValue={this.setValue} name={"social"} />
                </div>
              </div>
              <br />
              <div className="form-item">
                <div className="form-text">
                  cost of living: {this.state.cost}
                </div>
                <div className="survey-button-container">
                  <Buttons setValue={this.setValue} name={"cost"} />
                </div>
              </div>
              <br />
              <div
                className="form-subtext"
                style={{
                  color: "#fffff",
                  fontFamily: "Segoe UI",
                  fontSize: "20px",
                  fontWeight: "lighter",
                }}
              >
                (Lat, Lng): {this.state.COORDS[0].toFixed(2)},{" "}
                {this.state.COORDS[1].toFixed(2)} ( Select coordinates by
                positioning the map's reticle in the area you'd like to rate! )
              </div>
              <button
                className="survey-submit-shadow"
                type="submit"
                onClick={this.toggleView}
              >
                <span className="survey-submit">Submit</span>
              </button>
            </form>
            <br />
          </div>
          <p className="image-link">
            <a
              href="http://www.freepik.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Background images designed by macrovector / Freepik
            </a>
          </p>
        </div>
      </>
    );
  }
}

export default Survey;
