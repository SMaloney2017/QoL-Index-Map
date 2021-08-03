import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './Display.css'

const containerStyle = {
  width: '100vw',
  height: '93.5vh'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

export class Display extends React.Component {
  
  constructor() {
    super()

    this.state = {
      lat:0,
      lng:0,
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
      <div>
        <LoadScript
          googleMapsApiKey="AIzaSyDXTz91zMUSd21UhHcVTrb1GPJbGMI4hko"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5}
          >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
          </GoogleMap>
        </LoadScript>
      </div>
    )
  }
}

export default Display