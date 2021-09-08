import React from 'react';
import './App.css';
import Survey from './components/Survey'
import Toolbar from './components/Toolbar'
import Display from './components/Display'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      r_ov:[0, 6],
      r_gov:[0, 6],
      r_ind:[0, 6],
      r_sce:[0, 6],
      r_saf:[0, 6],
      r_soc:[0, 6],
      r_c:[0, 6],
      COORDS:[26.8, -80.4]
    }
    this.updateCenter = this.updateCenter.bind(this)
  }

  changeColor(color) {
    document.body.style.backgroundColor = color;
  }

  handleCallback = (ov, gov, ind, sce, saf, soc, c) => {
    this.setState({r_ov:ov, r_gov:gov, r_ind:ind, r_sce:sce, r_saf:saf, r_soc:soc, r_c:c}, () => {
      console.log("App.js (handleCallback) - ", this.state)
    })
  }

  updateCenter = (newCenter) => {
    this.setState({COORDS:newCenter}, () => {
      console.log("App.js (updateCenter) - ", this.state.COORDS)
    })
  }

  render() {
    const COORDS = this.state.COORDS
    return (
      <>
        <div className='header-bar' >
          <Toolbar parentCallback = {this.handleCallback}/> <Survey dataFromParent = {COORDS}/>
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
        <Display indexval = {this.state.COORDS.index} updateCenter = {this.updateCenter} />
      </>
    );
  }
}

export default App;