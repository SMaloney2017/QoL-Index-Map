import React from "react";
import {
  mean,
  mode,
  sampleSkewness,
  standardDeviation,
  sampleCorrelation,
} from "simple-statistics";
import "../css/Analysis.css";

function Stats(props) {
  return (
    <>
      <div
        className={
          props.activeTab === "analysis-stats" && props.coordsChosen
            ? "stats-view"
            : "hidden"
        }
      >
        STATISTICS
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
                {props.dataSets.overall.length > 0
                  ? mean(props.dataSets.overall).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.overall.length > 0
                  ? mode(props.dataSets.overall).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.overall.length > 0
                  ? standardDeviation(props.dataSets.overall).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.overall.length > 3
                  ? sampleSkewness(props.dataSets.overall).toFixed(2)
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td>GOVERNMENT</td>
              <td>
                {props.dataSets.government.length > 0
                  ? mean(props.dataSets.government).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 0
                  ? mode(props.dataSets.government).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 0
                  ? standardDeviation(props.dataSets.government).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 3
                  ? sampleSkewness(props.dataSets.government).toFixed(2)
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td>INDUSTRY</td>
              <td>
                {props.dataSets.government.length > 0
                  ? mean(props.dataSets.industry).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 0
                  ? mode(props.dataSets.industry).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 0
                  ? standardDeviation(props.dataSets.industry).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 3
                  ? sampleSkewness(props.dataSets.industry).toFixed(2)
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td>BEAUTY</td>
              <td>
                {props.dataSets.government.length > 0
                  ? mean(props.dataSets.beauty).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 0
                  ? mode(props.dataSets.beauty).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 0
                  ? standardDeviation(props.dataSets.beauty).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 3
                  ? sampleSkewness(props.dataSets.beauty).toFixed(2)
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td>SAFETY</td>
              <td>
                {props.dataSets.government.length > 0
                  ? mean(props.dataSets.safety).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 0
                  ? mode(props.dataSets.safety).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 0
                  ? standardDeviation(props.dataSets.safety).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 3
                  ? sampleSkewness(props.dataSets.safety).toFixed(2)
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td>SOCIAL</td>
              <td>
                {props.dataSets.government.length > 0
                  ? mean(props.dataSets.social).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 0
                  ? mode(props.dataSets.social).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 0
                  ? standardDeviation(props.dataSets.social).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 3
                  ? sampleSkewness(props.dataSets.social).toFixed(2)
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td>COST</td>
              <td>
                {props.dataSets.government.length > 0
                  ? mean(props.dataSets.cost).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 0
                  ? mode(props.dataSets.cost).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 0
                  ? standardDeviation(props.dataSets.cost).toFixed(2)
                  : "N/A"}
              </td>
              <td>
                {props.dataSets.government.length > 3
                  ? sampleSkewness(props.dataSets.cost).toFixed(2)
                  : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
        <>
          CORRELATION OF{"\t"}
          <div className="correlation-dropdown">
            <button className="correlation-dropdown-button">
              {props.coorelation[0]}
            </button>
            <div className="correlation-dropdown-content">
              <div
                className="correlation-dropdown-item"
                onMouseDown={() => props.setComparison("overall", 0)}
              >
                OVERALL
              </div>
              <div
                className="correlation-dropdown-item"
                onMouseDown={() => props.setComparison("government", 0)}
              >
                GOVERNMENT
              </div>
              <div
                className="correlation-dropdown-item"
                onMouseDown={() => props.setComparison("industry", 0)}
              >
                INDUSTRY
              </div>
              <div
                className="correlation-dropdown-item"
                onMouseDown={() => props.setComparison("beauty", 0)}
              >
                BEAUTY
              </div>
              <div
                className="correlation-dropdown-item"
                onMouseDown={() => props.setComparison("safety", 0)}
              >
                SAFETY
              </div>
              <div
                className="correlation-dropdown-item"
                onMouseDown={() => props.setComparison("social", 0)}
              >
                SOCIAL
              </div>
              <div
                className="correlation-dropdown-item"
                onMouseDown={() => props.setComparison("cost", 0)}
              >
                COST
              </div>
            </div>
          </div>
          {"\t"}
          AND{"\t"}
          <div className="correlation-dropdown">
            <button className="correlation-dropdown-button">
              {props.coorelation[1]}
            </button>
            <div className="correlation-dropdown-content">
              <div
                className="correlation-dropdown-item"
                onMouseDown={() => props.setComparison("overall", 1)}
              >
                OVERALL
              </div>
              <div
                className="correlation-dropdown-item"
                onMouseDown={() => props.setComparison("government", 1)}
              >
                GOVERNMENT
              </div>
              <div
                className="correlation-dropdown-item"
                onMouseDown={() => props.setComparison("industry", 1)}
              >
                INDUSTRY
              </div>
              <div
                className="correlation-dropdown-item"
                onMouseDown={() => props.setComparison("beauty", 1)}
              >
                BEAUTY
              </div>
              <div
                className="correlation-dropdown-item"
                onMouseDown={() => props.setComparison("safety", 1)}
              >
                SAFETY
              </div>
              <div
                className="correlation-dropdown-item"
                onMouseDown={() => props.setComparison("social", 1)}
              >
                SOCIAL
              </div>
              <div
                className="correlation-dropdown-item"
                onMouseDown={() => props.setComparison("cost", 1)}
              >
                COST
              </div>
            </div>
          </div>
          {"\t"}:{"\t"}
          <span className="coorelation-result">
            {props.checkLength(props.coorelation[0], props.coorelation[1])
              ? sampleCorrelation(
                  props.dataSets[props.coorelation[0]],
                  props.dataSets[props.coorelation[1]]
                ).toFixed(2)
              : "N/A"}
          </span>
        </>
      </div>
    </>
  );
}

export default Stats;
