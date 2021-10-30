import React from "react";
import "../css/Analysis.css";

function Select(props) {
  return (
    <>
      <div
        className={
          props.activeTab === "analysis-start" ? "screen-text" : "hidden"
        }
      >
        {props.cmdLine}
        <br />
        <span className={props.coordsChosen ? "hidden" : null}>
          {"{"}
          {props.center.lat.toFixed(2)},{props.center.lng.toFixed(2)}
          {"}"}
        </span>
        <span className={props.coordsChosen ? "coords-chosen" : "hidden"}>
          {"{"}
          {props.selectedCenter.lat.toFixed(2)},
          {props.selectedCenter.lng.toFixed(2)}
          {"}"}
        </span>
        <br />
        <input
          type="text"
          value={props.r}
          className={props.inputView ? "input" : "hidden"}
          onChange={(event) => {
            props.setRadius(event, event.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              props.validateInput();
            }
          }}
          autoComplete="off"
          placeholder="%d{km}"
        />
        <span className={props.inputView ? "hidden" : null}>
          {props.r}[km]r
        </span>
      </div>
    </>
  );
}

export default Select;
