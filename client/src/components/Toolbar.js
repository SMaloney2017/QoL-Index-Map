import React from 'react'
import './Toolbar.css'
import { BsTools } from 'react-icons/bs'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import Slider from '@material-ui/core/Slider'
import TextField from '@material-ui/core/TextField';



class Toolbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
      COORDS:[0, 0],
      overall:[0, 6],
      government:[0, 6],
      industry:[0, 6],
      scenery:[0, 6],
      safety:[0, 6],
      social:[0, 6],
      cost:[0, 6],
      date:["", ""],
      today: "",
      selectedOption: 'overall_score'
      }
  
    this.selectData = this.selectData.bind(this)
    this.clearData = this.clearData.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.default = this.state
  }


  toggleView = () => {
    this.setState({active: !this.state.active}, () => {
      console.log("Toolbar.js (toggleView) - ", this.state.active)
    })
  }

  selectData(e) {
    this.setState({ selectedOption: String(e.target.value) }, () => {
      console.log("Toolbar.js (selectData) - ", e.target.value)
    })
  }

  clearData(e) {
    this.setState(this.default)
    this.setState({active: true})
    console.log("Toolbar.js (clearData)")
  }

  setValue = name => (e, value) => {
    this.setState({ [name]: value }, () => {
      console.log("Toolbar.js (setValue) - ", name, value)
    });
    
  }

  sendDataToDb = async (e) => {
    e.preventDefault()
    try {
      const data = { overall_score:this.state.overall, government_score:this.state.government, industry_score:this.state.industry, scenery_score:this.state.scenery, safeness_score:this.state.safety, social_score:this.state.social, cost_score:this.state.cost, selectedOption:this.state.selectedOption, date:this.state.date}
      const response = await fetch('http://localhost:5000/query', {     
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(data)
      })
      const receivedData = await response.json()
      console.log(receivedData)
    } catch (error) {
      console.log(error.message)
    }
  }

  sendDataToParent = (e) => {
    this.props.parentCallback(this.state.overall, this.state.government, this.state.industry, this.state.scenery, this.state.safety, this.state.social, this.state.cost);
    e.preventDefault();
  }

  handleSubmit = (e) => {
    e.preventDefault()
    var validation = true;
    validation &= this.sendDataToParent(e);
    validation &= this.sendDataToDb(e);
    return validation
  }

  componentDidMount() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = String(currentDate.getMonth() + 1).padStart(2, '0');
    var day = String(currentDate.getDate()).padStart(2, '0');
    var presentDate = year + "-" + month + "-" + day
    this.setState({today:presentDate}, () => {
      console.log("Toolbar.js (componentDidMount) - ", this.state)
    })
  }

  render() {
    const { 
      overall,
      government,
      industry,
      scenery,
      safety,
      social,
      cost,
      date, 
      today
    } = this.state
      
    return (
      <>
        <div className='toolbar-icon'>
          <BsTools onClick={this.toggleView} />
        </div>
        <div className={this.state.active ? 'toolbar-menu active' : 'toolbar-menu'}>
          <div>          
            <button className='toolbar-close'>
              <span className='toolbar-close-front'>
                <AiOutlineCloseCircle onClick={this.toggleView}/>
              </span>
            </button>
            <form onSubmit={this.handleSubmit} >
              <div className ='toolbar-query'>
                <div className='toolbar-header'>Query</div>
                <hr size="1" width="90%" color="#272727"/>
                <div className='toolbar-text'>data visable: <span style={{color: '#ff2929'}}>{this.state.selectedOption}</span></div>
                <div className='toolbar-select-container'>
                  <div className='toolbar-subtext'>
                    <div><input type='radio' onChange={this.selectData} value='overall_score' name='selectedOption' checked={this.state.selectedOption === 'overall_score' }/>overall</div>
                    <div><input type='radio' onChange={this.selectData} value='government_score' name='selectedOption' checked={this.state.selectedOption === 'government_score'}/>government</div>
                    <div><input type='radio' onChange={this.selectData} value='industry_score' name='selectedOption' checked={this.state.selectedOption === 'industry_score'}/>industry</div>
                    <div><input type='radio' onChange={this.selectData} value='scenery_score' name='selectedOption' checked={this.state.selectedOption === 'scenery_score'}/>scenery</div>
                  </div>
                  <div className='toolbar-subtext'>
                    <div><input type='radio' onChange={this.selectData} value='safeness_score' name='selectedOption' checked={this.state.selectedOption === 'safeness_score'}/>safety</div>
                    <div><input type='radio' onChange={this.selectData} value='social_score' name='selectedOption' checked={this.state.selectedOption === 'social_score'}/>social</div>
                    <div><input type='radio' onChange={this.selectData} value='cost_score' name='selectedOption' checked={this.state.selectedOption === 'cost_score'}/>cost</div>
                  </div>
                </div>
                <br/>
                <div className='toolbar-range-container'>
                  <div className='toolbar-text'>overall range: <span style={{color: '#00ff95c5'}}>{this.state.overall[0]} - {this.state.overall[1]}</span></div>
                  <Slider
                    style={{width: '70%'}}
                    value={overall}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.setValue('overall')}
                    valueLabelDisplay='auto'
                    aria-labelledby='range-slider'
                    />
                  <div className='toolbar-text'>government range: <span style={{color: '#00ff95c5'}}>{this.state.government[0]} - {this.state.government[1]}</span></div>
                  <Slider
                    style={{width: '70%'}}
                    value={government}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.setValue('government')}
                    valueLabelDisplay='auto'
                    aria-labelledby='range-slider'
                  />
                  <div className='toolbar-text'>industry range: <span style={{color: '#00ff95c5'}}>{this.state.industry[0]} - {this.state.industry[1]}</span></div>
                  <Slider
                    style={{width: '70%'}}
                    value={industry}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.setValue('industry')}
                    valueLabelDisplay='auto'
                    aria-labelledby='range-slider'
                  />
                  <div className='toolbar-text'>scenery range: <span style={{color: '#00ff95c5'}}>{this.state.scenery[0]} - {this.state.scenery[1]}</span></div>
                  <Slider
                    style={{width: '70%'}}
                    value={scenery}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.setValue('scenery')}
                    valueLabelDisplay='auto'
                    aria-labelledby='range-slider'
                  />
                  <div className='toolbar-text'>safety range: <span style={{color: '#00ff95c5'}}>{this.state.safety[0]} - {this.state.safety[1]}</span></div>
                  <Slider
                    style={{width: '70%'}}
                    value={safety}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.setValue('safety')}
                    valueLabelDisplay='auto'
                    aria-labelledby='range-slider'
                  />
                  <div className='toolbar-text'>social range: <span style={{color: '#00ff95c5'}}>{this.state.social[0]} - {this.state.social[1]}</span></div>
                  <Slider
                    style={{width: '70%'}}
                    value={social}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.setValue('social')}
                    valueLabelDisplay='auto'
                    aria-labelledby='range-slider'
                  />
                  <div className='toolbar-text'>cost range: <span style={{color: '#00ff95c5'}}>{this.state.cost[0]} - {this.state.cost[1]}</span></div>
                  <Slider
                    style={{width: '70%'}}
                    value={cost}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    onChange={this.setValue('cost')}
                    valueLabelDisplay='auto'
                    aria-labelledby='range-slider'
                  />
                </div>
                <br/>
                <div className='toolbar-datepicker-container'>
                  <div className='datepicker'>
                    <TextField
                      id="date"
                      label="Start Date"
                      type="date"
                      onChange={this.setValue(date[0])}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  <div className='datepicker'>
                    <TextField
                      id="date"
                      label="End Date"
                      type="date"
                      value={today}
                      defaultValue={today}
                      onChange={this.setValue(date[1])}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                </div>
                <br/>
                <br/>
                <button className='toolbar-submit' type='submit' onClick={this.toggleView}>
                  <span className="toolbar-submit-front">
                    Submit
                  </span>
                </button>
                <button className='toolbar-clear' type='reset' onClick={this.clearData}>
                  <span className="toolbar-clear-front">
                    Clear
                  </span>
                </button>
              </div>
              <br/>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default Toolbar;