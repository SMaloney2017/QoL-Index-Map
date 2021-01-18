import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
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

      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
          <li className='navbar-toggle'>
            <div className='menu-bars'>
              <AiIcons.AiOutlineClose onClick={toggleSidebar}/>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
  
}

export default Toolbar;