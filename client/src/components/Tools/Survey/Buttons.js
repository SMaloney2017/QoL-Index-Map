import React from "react";
import "../../css/Survey.css";

function Buttons(props) {
  return (
    <>
      <div className="survey-button-container">
        <button
          className="form-button-shadow"
          style={{ background: "#5c0c0c" }}
          onClick={(e) => props.setValue(e, props.name, 0)}
        >
          <span className="form-button" style={{ background: "#fe2323" }}>
            0
          </span>
        </button>
        <button
          className="form-button-shadow"
          style={{ background: "#5e1f0e" }}
          onClick={(e) => props.setValue(e, props.name, 1)}
        >
          <span className="form-button" style={{ background: "#ff5528" }}>
            1
          </span>
        </button>
        <button
          className="form-button-shadow"
          style={{ background: "#61310d" }}
          onClick={(e) => props.setValue(e, props.name, 2)}
        >
          <span className="form-button" style={{ background: "#ff872c" }}>
            2
          </span>
        </button>
        <button
          className="form-button-shadow"
          style={{ background: "#696014" }}
          onClick={(e) => props.setValue(e, props.name, 3)}
        >
          <span className="form-button" style={{ background: "#ffeb35" }}>
            3
          </span>
        </button>
        <button
          className="form-button-shadow"
          style={{ background: "#4a5914" }}
          onClick={(e) => props.setValue(e, props.name, 4)}
        >
          <span className="form-button" style={{ background: "#c7ef39" }}>
            4
          </span>
        </button>
        <button
          className="form-button-shadow"
          style={{ background: "#295916" }}
          onClick={(e) => props.setValue(e, props.name, 5)}
        >
          <span className="form-button" style={{ background: "#72f43f" }}>
            5
          </span>
        </button>
        <button
          className="form-button-shadow"
          style={{ background: "#074a13" }}
          onClick={(e) => props.setValue(e, props.name, 6)}
        >
          <span className="form-button" style={{ background: "#1cf945" }}>
            6
          </span>
        </button>
      </div>
    </>
  );
}

export default Buttons;
