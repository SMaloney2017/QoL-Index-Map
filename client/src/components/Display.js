import React from 'react';
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api';
import './Display.css';

function formatData(queriedData) {
  var displayData = [{}]
  var COORDS = []
  for(var i in queriedData){
    if (queriedData.hasOwnProperty(i)){
      COORDS[0] = queriedData[i].lat
      COORDS[1] = queriedData[i].lon
      var gData = new window.google.maps.LatLng(COORDS[0], COORDS[1])
      var obj = queriedData[i]
      var selectedOption = Object.keys(obj)[0];
      var weight = obj[selectedOption];
    }
      displayData[i] = {COORDS:gData, w: weight}
    }
    console.log(displayData)
    return displayData
 }

function Display(props){
  const displayData = formatData(props.getData)

  const containerStyle = {
    width: '100vw',
    height: '93.5vh'
  };
  
  const defaultCenter = {
    lat: 28.56,
    lng: -80.64
  };

  const colors = ["#ff2929", "#ff9429", "#ffff29", "#80ff5f", "#00ff95", "#1cccc8", "#3799fb"]

  return (
    <>
      <div>
        <LoadScript
          googleMapsApiKey="AIzaSyCkXkSH1iYfTYeHDtIdSM4zGJGVvd9f-9s"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={5}
          >
            {displayData.map(({COORDS, w }) => (
              <Circle
                center={COORDS}
                options={{
                  strokeColor: colors[w],
                  strokeOpacity: .75,
                  strokeWeight: 1,
                  fillColor: colors[w],
                  fillOpacity: 0.5,
                  clickable: false,
                  draggable: false,
                  editable: false,
                  visible: true,
                  radius: 30000,
                  zIndex: 1
                }}
              >
              </Circle>
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  )
}


export default Display