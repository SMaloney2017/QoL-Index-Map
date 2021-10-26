import React from "react";
import { AiOutlineCloseCircle, AiOutlineForm } from "react-icons/ai";
import "./css/Survey.css";
import Minimap from "./Minimap";

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
    e.preventDefault();
    this.setState({ [name]: parseInt(value) }, () => {
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
                      onClick={(e) => this.setValue(e, 'overall', 0)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#fe2323" }}
                      >
                        0
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5e1f0e" }}
                      onClick={(e) => this.setValue(e, 'overall', 1)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ff5528" }}
                      >
                        1
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#61310d" }}
                      onClick={(e) => this.setValue(e, 'overall', 2)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ff872c" }}
                      >
                        2
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#696014" }}
                      onClick={(e) => this.setValue(e, 'overall', 3)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ffeb35" }}
                      >
                        3
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#4a5914" }}
                      onClick={(e) => this.setValue(e, 'overall', 4)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#c7ef39" }}
                      >
                        4
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#295916" }}
                      onClick={(e) => this.setValue(e, 'overall', 5)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#72f43f" }}
                      >
                        5
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#074a13" }}
                      onClick={(e) => this.setValue(e, 'overall', 6)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#1cf945" }}
                      >
                        6
                      </span>
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
                      onClick={(e) => this.setValue(e, 'government', 0)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#fe2323" }}
                      >
                        0
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5e1f0e" }}
                      onClick={(e) => this.setValue(e, 'government', 1)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ff5528" }}
                      >
                        1
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#61310d" }}
                      onClick={(e) => this.setValue(e, 'government', 2)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ff872c" }}
                      >
                        2
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#696014" }}
                      onClick={(e) => this.setValue(e, 'government', 3)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ffeb35" }}
                      >
                        3
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#4a5914" }}
                      onClick={(e) => this.setValue(e, 'government', 4)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#c7ef39" }}
                      >
                        4
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#295916" }}
                      onClick={(e) => this.setValue(e, 'government', 5)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#72f43f" }}
                      >
                        5
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#074a13" }}
                      onClick={(e) => this.setValue(e, 'government', 6)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#1cf945" }}
                      >
                        6
                      </span>
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
                      onClick={(e) => this.setValue(e, 'industry', 0)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#fe2323" }}
                      >
                        0
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5e1f0e" }}
                      onClick={(e) => this.setValue(e, 'industry', 1)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ff5528" }}
                      >
                        1
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#61310d" }}
                      onClick={(e) => this.setValue(e, 'industry', 2)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ff872c" }}
                      >
                        2
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#696014" }}
                      onClick={(e) => this.setValue(e, 'industry', 3)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ffeb35" }}
                      >
                        3
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#4a5914" }}
                      onClick={(e) => this.setValue(e, 'industry', 4)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#c7ef39" }}
                      >
                        4
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#295916" }}
                      onClick={(e) => this.setValue(e, 'industry', 5)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#72f43f" }}
                      >
                        5
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#074a13" }}
                      onClick={(e) => this.setValue(e, 'industry', 6)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#1cf945" }}
                      >
                        6
                      </span>
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
                      onClick={(e) => this.setValue(e, 'beauty', 0)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#fe2323" }}
                      >
                        0
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5e1f0e" }}
                      onClick={(e) => this.setValue(e, 'beauty', 1)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ff5528" }}
                      >
                        1
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#61310d" }}
                      onClick={(e) => this.setValue(e, 'beauty', 2)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ff872c" }}
                      >
                        2
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#696014" }}
                      onClick={(e) => this.setValue(e, 'beauty', 3)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ffeb35" }}
                      >
                        3
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#4a5914" }}
                      onClick={(e) => this.setValue(e, 'beauty', 4)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#c7ef39" }}
                      >
                        4
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#295916" }}
                      onClick={(e) => this.setValue(e, 'beauty', 5)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#72f43f" }}
                      >
                        5
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#074a13" }}
                      onClick={(e) => this.setValue(e, 'beauty', 6)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#1cf945" }}
                      >
                        6
                      </span>
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
                      onClick={(e) => this.setValue(e, 'safety', 0)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#fe2323" }}
                      >
                        0
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5e1f0e" }}
                      onClick={(e) => this.setValue(e, 'safety', 1)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ff5528" }}
                      >
                        1
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#61310d" }}
                      onClick={(e) => this.setValue(e, 'safety', 2)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ff872c" }}
                      >
                        2
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#696014" }}
                      onClick={(e) => this.setValue(e, 'safety', 3)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ffeb35" }}
                      >
                        3
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#4a5914" }}
                      onClick={(e) => this.setValue(e, 'safety', 4)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#c7ef39" }}
                      >
                        4
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#295916" }}
                      onClick={(e) => this.setValue(e, 'safety', 5)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#72f43f" }}
                      >
                        5
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#074a13" }}
                      onClick={(e) => this.setValue(e, 'safety', 6)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#1cf945" }}
                      >
                        6
                      </span>
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
                      onClick={(e) => this.setValue(e, 'social', 0)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#fe2323" }}
                      >
                        0
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5e1f0e" }}
                      onClick={(e) => this.setValue(e, 'social', 1)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ff5528" }}
                      >
                        1
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#61310d" }}
                      onClick={(e) => this.setValue(e, 'social', 2)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ff872c" }}
                      >
                        2
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#696014" }}
                      onClick={(e) => this.setValue(e, 'social', 3)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ffeb35" }}
                      >
                        3
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#4a5914" }}
                      onClick={(e) => this.setValue(e, 'social', 4)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#c7ef39" }}
                      >
                        4
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#295916" }}
                      onClick={(e) => this.setValue(e, 'social', 5)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#72f43f" }}
                      >
                        5
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#074a13" }}
                      onClick={(e) => this.setValue(e, 'social', 6)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#1cf945" }}
                      >
                        6
                      </span>
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
                      onClick={(e) => this.setValue(e, 'cost', 0)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#fe2323" }}
                      >
                        0
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#5e1f0e" }}
                      onClick={(e) => this.setValue(e, 'cost', 1)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ff5528" }}
                      >
                        1
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#61310d" }}
                      onClick={(e) => this.setValue(e, 'cost', 2)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ff872c" }}
                      >
                        2
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#696014" }}
                      onClick={(e) => this.setValue(e, 'cost', 3)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#ffeb35" }}
                      >
                        3
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#4a5914" }}
                      onClick={(e) => this.setValue(e, 'cost', 4)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#c7ef39" }}
                      >
                        4
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#295916" }}
                      onClick={(e) => this.setValue(e, 'cost', 5)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#72f43f" }}
                      >
                        5
                      </span>
                    </button>
                    <button
                      className="form-button-shadow"
                      style={{ background: "#074a13" }}
                      onClick={(e) => this.setValue(e, 'cost', 6)}
                    >
                      <span
                        className="form-button"
                        style={{ background: "#1cf945" }}
                      >
                        6
                      </span>
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
