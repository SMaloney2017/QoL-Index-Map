import React from 'react';
import './Toolbar.css';
import { BsTools } from "react-icons/bs";
import { AiOutlineClose } from 'react-icons/ai';
import { RangeSlider, NumericInput } from "@blueprintjs/core";

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

    onChangeValue(event) {
      this.setState({
        selectedOption: event.target.value
      });
      console.log(event.target.value);
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
                  <div onChange={this.onChangeValue}>
                    <div className='toolbar-subtext'><input type="radio" value="overall" name="overall" checked={this.state.selectedOption === "overall"}/>overall</div>
                    <div className='toolbar-subtext'><input type="radio" value="government" name="government" checked={this.state.selectedOption === "government"}/>government</div>
                    <div className='toolbar-subtext'><input type="radio" value="industry" name="industry" checked={this.state.selectedOption === "industry"}/>industry</div>
                    <div className='toolbar-subtext'><input type="radio" value="scenery" name="scenery" checked={this.state.selectedOption === "scenery"}/>scenery</div>
                    <div className='toolbar-subtext'><input type="radio" value="safety" name="safety" checked={this.state.selectedOption === "safety"}/>safety</div>
                    <div className='toolbar-subtext'><input type="radio" value="social" name="social" checked={this.state.selectedOption === "social"}/>social</div>
                    <div className='toolbar-subtext'><input type="radio" value="cost" name="cost" checked={this.state.selectedOption === "cost"}/>cost</div>
                  </div>
                  <div className='toolbar-text'>overall range:</div>

                  <div className='toolbar-text'>government range:</div>

                  <div className='toolbar-text'>industry range:</div>

                  <div className='toolbar-text'>scenery range:</div>

                  <div className='toolbar-text'>safety range:</div>

                  <div className='toolbar-text'>social range:</div>

                  <div className='toolbar-text'>cost range:</div>

                  {/*
                    Add some interface to specify query.
                  */}
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