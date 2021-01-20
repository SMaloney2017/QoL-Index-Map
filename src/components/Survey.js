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
      politics:0,
      scenery:0,
      safety:0,
      lifestyle:0
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
                  With permission to use your location,
                  <br/>
                  you can contribute to our custom database!
                  <br/>
                </div>
              </div>
              <form className='survey-items' onSubmit={this.handleSubmit}>
                <div className='survey-subtext'>(Lat, Lng): {this.state.lat}, {this.state.lng}</div>
                <br/>
                <div className="survey-text">Rate Overall: {this.state.overall}</div>
                <input type="button" id="overall" name="overall" value="0" onClick={this.handleChange} />
                <input type="button" id="overall" name="overall" value="1" onClick={this.handleChange} />
                <input type="button" id="overall" name="overall" value="2" onClick={this.handleChange} />
                <input type="button" id="overall" name="overall" value="3" onClick={this.handleChange} />
                <input type="button" id="overall" name="overall" value="4" onClick={this.handleChange} />
                <input type="button" id="overall" name="overall" value="5" onClick={this.handleChange} />
                <input type="button" id="overall" name="overall" value="6" onClick={this.handleChange} />
                <br/>
                <div className="survey-text">Rate Politics: {this.state.politics}</div>
                <input type="button" id="politics" name="politics" value="0" onClick={this.handleChange} />
                <input type="button" id="politics" name="politics" value="1" onClick={this.handleChange} />
                <input type="button" id="politics" name="politics" value="2" onClick={this.handleChange} />
                <input type="button" id="politics" name="politics" value="3" onClick={this.handleChange} />
                <input type="button" id="politics" name="politics" value="4" onClick={this.handleChange} />
                <input type="button" id="politics" name="politics" value="5" onClick={this.handleChange} />
                <input type="button" id="politics" name="politics" value="6" onClick={this.handleChange} />
                <br/>
                <div className="survey-text">Rate Scenery: {this.state.scenery}</div>
                <input type="button" id="scenery" name="scenery" value="0" onClick={this.handleChange} />
                <input type="button" id="scenery" name="scenery" value="1" onClick={this.handleChange} />
                <input type="button" id="scenery" name="scenery" value="2" onClick={this.handleChange} />
                <input type="button" id="scenery" name="scenery" value="3" onClick={this.handleChange} />
                <input type="button" id="scenery" name="scenery" value="4" onClick={this.handleChange} />
                <input type="button" id="scenery" name="scenery" value="5" onClick={this.handleChange} />
                <input type="button" id="scenery" name="scenery" value="6" onClick={this.handleChange} />
                <br/>
                <div className="survey-text">Rate Safety: {this.state.safety}</div>
                <input type="button" id="safety" name="safety" value="0" onClick={this.handleChange} />
                <input type="button" id="safety" name="safety" value="1" onClick={this.handleChange} />
                <input type="button" id="safety" name="safety" value="2" onClick={this.handleChange} />
                <input type="button" id="safety" name="safety" value="3" onClick={this.handleChange} />
                <input type="button" id="safety" name="safety" value="4" onClick={this.handleChange} />
                <input type="button" id="safety" name="safety" value="5" onClick={this.handleChange} />
                <input type="button" id="safety" name="safety" value="6" onClick={this.handleChange} />
                <br/>
                <div className="survey-text">Rate Lifestyle: {this.state.lifestyle}</div>
                <input type="button" id="lifestyle" name="lifestyle" value="0" onClick={this.handleChange} />
                <input type="button" id="lifestyle" name="lifestyle" value="1" onClick={this.handleChange} />
                <input type="button" id="lifestyle" name="lifestyle" value="2" onClick={this.handleChange} />
                <input type="button" id="lifestyle" name="lifestyle" value="3" onClick={this.handleChange} />
                <input type="button" id="lifestyle" name="lifestyle" value="4" onClick={this.handleChange} />
                <input type="button" id="lifestyle" name="lifestyle" value="5" onClick={this.handleChange} />
                <input type="button" id="lifestyle" name="lifestyle" value="6" onClick={this.handleChange} />
                <br/><br/>
                <input type='submit'/>
              </form>
            </ul>
          </div>
        </>
      );
    }
  }

export default Survey;