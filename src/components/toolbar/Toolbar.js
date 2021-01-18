import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Toolbar.css';

function Toolbar() {
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className='toolbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={toggleSidebar} />
        </Link>
      </div>

      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
          <li className='navbar-toggle'>
            <Link to='#' className='menu-bars'>
              <AiIcons.AiOutlineClose onClick={toggleSidebar}/>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
  
}

export default Toolbar;