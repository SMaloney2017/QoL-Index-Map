import React, { useState } from 'react'
import './App.css'
import Survey from './components/Survey'
import Toolbar from './components/Toolbar'
import Display from './components/Display'
import Analysis from './components/Analysis'

function App() {
  const [getData, shareData] = useState([])

  function changeColor(color) {
    document.body.style.backgroundColor = color;
  }
  
  return (
    <>
      <div className='header-bar' >
        <Toolbar shareData={shareData}/> <Survey/>
        <header className = 'header-text'>Quality of Life Map.</header>
        <div className='sub-header'>
          A tool for creating and analyzing a database of user perspectives around the world.
          <br/>Built with React.js, Node.js, PostgreSQL, and Google Maps.
        </div>
        <div className = 'button-container'>
          <button onClick = {() => changeColor('#6085ff')} className = 'header-buttons' style = {{backgroundColor: '#6085ff70'}}>
            <span className='header-buttons-front' style = {{backgroundColor: '#6085ff'}}></span>
          </button>
          <button onClick = {() => changeColor('#ff6060')} className = 'header-buttons' style = {{backgroundColor: '#ff606070'}}>
            <span className='header-buttons-front' style = {{backgroundColor: '#ff6060'}}></span>
          </button>
          <button onClick = {() => changeColor('#00ff95')} className = 'header-buttons' style = {{backgroundColor: '#00ff9570'}}>
            <span className='header-buttons-front' style = {{backgroundColor: '#00ff95'}}></span>
          </button>
          <button onClick = {() => changeColor('#575757')} className = 'header-buttons' style = {{backgroundColor: '#ffffff70'}}>
            <span className='header-buttons-front-bw' style = {{backgroundColor: '#ffffff'}}></span>
          </button>
        </div>
      </div>
      <Display getData={getData}/>
      <Analysis/>
    </>
  );
}

export default App;