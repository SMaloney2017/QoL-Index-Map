import React from 'react';
import './App.css';
import Survey from './components/Survey'
import Toolbar from './components/Toolbar'
import Display from './components/Display'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      r_COORDS:[0, 0],
      r_ov:[0, 6],
      r_gov:[0, 6],
      r_ind:[0, 6],
      r_sce:[0, 6],
      r_saf:[0, 6],
      r_soc:[0, 6],
      r_c:[0, 6],
      s_COORDS:[26.8, -80.4]
    }
  }

  changeColor(color) {
    document.body.style.backgroundColor = color;
  }

  render() {
    const COORDS = this.state.s_COORDS
    console.log(COORDS)
    return (
      <>
        <div className='header-bar' >
          <Toolbar /><Survey dataFromParent = {COORDS}/>
          <header className = 'header-text'>Quality of Life Map.</header>
          <div className='sub-header'>
            A tool for creating and analyzing a database of user perspectives around the world.
            <br/>Built with React.js, Node.js, PostgreSQL, and Google Maps.
          </div>
          <div className = 'button-container'>
            <button onClick = {() => this.changeColor('#6085ff')} className = 'header-buttons' style = {{backgroundColor: '#6085ff70'}}>
              <span className='header-buttons-front' style = {{backgroundColor: '#6085ff'}}></span>
            </button>
            <button onClick = {() => this.changeColor('#ff6060')} className = 'header-buttons' style = {{backgroundColor: '#ff606070'}}>
              <span className='header-buttons-front' style = {{backgroundColor: '#ff6060'}}></span>
            </button>
            <button onClick = {() => this.changeColor('#00ff95')} className = 'header-buttons' style = {{backgroundColor: '#00ff9570'}}>
              <span className='header-buttons-front' style = {{backgroundColor: '#00ff95'}}></span>
            </button>
            <button onClick = {() => this.changeColor('#575757')} className = 'header-buttons' style = {{backgroundColor: '#ffffff70'}}>
              <span className='header-buttons-front-bw' style = {{backgroundColor: '#ffffff'}}></span>
            </button>
          </div>
        </div>
        <Display />
      </>
    );
  }
}

export default App;