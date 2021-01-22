import React from 'react';
import { AiOutlineClose, AiOutlineForm } from 'react-icons/ai';
import './Survey.css'
class Survey extends React.Component {

    constructor() {
    super();

    this.state = {
      active: false,
      id: 0,
      timestamp: 0,
      lat:0,
      lng:0,
      overall:0,
      government:0,
      industry:0,
      scenery:0,
      safety:0,
      social:0,
      cost:0
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
          <div className='survey'>
            <div className='survey-icon'>
              <AiOutlineForm onClick={this.toggleView} />
            </div>
          </div>
  
          <div className={this.state.active ? 'survey-form active' : 'survey-form'}>
            <ul className='survey-form-items'>
              <div>
                <div className='survey-close'>
                  <AiOutlineClose onClick={this.toggleOff}/>
                </div>
                <div className='survey-subtext'>
                  You can contribute to our database
                  <br/>
                  by letting us know how you feel about
                  <br/>
                  these topics in your area!
                  <br/>
                </div>
              </div>
              <form className='survey-form-items' onSubmit={this.handleSubmit}>
                <div className='survey-subtext'>(Lat, Lng): {this.state.lat.toFixed(7)}, {this.state.lng.toFixed(7)}</div>
                <div className="survey-category">
                  <div className='survey-text'>overall: {this.state.overall}</div>
                    <div className='button-holder'>
                      <input className='survey-buttons' type="button" id="overall" name="overall" value="0" onClick={this.handleChange} />
                      <input className='survey-buttons' type="button" id="overall" name="overall" value="1" onClick={this.handleChange} />
                      <input className='survey-buttons' type="button" id="overall" name="overall" value="2" onClick={this.handleChange} />
                      <input className='survey-buttons' type="button" id="overall" name="overall" value="3" onClick={this.handleChange} />
                      <input className='survey-buttons' type="button" id="overall" name="overall" value="4" onClick={this.handleChange} />
                      <input className='survey-buttons' type="button" id="overall" name="overall" value="5" onClick={this.handleChange} />
                      <input className='survey-buttons' type="button" id="overall" name="overall" value="6" onClick={this.handleChange} />
                    </div>
                  </div>
                <br/>
                <div className="survey-category">
                  <div className='survey-text'>government: {this.state.government}</div>
                  <div className='button-holder'>
                    <input className='survey-buttons' type="button" id="government" name="government" value="0" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="government" name="government" value="1" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="government" name="government" value="2" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="government" name="government" value="3" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="government" name="government" value="4" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="government" name="government" value="5" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="government" name="government" value="6" onClick={this.handleChange} />
                  </div>
                </div>
                <br/>
                <div className="survey-category">
                  <div className='survey-text'>industry: {this.state.industry}</div>
                  <div className='button-holder'>
                    <input className='survey-buttons' type="button" id="industry" name="industry" value="0" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="industry" name="industry" value="1" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="industry" name="industry" value="2" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="industry" name="industry" value="3" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="industry" name="industry" value="4" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="industry" name="industry" value="5" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="industry" name="industry" value="6" onClick={this.handleChange} />
                  </div>
                </div>
                <br/>
                <div className="survey-category">
                  <div className='survey-text'>scenery: {this.state.scenery}</div>
                  <div className='button-holder'>
                    <input className='survey-buttons' type="button" id="scenery" name="scenery" value="0" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="scenery" name="scenery" value="1" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="scenery" name="scenery" value="2" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="scenery" name="scenery" value="3" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="scenery" name="scenery" value="4" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="scenery" name="scenery" value="5" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="scenery" name="scenery" value="6" onClick={this.handleChange} />
                  </div>
                </div>
                <br/>
                <div className="survey-category">
                  <div className='survey-text'>safety: {this.state.safety}</div>
                  <div className='button-holder'>
                    <input className='survey-buttons' type="button" id="safety" name="safety" value="0" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="safety" name="safety" value="1" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="safety" name="safety" value="2" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="safety" name="safety" value="3" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="safety" name="safety" value="4" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="safety" name="safety" value="5" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="safety" name="safety" value="6" onClick={this.handleChange} />
                  </div>
                </div>
                <br/>
                <div className="survey-category">
                  <div className='survey-text'>social: {this.state.social}</div>
                  <div className='button-holder'>
                    <input className='survey-buttons' type="button" id="social" name="social" value="0" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="social" name="social" value="1" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="social" name="social" value="2" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="social" name="social" value="3" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="social" name="social" value="4" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="social" name="social" value="5" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="social" name="social" value="6" onClick={this.handleChange} />
                  </div>
                </div>
                <br/>
                <div className="survey-category">
                  <div className='survey-text'>cost: {this.state.cost}</div>
                  <div className='button-holder'>
                    <input className='survey-buttons' type="button" id="cost" name="cost" value="0" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="cost" name="cost" value="1" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="cost" name="cost" value="2" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="cost" name="cost" value="3" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="cost" name="cost" value="4" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="cost" name="cost" value="5" onClick={this.handleChange} />
                    <input className='survey-buttons' type="button" id="cost" name="cost" value="6" onClick={this.handleChange} />
                  </div>
                </div>
                <br/>
                <input className='submit-button' type='submit' onClick={this.toggleOff}/>
              </form>
            </ul>
          </div>
        </>
      );
    }
  }

export default Survey;