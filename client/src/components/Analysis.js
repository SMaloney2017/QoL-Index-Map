import React, { useState } from 'react'
import { AiFillCalculator } from 'react-icons/ai'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { RiFolderChartLine, RiLineChartLine } from 'react-icons/ri'
import './Analysis.css'


function Analysis(props) {
  const [view, setView] = useState(true);
  const toggleClass = () => {
    setView(!view);
  };

  return (
    <>
      <div className='analysis-container'>
        <div className={view ? 'analysis-button': 'analysis-screen'}>
          <span className={view ? 'analysis-button-front': 'analysis-screen-front'}>
            <div className='analysis-icon'><AiFillCalculator onClick={toggleClass}/></div>
            <div className={view ? 'radius-hidden': 'radius-button'}><FaMapMarkerAlt onClick={toggleClass}/></div>
            <div className={view ? 'stats-hidden': 'stats-button'}><RiFolderChartLine onClick={toggleClass}/></div>
            <div className={view ? 'graphs-hidden': 'graphs-button'}><RiLineChartLine onClick={toggleClass}/></div>
            <span className={view ? 'info-hidden': 'analysis-info'}>
              <div className='info-text' >
                .Query Statistics...
              </div>
            </span>
          </span>
        </div>
      </div>
    </>
  )
}

export default Analysis