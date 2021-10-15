import React from 'react'
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api'
import './Display.css'

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

const containerStyle = {
  width: '100vw',
  height: '93.5vh'
};

const defaultCenter = {
  lat: 28.56,
  lng: -80.64
};

function Display(props){
  const colors = ["#fe2323", "#ff5528", "#ff872c", "#ffeb35", "#c7ef39", "#72f43f", "#1cf945"]
  const displayData = formatData(props.getData)
  var id = 0
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
            {displayData.map(({COORDS, w}) => (
              <Circle
                key={id++}
                center={COORDS}
                options={{
                  strokeColor: colors[w],
                  strokeOpacity: 1,
                  strokeWeight: 2,
                  fillColor: colors[w],
                  fillOpacity: 0.7,
                  clickable: false,
                  draggable: false,
                  editable: false,
                  visible: true,
                  radius: 20000,
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