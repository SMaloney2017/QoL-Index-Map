import React, { useState } from 'react'
import { AiFillCalculator } from 'react-icons/ai'
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
            <AiFillCalculator onClick={toggleClass}/>
            <br/>
            <span className={view ? 'analysis-info-hidden': 'analysis-info'}>
              test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>
              test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>
              test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>
              test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>test<br/>
            </span>
          </span>
        </div>
      </div>
    </>
  )
}

export default Analysis