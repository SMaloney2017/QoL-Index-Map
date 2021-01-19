import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import RangeSlider from'../sliders/RangeSlider.jsx';
import Button from '@material-ui/core/Button';
import './Toolbar.css';


function Toolbar() {
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className='toolbar'>
        <div to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={toggleSidebar} />
        </div>
      </div>

      <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
          <div className='navbar-toggle'>
            <div className='menu-bars'>
              <AiIcons.AiOutlineClose onClick={toggleSidebar}/>
            </div>
            <div style={{color: 'white', padding: "0 20px 0 0"}}>
              Here you create a custom query to run through our database.
              <br />
              1.  Specify the range of values you wish to be considered.
              <br />
              2.  Select the data point you want to display
              <br />
              3.  Press run!
            </div>
          </div>
          <div className="nav-text">Overall</div>
          <RangeSlider />
          <div className="nav-text">Politics</div>
          <RangeSlider />
          <div className="nav-text">Scenery</div>
          <RangeSlider />
          <div className="nav-text">Safety</div>
          <RangeSlider />
          <div className="nav-text">Lifestyle</div>
          <RangeSlider />
          <Button variant="contained" disableElevation>Run!</Button>
        </ul>
      </div>
    </>
  );
  
}

export default Toolbar;