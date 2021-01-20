import React from 'react';
import './App.css';
import Survey from './components/Survey'
import Toolbar from './components/Toolbar'

function App() {
  return (
    <>
      <div className='header-bar'>
        <Toolbar /><Survey />
        <header>React Map.</header>
        <div className='sub-header'>
          Built by Kafele Wimberly and Sean Maloney using React.js, Node.js, MySQL, and Google Maps</div>
      </div>
    </>
  );
}

export default App;