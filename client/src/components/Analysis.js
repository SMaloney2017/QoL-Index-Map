import React, { useState } from 'react'
import { AiFillCalculator } from "react-icons/ai"
import './Analysis.css'

function Analysis(props) {
  const [view, setView] = useState(false);
  return (
    <>
      <div className='analysis-container'>
            <button className='analysis-close'>
              <span className='analysis-close-front'>
                <AiFillCalculator onClick={() => setView(view)}/>
              </span>
            </button>
      </div>
    </>
  )
}

export default Analysis