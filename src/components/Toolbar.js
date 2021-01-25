import React from 'react';
import './Toolbar.css';
import { BsTools } from "react-icons/bs";
import { AiOutlineClose } from 'react-icons/ai';
import Slider from '@material-ui/core/Slider';

class Toolbar extends React.Component {
    constructor() {
    super();

    this.state = {
      active: false,
      test:0,
      userlat:0, userlng:0,
      overall: [0, 6],
      government: [0, 6],
      industry: [0, 6],
      scenery: [0, 6],
      safety: [0, 6],
      social: [0, 6],
      cost: [0, 6],
      timestamp: 0,
      dataVisable: "overall"
      };
      this.onChangeValue = this.onChangeValue.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleView = () => {
      this.setState({active: !this.state.active})
      console.log(this.state.active);
    }

    toggleOff = () => {
      this.setState({active: false})
      console.log(this.state.active);
    }

    onChangeValue(e) {
      this.setState({
        selectedOption: e.target.value
      });
      console.log(e.target.value);
    }

    valueText(value) {
      return `${value}`;
    }

    handleChange = name => (e, value) => {
      this.setState({
        [name]: value
      });
    }

    handleSubmit(event) {
      /*
      Here we'll have to find a way
      to take the values stored in the current
      state and insert them into the database
      */
      event.preventDefault();
    }


    componentDidMount() {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude + " " + position.coords.longitude);
        this.setState({lat: position.coords.latitude, lng: position.coords.longitude});
      });
    }

    render() {
      const { 
        overall,
        government,
        industry,
        scenery,
        safety,
        social,
        cost 
      } = this.state;
        
      return (
        
        <>
          <div className='toolbar'>
            <div className='toolbar-icon'>
              <BsTools onClick={this.toggleView} />
            </div>
          </div>
          <div className={this.state.active ? 'toolbar-menu active' : 'toolbar-menu'}>
            <ul className='toolbar-menu-items'>
              <div>
                <div className='toolbar-close'>
                  <AiOutlineClose onClick={this.toggleOff}/>
                </div>
                <form onSubmit={this.handleSubmit} >
                  <div className='toolbar-text'>data visable:</div>
                  <div className='toolbar-subtext'>
                    <div><input type="radio" onChange={this.onChangeValue} value="overall" name="overall" checked={this.state.selectedOption === "overall" }/>overall</div>
                    <div><input type="radio" onChange={this.onChangeValue} value="government" name="government" checked={this.state.selectedOption === "government"}/>government</div>
                    <div><input type="radio" onChange={this.onChangeValue} value="industry" name="industry" checked={this.state.selectedOption === "industry"}/>industry</div>
                    <div><input type="radio" onChange={this.onChangeValue} value="scenery" name="scenery" checked={this.state.selectedOption === "scenery"}/>scenery</div>
                    <div><input type="radio" onChange={this.onChangeValue} value="safety" name="safety" checked={this.state.selectedOption === "safety"}/>safety</div>
                    <div><input type="radio" onChange={this.onChangeValue} value="social" name="social" checked={this.state.selectedOption === "social"}/>social</div>
                    <div><input type="radio" onChange={this.onChangeValue} value="cost" name="cost" checked={this.state.selectedOption === "cost"}/>cost</div>
                  </div>
                  <div className='toolbar-text'>overall range: <span style={{color: '#00ff95c5'}}>{this.state.overall[0]} - {this.state.overall[1]}</span></div>
                  <Slider
                    style={{width: '70%'}}
                    value={overall}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.handleChange('overall')}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={this.valueText}
                  />
                  <div className='toolbar-text'>government range: <span style={{color: '#00ff95c5'}}>{this.state.government[0]} - {this.state.government[1]}</span></div>
                  <Slider
                    style={{width: '70%'}}
                    value={government}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.handleChange('government')}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={this.valueText}
                  />
                  <div className='toolbar-text'>industry range: <span style={{color: '#00ff95c5'}}>{this.state.industry[0]} - {this.state.industry[1]}</span></div>
                  <Slider
                    style={{width: '70%'}}
                    value={industry}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.handleChange('industry')}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={this.valueText}
                  />
                  <div className='toolbar-text'>scenery range: <span style={{color: '#00ff95c5'}}>{this.state.scenery[0]} - {this.state.scenery[1]}</span></div>
                  <Slider
                    style={{width: '70%'}}
                    value={scenery}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.handleChange('scenery')}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={this.valueText}
                  />
                  <div className='toolbar-text'>safety range: <span style={{color: '#00ff95c5'}}>{this.state.safety[0]} - {this.state.safety[1]}</span></div>
                  <Slider
                    style={{width: '70%'}}
                    value={safety}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.handleChange('safety')}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={this.valueText}
                  />
                  <div className='toolbar-text'>social range: <span style={{color: '#00ff95c5'}}>{this.state.social[0]} - {this.state.social[1]}</span></div>
                  <Slider
                    style={{width: '70%'}}
                    value={social}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.handleChange('social')}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={this.valueText}
                  />
                  <div className='toolbar-text'>cost range: <span style={{color: '#00ff95c5'}}>{this.state.cost[0]} - {this.state.cost[1]}</span></div>
                  <Slider
                    style={{width: '70%'}}
                    value={cost}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.handleChange('cost')}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={this.valueText}
                  />
                  <br/>
                  <input className='toolbar-submit' type='submit' onClick={this.toggleOff}/>
                </form>
              </div>
            </ul>
          </div>
        </>
      );
    }
}

export default Toolbar;