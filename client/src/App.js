import React from 'react';
import './App.css';
import Survey from './components/Survey'
import Toolbar from './components/Toolbar'

class App extends React.Component {

  changeColor(color) {
    document.body.style.backgroundColor = color;
  }

  render() {
    return (
      <>
        <div className='header-bar' >
          <Toolbar /><Survey />
          <header className = 'header-text'>React Map.</header>
          <div className='sub-header'>
            A tool for creating and analyzing a database of user perspectives around the world.
            <br/>Built with React.js, Node.js, PostgreSQL, and Google Maps.
          </div>
          <div className = 'button-container'>
            <button onClick = {() => this.changeColor('#6085ff')} className = 'header-buttons' style = {{backgroundColor: '#6085ff'}}></button>
            <button onClick = {() => this.changeColor('#ff6060')} className = 'header-buttons' style = {{backgroundColor: '#ff6060'}}></button>
            <button onClick = {() => this.changeColor('#00ff95')} className = 'header-buttons' style = {{backgroundColor: '#00ff95'}}></button>
          </div>
        </div>
      </>
    );
  }
}

export default App;