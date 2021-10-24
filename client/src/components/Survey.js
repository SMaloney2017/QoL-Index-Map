import React from "react";
import { AiOutlineCloseCircle, AiOutlineForm } from "react-icons/ai";
import "./css/Survey.css";
import Minimap from "./Minimap";

class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      overall: 3,
      government: 3,
      industry: 3,
      beauty: 3,
      safety: 3,
      social: 3,
      cost: 3,
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

  setValue = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: parseInt(e.target.value) }, () => {
      console.log("Survey.js (setValue) - ", e.target.name, e.target.value);
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
        <>
          <div className="survey-icon">
            <AiOutlineForm onClick={this.toggleView} />
          </div>
        </>
        <div
          className={this.state.active ? "survey-menu active" : "survey-menu"}
        >
          <>
            <button className="survey-exit-shadow">
              <span className="survey-exit">
                <AiOutlineCloseCircle onClick={this.toggleView} />
              </span>
            </button>
            <div className="survey-header">Contribute</div>
            <hr size="1" width="100%" color="#552fff" />
          </>
          <>
            <div className="item-container">
              <div className="map-container">
                <Minimap
                  indexval={this.state.COORDS.index}
                  updateCenter={this.updateCenter}
                />
              </div>
              <form className="form-container" onSubmit={this.sendDataToDb}>
                <div className="form-item">
                  <div className="form-text">overall: {this.state.overall}</div>
                  <div className="survey-button-container">
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5c0c0c" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#fe2323" }}
                        name="overall"
                        value="0"
                        onClick={this.setValue}
                      >
                        0
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5e1f0e" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ff5528" }}
                        name="overall"
                        value="1"
                        onClick={this.setValue}
                      >
                        1
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#61310d" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ff872c" }}
                        name="overall"
                        value="2"
                        onClick={this.setValue}
                      >
                        2
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#696014" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ffeb35" }}
                        name="overall"
                        value="3"
                        onClick={this.setValue}
                      >
                        3
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#4a5914" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#c7ef39" }}
                        name="overall"
                        value="4"
                        onClick={this.setValue}
                      >
                        4
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#295916" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#72f43f" }}
                        name="overall"
                        value="5"
                        onClick={this.setValue}
                      >
                        5
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#074a13" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#1cf945" }}
                        name="overall"
                        value="6"
                        onClick={this.setValue}
                      >
                        6
                      </button>
                    </button>
                  </div>
                </div>
                <br />
                <div className="form-item">
                  <div className="form-text">
                    government: {this.state.government}
                  </div>
                  <div className="survey-button-container">
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5c0c0c" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#fe2323" }}
                        name="government"
                        value="0"
                        onClick={this.setValue}
                      >
                        0
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5e1f0e" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ff5528" }}
                        name="government"
                        value="1"
                        onClick={this.setValue}
                      >
                        1
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#61310d" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ff872c" }}
                        name="government"
                        value="2"
                        onClick={this.setValue}
                      >
                        2
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#696014" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ffeb35" }}
                        name="government"
                        value="3"
                        onClick={this.setValue}
                      >
                        3
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#4a5914" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#c7ef39" }}
                        name="government"
                        value="4"
                        onClick={this.setValue}
                      >
                        4
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#295916" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#72f43f" }}
                        name="government"
                        value="5"
                        onClick={this.setValue}
                      >
                        5
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#074a13" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#1cf945" }}
                        name="government"
                        value="6"
                        onClick={this.setValue}
                      >
                        6
                      </button>
                    </button>
                  </div>
                </div>
                <br />
                <div className="form-item">
                  <div className="form-text">
                    industry: {this.state.industry}
                  </div>
                  <div className="survey-button-container">
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5c0c0c" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#fe2323" }}
                        name="industry"
                        value="0"
                        onClick={this.setValue}
                      >
                        0
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5e1f0e" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ff5528" }}
                        name="industry"
                        value="1"
                        onClick={this.setValue}
                      >
                        1
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#61310d" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ff872c" }}
                        name="industry"
                        value="2"
                        onClick={this.setValue}
                      >
                        2
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#696014" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ffeb35" }}
                        name="industry"
                        value="3"
                        onClick={this.setValue}
                      >
                        3
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#4a5914" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#c7ef39" }}
                        name="industry"
                        value="4"
                        onClick={this.setValue}
                      >
                        4
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#295916" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#72f43f" }}
                        name="industry"
                        value="5"
                        onClick={this.setValue}
                      >
                        5
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#074a13" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#1cf945" }}
                        name="industry"
                        value="6"
                        onClick={this.setValue}
                      >
                        6
                      </button>
                    </button>
                  </div>
                </div>
                <br />
                <div className="form-item">
                  <div className="form-text">beauty: {this.state.beauty}</div>
                  <div className="survey-button-container">
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5c0c0c" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#fe2323" }}
                        name="beauty"
                        value="0"
                        onClick={this.setValue}
                      >
                        0
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5e1f0e" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ff5528" }}
                        name="beauty"
                        value="1"
                        onClick={this.setValue}
                      >
                        1
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#61310d" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ff872c" }}
                        name="beauty"
                        value="2"
                        onClick={this.setValue}
                      >
                        2
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#696014" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ffeb35" }}
                        name="beauty"
                        value="3"
                        onClick={this.setValue}
                      >
                        3
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#4a5914" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#c7ef39" }}
                        name="beauty"
                        value="4"
                        onClick={this.setValue}
                      >
                        4
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#295916" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#72f43f" }}
                        name="beauty"
                        value="5"
                        onClick={this.setValue}
                      >
                        5
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#074a13" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#1cf945" }}
                        name="beauty"
                        value="6"
                        onClick={this.setValue}
                      >
                        6
                      </button>
                    </button>
                  </div>
                </div>
                <br />
                <div className="form-item">
                  <div className="form-text">safety: {this.state.safety}</div>
                  <div className="survey-button-container">
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5c0c0c" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#fe2323" }}
                        name="safety"
                        value="0"
                        onClick={this.setValue}
                      >
                        0
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5e1f0e" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ff5528" }}
                        name="safety"
                        value="1"
                        onClick={this.setValue}
                      >
                        1
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#61310d" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ff872c" }}
                        name="safety"
                        value="2"
                        onClick={this.setValue}
                      >
                        2
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#696014" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ffeb35" }}
                        name="safety"
                        value="3"
                        onClick={this.setValue}
                      >
                        3
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#4a5914" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#c7ef39" }}
                        name="safety"
                        value="4"
                        onClick={this.setValue}
                      >
                        4
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#295916" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#72f43f" }}
                        name="safety"
                        value="5"
                        onClick={this.setValue}
                      >
                        5
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#074a13" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#1cf945" }}
                        name="safety"
                        value="6"
                        onClick={this.setValue}
                      >
                        6
                      </button>
                    </button>
                  </div>
                </div>
                <br />
                <div className="form-item">
                  <div className="form-text">social: {this.state.social}</div>
                  <div className="survey-button-container">
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5c0c0c" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#fe2323" }}
                        name="social"
                        value="0"
                        onClick={this.setValue}
                      >
                        0
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5e1f0e" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ff5528" }}
                        name="social"
                        value="1"
                        onClick={this.setValue}
                      >
                        1
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#61310d" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ff872c" }}
                        name="social"
                        value="2"
                        onClick={this.setValue}
                      >
                        2
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#696014" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ffeb35" }}
                        name="social"
                        value="3"
                        onClick={this.setValue}
                      >
                        3
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#4a5914" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#c7ef39" }}
                        name="social"
                        value="4"
                        onClick={this.setValue}
                      >
                        4
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#295916" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#72f43f" }}
                        name="social"
                        value="5"
                        onClick={this.setValue}
                      >
                        5
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#074a13" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#1cf945" }}
                        name="social"
                        value="6"
                        onClick={this.setValue}
                      >
                        6
                      </button>
                    </button>
                  </div>
                </div>
                <br />
                <div className="form-item">
                  <div className="form-text">
                    cost of living: {this.state.cost}
                  </div>
                  <div className="survey-button-container">
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5c0c0c" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#fe2323" }}
                        name="cost"
                        value="0"
                        onClick={this.setValue}
                      >
                        0
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5e1f0e" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ff5528" }}
                        name="cost"
                        value="1"
                        onClick={this.setValue}
                      >
                        1
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#61310d" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ff872c" }}
                        name="cost"
                        value="2"
                        onClick={this.setValue}
                      >
                        2
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#696014" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#ffeb35" }}
                        name="cost"
                        value="3"
                        onClick={this.setValue}
                      >
                        3
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#4a5914" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#c7ef39" }}
                        name="cost"
                        value="4"
                        onClick={this.setValue}
                      >
                        4
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#295916" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#72f43f" }}
                        name="cost"
                        value="5"
                        onClick={this.setValue}
                      >
                        5
                      </button>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#074a13" }}
                    >
                      <button
                        className="form-button"
                        style={{ background: "#1cf945" }}
                        name="cost"
                        value="6"
                        onClick={this.setValue}
                      >
                        6
                      </button>
                    </button>
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
          </>
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
