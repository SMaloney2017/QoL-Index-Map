import React  from 'react'
import { AiOutlineCloseCircle, AiFillCalculator } from 'react-icons/ai'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { RiFolderChartLine, RiLineChartLine } from 'react-icons/ri'
import { BiReset } from 'react-icons/bi'
import './Analysis.css'

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: true,
      inputView: true,
      cmdLine: '.POSITION RETICLE, ENTER RADIUS',
      value: 0,
      center: {lat: 28.56, lng: -80.64}
    };
    this.default = this.state
    this.validateInput = this.validateInput.bind(this)
    this.startAnalysis = this.startAnalysis.bind(this)
    this.toggleView = this.toggleView.bind(this)
    this.resetAnalysis = this.resetAnalysis.bind(this)
  }

  toggleView = () => {
    this.setState({view: !this.state.view})
  }

  resetAnalysis = () => {
    this.setState(this.default)
    document.getElementById('radius').onclick = null;
  }

  validateInput = () => {
    if(isNaN(+this.state.value)){
      this.setState({cmdLine: '.ENTRY MUST BE INTEGER'})
    }else{
      document.getElementById('radius').className = 'radius-flashing';
      this.setState({cmdLine: '.CLICK FLASHING ICON TO BEGIN'})
      document.getElementById('radius').onclick = this.startAnalysis;
      this.setState({inputView: false})
    }
  }
  
  startAnalysis = () => {
    this.setState({cmdLine: '.AREA STATISTICS'})
    document.getElementById('radius').className = 'radius-active';
  }

  componentDidUpdate(prevProps) {
    if(this.props.getCenter !== prevProps.getCenter){
       this.setState({ center: this.props.getCenter});
    }
 }

  render() {
    return (
      <>
        <div className='analysis-container'>
          <div className={this.state.view? 'analysis-button': 'analysis-screen'}>
            <span className={this.state.view ? 'analysis-button-front': 'analysis-screen-front'}>
              <div className={this.state.view ? 'analysis-icon': 'analysis-icon-active'} onClick={this.toggleView}>
                <div className={this.state.view ? 'analysis-icon-front': 'analysis-icon-front-active'}>
                  <div className={this.state.view ? null: 'hidden'}><AiFillCalculator /></div>
                  <div className={this.state.view ? 'hidden': 'icon-open'}>< AiOutlineCloseCircle/></div>
                </div>
              </div>
              <div id='radius' className={this.state.view ? 'hidden': 'radius-button'}><FaMapMarkerAlt onClick={null}/></div>
              <div className={this.state.view ? 'hidden': 'stats-button'}><RiFolderChartLine/></div>
              <div className={this.state.view ? 'hidden': 'graphs-button'}><RiLineChartLine/></div>
              <div className={this.state.view ? 'hidden': 'reset-button'}><BiReset onClick={this.resetAnalysis}/></div>
              <span className={this.state.view ? 'hidden': 'analysis-info'}>
                <div className='info-text' >
                  {this.state.cmdLine}<br/>
                  .{'{'}{this.state.center.lat.toFixed(2)},{this.state.center.lng.toFixed(2)}{'}'}<br/>
                  .<input
                    id='inputValue'
                    type='text'
                    value={this.state.value}
                    className={this.state.inputView ? 'input': 'hidden'}
                    onChange={event => {this.setState({value: event.target.value})}}
                    onKeyPress={event => {if (event.key === 'Enter') {this.validateInput()}}}
                    autoComplete='false'
                    placeholder='%d{km}'
                  />
                  <span className={this.state.inputView ? 'hidden': 'value'}>{this.state.value}[km]r</span>
                </div>
              </span>
            </span>
          </div>
        </div>
      </>
    )
  }
}

export default Analysis