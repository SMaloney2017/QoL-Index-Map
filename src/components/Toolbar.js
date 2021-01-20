import React from 'react';
import './Toolbar.css';
import { BsTools } from "react-icons/bs";
import { AiOutlineClose} from 'react-icons/ai';

class Toolbar extends React.Component {

    constructor() {
    super();

    this.state = {
      active: false,
      userlat:0, userlng:0,
      overallmin:0, overallmax:0,
      politicsmin:0, politicsmax:0,
      scenerymin:0, scenerymax:0,
      lifestylemin:0, lifestylemax:0,
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

    handleChange = (e) => {
     this.setState({
       [e.target.name]: e.target.value
     })
    }

    handleSubmit(event) {
      alert("Submitted");
      /*
      Here we'll have to find a way
      to take the values stored in the current
      state and insert them into the database
      */
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
              </div>
            </ul>
          </div>
        </>
      );
    }
}

export default Toolbar;