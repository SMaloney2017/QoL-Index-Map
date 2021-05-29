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
            <ul>
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
                    <button className='survey-buttons' style={{background: '#ff292980'}} name='overall' value='0' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ff2929'}} name='overall' value='0' onClick={this.setValue}>
                        0
                      </button>
                    </button>
                    <button className='survey-buttons' style={{background: '#ff942980'}} name='overall' value='1' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ff9429'}} name='overall' value='1' onClick={this.setValue}>
                        1
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#ffff2980'}} name='overall' value='2' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ffff29'}} name='overall' value='2' onClick={this.setValue}>
                        2
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#80ff5f80'}} name='overall' value='3' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#80ff5f'}} name='overall' value='3' onClick={this.setValue}>
                        3
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#00ff9580'}} name='overall' value='4' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#00ff95'}} name='overall' value='4' onClick={this.setValue}>
                        4
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#1cccc880'}} name='overall' value='5' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#1cccc8'}} name='overall' value='5' onClick={this.setValue}>
                        5
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#3799fb80'}} name='overall' value='6' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#3799fb'}} name='overall' value='6' onClick={this.setValue}>
                        6
                      </button>
                    </button>
                  </div>
                </div>
                <br/>
                <div className='survey-category'>
                  <div className='survey-text'>government: {this.state.government}</div>
                  <div className='survey-button-container'>
                    <button className='survey-buttons' style={{background: '#ff292980'}} name='government' value='0' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ff2929'}} name='government' value='0' onClick={this.setValue}>
                        0
                      </button>
                    </button>
                    <button className='survey-buttons' style={{background: '#ff942980'}} name='government' value='1' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ff9429'}} name='government' value='1' onClick={this.setValue}>
                        1
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#ffff2980'}} name='government' value='2' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ffff29'}} name='government' value='2' onClick={this.setValue}>
                        2
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#80ff5f80'}} name='government' value='3' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#80ff5f'}} name='government' value='3' onClick={this.setValue}>
                        3
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#00ff9580'}} name='government' value='4' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#00ff95'}} name='government' value='4' onClick={this.setValue}>
                        4
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#1cccc880'}} name='government' value='5' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#1cccc8'}} name='government' value='5' onClick={this.setValue}>
                        5
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#3799fb80'}} name='government' value='6' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#3799fb'}} name='government' value='6' onClick={this.setValue}>
                        6
                      </button>
                    </button>
                  </div>
                </div>
                <br/>
                <div className='survey-category'>
                  <div className='survey-text'>industry: {this.state.industry}</div>
                  <div className='survey-button-container'>
                    <button className='survey-buttons' style={{background: '#ff292980'}} name='industry' value='0' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ff2929'}} name='industry' value='0' onClick={this.setValue}>
                        0
                      </button>
                    </button>
                    <button className='survey-buttons' style={{background: '#ff942980'}} name='industry' value='1' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ff9429'}} name='industry' value='1' onClick={this.setValue}>
                        1
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#ffff2980'}} name='industry' value='2' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ffff29'}} name='industry' value='2' onClick={this.setValue}>
                        2
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#80ff5f80'}} name='industry' value='3' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#80ff5f'}} name='industry' value='3' onClick={this.setValue}>
                        3
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#00ff9580'}} name='industry' value='4' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#00ff95'}} name='industry' value='4' onClick={this.setValue}>
                        4
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#1cccc880'}} name='industry' value='5' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#1cccc8'}} name='industry' value='5' onClick={this.setValue}>
                        5
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#3799fb80'}} name='industry' value='6' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#3799fb'}} name='industry' value='6' onClick={this.setValue}>
                        6
                      </button>
                    </button>
                  </div>
                </div>
                <br/>
                <div className='survey-category'>
                  <div className='survey-text'>scenery: {this.state.scenery}</div>
                  <div className='survey-button-container'>
                    <button className='survey-buttons' style={{background: '#ff292980'}} name='scenery' value='0' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ff2929'}} name='scenery' value='0' onClick={this.setValue}>
                        0
                      </button>
                    </button>
                    <button className='survey-buttons' style={{background: '#ff942980'}} name='scenery' value='1' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ff9429'}} name='scenery' value='1' onClick={this.setValue}>
                        1
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#ffff2980'}} name='scenery' value='2' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ffff29'}} name='scenery' value='2' onClick={this.setValue}>
                        2
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#80ff5f80'}} name='scenery' value='3' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#80ff5f'}} name='scenery' value='3' onClick={this.setValue}>
                        3
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#00ff9580'}} name='scenery' value='4' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#00ff95'}} name='scenery' value='4' onClick={this.setValue}>
                        4
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#1cccc880'}} name='scenery' value='5' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#1cccc8'}} name='scenery' value='5' onClick={this.setValue}>
                        5
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#3799fb80'}} name='scenery' value='6' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#3799fb'}} name='scenery' value='6' onClick={this.setValue}>
                        6
                      </button>
                    </button>
                  </div>
                </div>
                <br/>
                <div className='survey-category'>
                  <div className='survey-text'>safety: {this.state.safety}</div>
                  <div className='survey-button-container'>
                    <button className='survey-buttons' style={{background: '#ff292980'}} name='safety' value='0' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ff2929'}} name='safety' value='0' onClick={this.setValue}>
                        0
                      </button>
                    </button>
                    <button className='survey-buttons' style={{background: '#ff942980'}} name='safety' value='1' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ff9429'}} name='safety' value='1' onClick={this.setValue}>
                        1
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#ffff2980'}} name='safety' value='2' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ffff29'}} name='safety' value='2' onClick={this.setValue}>
                        2
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#80ff5f80'}} name='safety' value='3' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#80ff5f'}} name='safety' value='3' onClick={this.setValue}>
                        3
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#00ff9580'}} name='safety' value='4' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#00ff95'}} name='safety' value='4' onClick={this.setValue}>
                        4
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#1cccc880'}} name='safety' value='5' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#1cccc8'}} name='safety' value='5' onClick={this.setValue}>
                        5
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#3799fb80'}} name='safety' value='6' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#3799fb'}} name='safety' value='6' onClick={this.setValue}>
                        6
                      </button>
                    </button>
                  </div>
                </div>
                <br/>
                <div className='survey-category'>
                  <div className='survey-text'>social: {this.state.social}</div>
                  <div className='survey-button-container'>
                    <button className='survey-buttons' style={{background: '#ff292980'}} name='social' value='0' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ff2929'}} name='social' value='0' onClick={this.setValue}>
                        0
                      </button>
                    </button>
                    <button className='survey-buttons' style={{background: '#ff942980'}} name='social' value='1' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ff9429'}} name='social' value='1' onClick={this.setValue}>
                        1
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#ffff2980'}} name='social' value='2' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ffff29'}} name='social' value='2' onClick={this.setValue}>
                        2
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#80ff5f80'}} name='social' value='3' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#80ff5f'}} name='social' value='3' onClick={this.setValue}>
                        3
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#00ff9580'}} name='social' value='4' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#00ff95'}} name='social' value='4' onClick={this.setValue}>
                        4
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#1cccc880'}} name='social' value='5' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#1cccc8'}} name='social' value='5' onClick={this.setValue}>
                        5
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#3799fb80'}} name='social' value='6' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#3799fb'}} name='social' value='6' onClick={this.setValue}>
                        6
                      </button>
                    </button>
                  </div>
                </div>
                <br/>
                <div className='survey-category'>
                  <div className='survey-text'>cost of living: {this.state.cost}</div>
                  <div className='survey-button-container'>
                    <button className='survey-buttons' style={{background: '#ff292980'}} name='cost' value='0' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ff2929'}} name='cost' value='0' onClick={this.setValue}>
                        0
                      </button>
                    </button>
                    <button className='survey-buttons' style={{background: '#ff942980'}} name='cost' value='1' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ff9429'}} name='cost' value='1' onClick={this.setValue}>
                        1
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#ffff2980'}} name='cost' value='2' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#ffff29'}} name='cost' value='2' onClick={this.setValue}>
                        2
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#80ff5f80'}} name='cost' value='3' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#80ff5f'}} name='cost' value='3' onClick={this.setValue}>
                        3
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#00ff9580'}} name='cost' value='4' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#00ff95'}} name='cost' value='4' onClick={this.setValue}>
                        4
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#1cccc880'}} name='cost' value='5' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#1cccc8'}} name='cost' value='5' onClick={this.setValue}>
                        5
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#3799fb80'}} name='cost' value='6' onClick={this.setValue}>
                      <button className='survey-buttons-front' style={{background: '#3799fb'}} name='cost' value='6' onClick={this.setValue}>
                        6
                      </button>
                    </button>
                  </div>
                </div>
                <br/>
                <button className='survey-submit' type='submit' onClick={this.toggleOff}>
                  <span class="survey-submit-front">
                    Submit
                  </span>
                </button>
                <br/>
              </form>            
              <p className='image-link'><a href='http://www.freepik.com' target='_blank' rel='noopener noreferrer'> Background image designed by macrovector / Freepik </a> </p>

            </ul>
          </div>
        </>
      )
    }
  }

export default Survey