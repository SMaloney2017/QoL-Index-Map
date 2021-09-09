import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './Minimap.css'

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 28.56,
  lng: -80.64
};

function Minimap(props){
  const state = {
    center: [0, 0]
  };

  const [mapref, setMapRef] = React.useState(null);

  const handleOnLoad = map => {
    setMapRef(map);
  };

  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter();
      state.center[0] = newCenter.lat();
      state.center[1] = newCenter.lng();
      props.updateCenter(state.center)
    }
  };

  return (
    <>
      <div className='minimap-container'>
        <LoadScript googleMapsApiKey="AIzaSyDXTz91zMUSd21UhHcVTrb1GPJbGMI4hko">
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

export default Minimap