import React from "react";
import { Line, Radar } from "react-chartjs-2";
import "../css/Analysis.css";

function Graphs(props) {
  const data = {
    labels: [
      "Awful (0)",
      "Bad (1)",
      "Poor (2)",
      "Okay (3)",
      "Better (4)",
      "Agreeable (5)",
      "Excellent (6)",
    ],
    datasets: [
      {
        label: "Overall",
        data: props.occurenceCount.overall,
        backgroundColor: "#f94144b0",
        borderColor: "#f94144",
      },
      {
        label: "Government",
        data: props.occurenceCount.government,
        backgroundColor: "#f3722cb0",
        borderColor: "#f3722c",
      },
      {
        label: "Industry",
        data: props.occurenceCount.industry,
        backgroundColor: "#f8961eb0",
        borderColor: "#f8961e",
      },
      {
        label: "Beauty",
        data: props.occurenceCount.beauty,
        backgroundColor: "#f9c74fb0",
        borderColor: "#f9c74f",
      },
      {
        label: "Safety",
        data: props.occurenceCount.safety,
        backgroundColor: "#90be6db0",
        borderColor: "#90be6d",
      },
      {
        label: "Social",
        data: props.occurenceCount.social,
        backgroundColor: "#43aa8bb0",
        borderColor: "#43aa8b",
      },
      {
        label: "Cost",
        data: props.occurenceCount.cost,
        backgroundColor: "#577590b0",
        borderColor: "#577590",
      },
    ],
  };

  const options_radial = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 15,
            family: "monospace",
          },
          color: "#fff562",
        },
        position: "top",
      },
    },
    scales: {
      r: {
        ticks: {
          color: "#fff562",
          showLabelBackdrop: false,
          z: 1,
          callback: function (value) {
            if (value % 1 === 0) {
              return value;
            }
          },
        },
        angleLines: {
          color: "#fff56230",
          lineWidth: 3,
        },
        grid: {
          drawTicks: false,
          circular: true,
          color: "#fff56230",
          lineWidth: 3,
        },
        pointLabels: {
          color: "#fff562",
          font: {
            size: 15,
            family: "monospace",
          },
        },
      },
    },
  };

  const options_line = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      xaxis: {
        ticks: {
          color: "#fff562",
          showLabelBackdrop: false,
        },
        grid: {
          drawTicks: false,
          color: "#fff56230",
          lineWidth: 2,
        },
      },
      yaxis: {
        ticks: {
          color: "#fff562",
          showLabelBackdrop: false,
          callback: function (value) {
            if (value % 1 === 0) {
              return value;
            }
          },
          font: {
            size: 15,
            family: "monospace",
          },
        },
        grid: {
          drawTicks: false,
          color: "#fff56230",
          lineWidth: 2,
        },
      },
    },
  };

  return (
    <>
      <div
        className={
          props.activeTab === "analysis-graphs" && props.coordsChosen
            ? "graphs-view"
            : "hidden"
        }
      >
        GRAPHS
        <div className="graphs-visual">
          <Radar data={data} options={options_radial} />
          <Line data={data} options={options_line} />
        </div>
      </div>
    </>
  );
}

export default Graphs;
