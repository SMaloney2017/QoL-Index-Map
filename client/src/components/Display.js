import React from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';
import './Display.css'

const containerStyle = {
  width: '100vw',
  height: '93.5vh'
};

const defaultCenter = {
  lat: 28.56,
  lng: -80.64
};


function Display(props){
  return (
    <>
      {console.log(props.getData)}
      <div>
        <LoadScript
          googleMapsApiKey="AIzaSyDXTz91zMUSd21UhHcVTrb1GPJbGMI4hko"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={5}
          >
            { /* Child components, such as markers, info windows, etc. */ }
            <>
            </>
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  )
}


export default Display