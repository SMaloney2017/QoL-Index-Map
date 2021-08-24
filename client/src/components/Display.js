import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './Display.css'

const containerStyle = {
  width: '100vw',
  height: '93.5vh'
};

const defaultCenter = {
  lat: 33.7,
  lng: -84.5
};

export class Display extends React.Component {
  
  constructor() {
    super()

    this.state = {
      center: {
        lat:0,
        lng:0
      }
    }
  }

  render() {

    return (
      <>
        <div className='reticle'/>
        <div>
          <LoadScript
            googleMapsApiKey="AIzaSyDXTz91zMUSd21UhHcVTrb1GPJbGMI4hko"
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={defaultCenter}
              zoom={5}
              onClick={e => {
                console.log("latitide = ", e.latLng.lat());
                console.log("longitude = ", e.latLng.lng());
              }}
            >
              { /* Child components, such as markers, info windows, etc. */ }
              <></>
            </GoogleMap>
          </LoadScript>
        </div>
      </>
    )
  }
}

export default Display