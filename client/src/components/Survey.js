import React from 'react'
import { AiOutlineCloseCircle, AiOutlineForm } from 'react-icons/ai'
import './Survey.css'
import Minimap from './Minimap'
class Survey extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        active:false,
        overall:0,
        government:0,
        industry:0,
        scenery:0,
        safety:0,
        social:0,
        cost:0,
        COORDS:[26.8, -80.4]
      }
      this.sendDataToDb = this.sendDataToDb.bind(this)
      this.setValue = this.setValue.bind(this)
      this.toggleView = this.toggleView.bind(this)
      this.updateCenter = this.updateCenter.bind(this)
    }

    toggleView = () => {
      this.setState({active: !this.state.active}, () => {
        console.log("Survey.js (toggleView) - ", this.state.active)
      })
    }

    setValue = (e) => {
      e.preventDefault()
      this.setState({ [e.target.name]: parseInt(e.target.value) }, () => {
        console.log("Survey.js (setValue) - ", e.target.name, e.target.value)
      })
    }
    
    sendDataToDb = async (e) => { 
      e.preventDefault(e)
      try {
        const data = { overall_score:this.state.overall, government_score:this.state.government, industry_score:this.state.industry, scenery_score:this.state.scenery, safeness_score:this.state.safety, social_score:this.state.social, cost_score:this.state.cost, lat:this.state.COORDS[0].toFixed(1), lon:this.state.COORDS[1].toFixed(1)}
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

    updateCenter = (newCenter) => {
      this.setState({COORDS:newCenter}, () => {
        console.log("Survey.js (updateCenter) - ", this.state.COORDS)
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
            <div>
              <button className='survey-close'>
                <span className='survey-close-front'>
                  <AiOutlineCloseCircle onClick={this.toggleView}/>
                </span>
              </button>
              <div className='survey-header'>Contribute</div>
              <hr size="1" width="100%" color="#552fff"/>
            </div>
            <div className='item-container'>
              <div  className='survey-map'>
                <div className='reticle'/>
                <Minimap indexval={this.state.COORDS.index} updateCenter={this.updateCenter} />
              </div>
              <form className='survey-form-items' onSubmit={this.sendDataToDb}>
                <div className='survey-category'>
                  <div className='survey-text'>overall: {this.state.overall}</div>
                  <div className='survey-button-container'>
                    <button className='survey-buttons' style={{background: '#ff292998'}}>
                      <button className='survey-buttons-front' style={{background: '#ff2929'}} name='overall' value='0' onClick={this.setValue}>
                        0
                      </button>
                    </button>
                    <button className='survey-buttons' style={{background: '#ff942998'}}>
                      <button className='survey-buttons-front' style={{background: '#ff9429'}} name='overall' value='1' onClick={this.setValue}>
                        1
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#ffff2998'}}>
                      <button className='survey-buttons-front' style={{background: '#ffff29'}} name='overall' value='2' onClick={this.setValue}>
                        2
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#80ff5f98'}}>
                      <button className='survey-buttons-front' style={{background: '#80ff5f'}} name='overall' value='3' onClick={this.setValue}>
                        3
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#00ff9598'}}>
                      <button className='survey-buttons-front' style={{background: '#00ff95'}} name='overall' value='4' onClick={this.setValue}>
                        4
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#1cccc898'}}>
                      <button className='survey-buttons-front' style={{background: '#1cccc8'}} name='overall' value='5' onClick={this.setValue}>
                        5
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#3799fb98'}}>
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
                    <button className='survey-buttons' style={{background: '#ff292998'}}>
                      <button className='survey-buttons-front' style={{background: '#ff2929'}} name='government' value='0' onClick={this.setValue}>
                        0
                      </button>
                    </button>
                    <button className='survey-buttons' style={{background: '#ff942998'}}>
                      <button className='survey-buttons-front' style={{background: '#ff9429'}} name='government' value='1' onClick={this.setValue}>
                        1
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#ffff2998'}}>
                      <button className='survey-buttons-front' style={{background: '#ffff29'}} name='government' value='2' onClick={this.setValue}>
                        2
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#80ff5f98'}}>
                      <button className='survey-buttons-front' style={{background: '#80ff5f'}} name='government' value='3' onClick={this.setValue}>
                        3
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#00ff9598'}}>
                      <button className='survey-buttons-front' style={{background: '#00ff95'}} name='government' value='4' onClick={this.setValue}>
                        4
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#1cccc898'}}>
                      <button className='survey-buttons-front' style={{background: '#1cccc8'}} name='government' value='5' onClick={this.setValue}>
                        5
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#3799fb98'}}>
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
                    <button className='survey-buttons' style={{background: '#ff292998'}}>
                      <button className='survey-buttons-front' style={{background: '#ff2929'}} name='industry' value='0' onClick={this.setValue}>
                        0
                      </button>
                    </button>
                    <button className='survey-buttons' style={{background: '#ff942998'}}>
                      <button className='survey-buttons-front' style={{background: '#ff9429'}} name='industry' value='1' onClick={this.setValue}>
                        1
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#ffff2998'}}>
                      <button className='survey-buttons-front' style={{background: '#ffff29'}} name='industry' value='2' onClick={this.setValue}>
                        2
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#80ff5f98'}}>
                      <button className='survey-buttons-front' style={{background: '#80ff5f'}} name='industry' value='3' onClick={this.setValue}>
                        3
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#00ff9598'}}>
                      <button className='survey-buttons-front' style={{background: '#00ff95'}} name='industry' value='4' onClick={this.setValue}>
                        4
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#1cccc898'}}>
                      <button className='survey-buttons-front' style={{background: '#1cccc8'}} name='industry' value='5' onClick={this.setValue}>
                        5
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#3799fb98'}}>
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
                    <button className='survey-buttons' style={{background: '#ff292998'}}>
                      <button className='survey-buttons-front' style={{background: '#ff2929'}} name='scenery' value='0' onClick={this.setValue}>
                        0
                      </button>
                    </button>
                    <button className='survey-buttons' style={{background: '#ff942998'}}>
                      <button className='survey-buttons-front' style={{background: '#ff9429'}} name='scenery' value='1' onClick={this.setValue}>
                        1
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#ffff2998'}}>
                      <button className='survey-buttons-front' style={{background: '#ffff29'}} name='scenery' value='2' onClick={this.setValue}>
                        2
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#80ff5f98'}}>
                      <button className='survey-buttons-front' style={{background: '#80ff5f'}} name='scenery' value='3' onClick={this.setValue}>
                        3
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#00ff9598'}}>
                      <button className='survey-buttons-front' style={{background: '#00ff95'}} name='scenery' value='4' onClick={this.setValue}>
                        4
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#1cccc898'}}>
                      <button className='survey-buttons-front' style={{background: '#1cccc8'}} name='scenery' value='5' onClick={this.setValue}>
                        5
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#3799fb98'}}>
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
                    <button className='survey-buttons' style={{background: '#ff292998'}}>
                      <button className='survey-buttons-front' style={{background: '#ff2929'}} name='safety' value='0' onClick={this.setValue}>
                        0
                      </button>
                    </button>
                    <button className='survey-buttons' style={{background: '#ff942998'}}>
                      <button className='survey-buttons-front' style={{background: '#ff9429'}} name='safety' value='1' onClick={this.setValue}>
                        1
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#ffff2998'}}>
                      <button className='survey-buttons-front' style={{background: '#ffff29'}} name='safety' value='2' onClick={this.setValue}>
                        2
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#80ff5f98'}}>
                      <button className='survey-buttons-front' style={{background: '#80ff5f'}} name='safety' value='3' onClick={this.setValue}>
                        3
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#00ff9598'}}>
                      <button className='survey-buttons-front' style={{background: '#00ff95'}} name='safety' value='4' onClick={this.setValue}>
                        4
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#1cccc898'}}>
                      <button className='survey-buttons-front' style={{background: '#1cccc8'}} name='safety' value='5' onClick={this.setValue}>
                        5
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#3799fb98'}}>
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
                    <button className='survey-buttons' style={{background: '#ff292998'}}>
                      <button className='survey-buttons-front' style={{background: '#ff2929'}} name='social' value='0' onClick={this.setValue}>
                        0
                      </button>
                    </button>
                    <button className='survey-buttons' style={{background: '#ff942998'}}>
                      <button className='survey-buttons-front' style={{background: '#ff9429'}} name='social' value='1' onClick={this.setValue}>
                        1
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#ffff2998'}}>
                      <button className='survey-buttons-front' style={{background: '#ffff29'}} name='social' value='2' onClick={this.setValue}>
                        2
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#80ff5f98'}}>
                      <button className='survey-buttons-front' style={{background: '#80ff5f'}} name='social' value='3' onClick={this.setValue}>
                        3
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#00ff9598'}}>
                      <button className='survey-buttons-front' style={{background: '#00ff95'}} name='social' value='4' onClick={this.setValue}>
                        4
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#1cccc898'}}>
                      <button className='survey-buttons-front' style={{background: '#1cccc8'}} name='social' value='5' onClick={this.setValue}>
                        5
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#3799fb98'}}>
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
                    <button className='survey-buttons' style={{background: '#ff292998'}}>
                      <button className='survey-buttons-front' style={{background: '#ff2929'}} name='cost' value='0' onClick={this.setValue}>
                        0
                      </button>
                    </button>
                    <button className='survey-buttons' style={{background: '#ff942998'}}>
                      <button className='survey-buttons-front' style={{background: '#ff9429'}} name='cost' value='1' onClick={this.setValue}>
                        1
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#ffff2998'}}>
                      <button className='survey-buttons-front' style={{background: '#ffff29'}} name='cost' value='2' onClick={this.setValue}>
                        2
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#80ff5f98'}}>
                      <button className='survey-buttons-front' style={{background: '#80ff5f'}} name='cost' value='3' onClick={this.setValue}>
                        3
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#00ff9598'}}>
                      <button className='survey-buttons-front' style={{background: '#00ff95'}} name='cost' value='4' onClick={this.setValue}>
                        4
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#1cccc898'}}>
                      <button className='survey-buttons-front' style={{background: '#1cccc8'}} name='cost' value='5' onClick={this.setValue}>
                        5
                      </button>
                    </button>                      
                    <button className='survey-buttons' style={{background: '#3799fb98'}}>
                      <button className='survey-buttons-front' style={{background: '#3799fb'}} name='cost' value='6' onClick={this.setValue}>
                        6
                      </button>
                    </button>
                  </div>
                </div>
                <br/>
                <div className='survey-subtext' style={{color: '#FFFFFF', fontFamily: 'monospace', "font-size":"15px"}}>(Lat, Lng): {this.state.COORDS[0].toFixed(1)}, {this.state.COORDS[1].toFixed(1)} ( Select coordinates by positioning the map's reticle in the area you'd like to rate! )</div>
                <button className='survey-submit' type='submit' onClick={this.toggleView}>
                  <span className="survey-submit-front">
                    Submit
                  </span>
                </button>
              </form>
              <br/>
            </div>
            <p className='image-link'><a href='http://www.freepik.com' target='_blank' rel='noopener noreferrer'>Background images designed by macrovector / Freepik</a></p>
          </div>
        </>
      )
    }
  }

export default Survey