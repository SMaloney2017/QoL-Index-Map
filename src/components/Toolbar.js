import React from 'react';
import './Toolbar.css';
import { BsTools } from "react-icons/bs";
import { AiOutlineClose } from 'react-icons/ai';

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
      timestamp: 0
      };

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
                <form onSubmit={this.handleSubmit}>
                  <br/>
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