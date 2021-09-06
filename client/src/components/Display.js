import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './Display.css'

const containerStyle = {
  width: '100vw',
  height: '93.5vh'
};

const defaultCenter = {
  lat: 28.56,
  lng: -80.64
};

function Display(){
  const state = {
    center: {
      lat: 0,
      lng: 0
    }
  };

  const [mapref, setMapRef] = React.useState(null);

  const handleOnLoad = map => {
    setMapRef(map);
  };

  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter();
      state.center.lat = newCenter.lat();
      state.center.lng = newCenter.lng();
      console.log(state.center.lat, state.center.lng);
    }
  };

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
            onLoad={handleOnLoad}
            onDragEnd={handleCenterChanged}
          >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  )
}


export default Display