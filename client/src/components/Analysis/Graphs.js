import React from "react";
import { Bar, Radar } from "react-chartjs-2";
import "../css/Analysis.css";

function Graphs(props) {
  const data = {
    labels: ['Awful (0)', 'Bad (1)', 'Poor (2)', 'Okay (3)', 'Better (4)', 'Agreeable (5)', 'Excellent (6)'],
    datasets: [
      {
        label: 'Overall',
        data: props.occurenceCount.overall,
        backgroundColor: '#f94144b0',
        borderColor: '#f94144',
      },
      {
        label: 'Government',
        data: props.occurenceCount.government,
        backgroundColor: '#f3722cb0',
        borderColor: '#f3722c',
      },
      {
        label: 'Industry',
        data: props.occurenceCount.industry,
        backgroundColor: '#f8961eb0',
        borderColor: '#f8961e',
      },
      {
        label: 'Beauty',
        data: props.occurenceCount.beauty,
        backgroundColor: '#f9c74fb0',
        borderColor: '#f9c74f',
      },
      {
        label: 'Safety',
        data: props.occurenceCount.safety,
        backgroundColor: '#90be6db0',
        borderColor: '#90be6d',
      },
      {
        label: 'Social',
        data: props.occurenceCount.social,
        backgroundColor: '#43aa8bb0',
        borderColor: '#43aa8b',
      },
      {
        label: 'Cost',
        data: props.occurenceCount.cost,
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
      <div
        className={
          props.activeTab === "analysis-graphs" &&
          props.coordsChosen
            ? "graphs-view"
            : "hidden"
        }
      >
        .GRAPHS
        <div className='graphs-visual'>
          <Radar data={data} options={options}/>
        </div>
      </div>
    </>
  );
}

export default Graphs;