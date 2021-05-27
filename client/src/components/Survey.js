import React from 'react'
import { AiOutlineCloseCircle, AiOutlineForm } from 'react-icons/ai'
import './Survey.css'
class Survey extends React.Component {

    constructor() {
      super()

      this.state = {
        active: false,
        id:0,
        timestamp:0,
        lat:0,
        lng:0,
        overall:0,
        government:0,
        industry:0,
        scenery:0,
        safety:0,
        social:0,
        cost:0
      }

      this.handleSubmit = this.handleSubmit.bind(this)
    }

    toggleView = () => {
      this.setState({active: !this.state.active})
      console.log(this.state.active)
    }

    toggleOff = () => {
      this.setState({active: false})
      console.log(this.state.active)
    }

    setValue = (e) => {
     this.setState({
       [e.target.name]: parseInt(e.target.value)
     })
    }

    handleSubmit = async (event) => {
      event.preventDefault()
      try {
        const data = { overall_score:this.state.overall, government_score:this.state.government, industry_score:this.state.industry, scenery_score:this.state.scenery, safeness_score:this.state.safety, social_score:this.state.social, cost_score:this.state.cost, lat:this.state.lat.toFixed(1) , lon:this.state.lng.toFixed(1)}
        const response = await fetch('http://localhost:5000/newdata', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        console.log(response)
      } catch (error) {
        console.log(error.message)
      }
    }

    componentDidMount() {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude + ' ' + position.coords.longitude)
        this.setState({lat: position.coords.latitude, lng: position.coords.longitude})
      })
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
                <button className='survey-close'>
                  <span className='survey-close-front'>
                    <AiOutlineCloseCircle onClick={this.toggleOff}/>
                  </span>
                </button>
                <div className='survey-subtext'>
                  You can contribute to our database
                  by letting us know how you currently feel about 
                  these topics in your area!<br/>
                  Coordinate percision is accurate to 10km, or about the size of a city.<br/>
                </div>
              </div>
              <form className='survey-form-items' onSubmit={this.handleSubmit}>
              <div className='survey-subtext'>(Lat, Lng): {this.state.lat.toFixed(1)}, {this.state.lng.toFixed(1)}</div>
                <div className='survey-category'>
                    <div className='survey-text'>overall: {this.state.overall}</div>
                    <div className='survey-button-container'>
                      <input className='survey-buttons' style={{background: '#FF4800E0'}} type='button' id='overall' name='overall' value='0' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FF6D00E0'}} type='button' id='overall' name='overall' value='1' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FF9E00E0'}} type='button' id='overall' name='overall' value='2' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FFFF3FE0'}} type='button' id='overall' name='overall' value='3' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#BFD200E0'}} type='button' id='overall' name='overall' value='4' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#55A630E0'}} type='button' id='overall' name='overall' value='5' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#007F5FE0'}} type='button' id='overall' name='overall' value='6' onClick={this.setValue} />
                    </div>
                </div>
                <br/>
                <div className='survey-category'>
                  <div className='survey-text'>government: {this.state.government}</div>
                  <div className='survey-button-container'>
                      <input className='survey-buttons' style={{background: '#FF4800E0'}} type='button' id='government' name='government' value='0' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FF6D00E0'}} type='button' id='government' name='government' value='1' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FF9E00E0'}} type='button' id='government' name='government' value='2' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FFFF3FE0'}} type='button' id='government' name='government' value='3' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#BFD200E0'}} type='button' id='government' name='government' value='4' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#55A630E0'}} type='button' id='government' name='government' value='5' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#007F5FE0'}} type='button' id='government' name='government' value='6' onClick={this.setValue} />
                  </div>
                </div>
                <br/>
                <div className='survey-category'>
                  <div className='survey-text'>industry: {this.state.industry}</div>
                  <div className='survey-button-container'>
                      <input className='survey-buttons' style={{background: '#FF4800E0'}} type='button' id='industry' name='industry' value='0' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FF6D00E0'}} type='button' id='industry' name='industry' value='1' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FF9E00E0'}} type='button' id='industry' name='industry' value='2' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FFFF3FE0'}} type='button' id='industry' name='industry' value='3' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#BFD200E0'}} type='button' id='industry' name='industry' value='4' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#55A630E0'}} type='button' id='industry' name='industry' value='5' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#007F5FE0'}} type='button' id='industry' name='industry' value='6' onClick={this.setValue} />
                  </div>
                </div>
                <br/>
                <div className='survey-category'>
                  <div className='survey-text'>scenery: {this.state.scenery}</div>
                  <div className='survey-button-container'>
                      <input className='survey-buttons' style={{background: '#FF4800E0'}} type='button' id='scenery' name='scenery' value='0' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FF6D00E0'}} type='button' id='scenery' name='scenery' value='1' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FF9E00E0'}} type='button' id='scenery' name='scenery' value='2' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FFFF3FE0'}} type='button' id='scenery' name='scenery' value='3' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#BFD200E0'}} type='button' id='scenery' name='scenery' value='4' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#55A630E0'}} type='button' id='scenery' name='scenery' value='5' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#007F5FE0'}} type='button' id='scenery' name='scenery' value='6' onClick={this.setValue} />
                  </div>
                </div>
                <br/>
                <div className='survey-category'>
                  <div className='survey-text'>safety: {this.state.safety}</div>
                  <div className='survey-button-container'>
                      <input className='survey-buttons' style={{background: '#FF4800E0'}} type='button' id='safety' name='safety' value='0' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FF6D00E0'}} type='button' id='safety' name='safety' value='1' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FF9E00E0'}} type='button' id='safety' name='safety' value='2' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FFFF3FE0'}} type='button' id='safety' name='safety' value='3' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#BFD200E0'}} type='button' id='safety' name='safety' value='4' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#55A630E0'}} type='button' id='safety' name='safety' value='5' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#007F5FE0'}} type='button' id='safety' name='safety' value='6' onClick={this.setValue} />
                  </div>
                </div>
                <br/>
                <div className='survey-category'>
                  <div className='survey-text'>social: {this.state.social}</div>
                  <div className='survey-button-container'>
                      <input className='survey-buttons' style={{background: '#FF4800E0'}} type='button' id='social' name='social' value='0' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FF6D00E0'}} type='button' id='social' name='social' value='1' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FF9E00E0'}} type='button' id='social' name='social' value='2' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FFFF3FE0'}} type='button' id='social' name='social' value='3' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#BFD200E0'}} type='button' id='social' name='social' value='4' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#55A630E0'}} type='button' id='social' name='social' value='5' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#007F5FE0'}} type='button' id='social' name='social' value='6' onClick={this.setValue} />
                  </div>
                </div>
                <br/>
                <div className='survey-category'>
                  <div className='survey-text'>cost of living: {this.state.cost}</div>
                  <div className='survey-button-container'>
                      <input className='survey-buttons' style={{background: '#FF4800E0'}} type='button' id='cost' name='cost' value='0' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FF6D00E0'}} type='button' id='cost' name='cost' value='1' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FF9E00E0'}} type='button' id='cost' name='cost' value='2' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#FFFF3FE0'}} type='button' id='cost' name='cost' value='3' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#BFD200E0'}} type='button' id='cost' name='cost' value='4' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#55A630E0'}} type='button' id='cost' name='cost' value='5' onClick={this.setValue} />
                      <input className='survey-buttons' style={{background: '#007F5FE0'}} type='button' id='cost' name='cost' value='6' onClick={this.setValue} />
                  </div>
                </div>
                <br/>
                <button className='survey-submit' type='submit' onClick={this.toggleOff}>
                  <span class="survey-submit-front">
                    Submit
                  </span>
                </button>
              </form>
            </ul>
          </div>
        </>
      )
    }
  }

export default Survey