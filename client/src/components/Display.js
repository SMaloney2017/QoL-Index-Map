import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './Display.css'

function formatData(queriedData) {
  const displayData = []
  const COORDS = []
  for(var i in queriedData){
    if (queriedData.hasOwnProperty(i)){
      var obj = queriedData[i]
      COORDS[0] = queriedData[i].lat
      COORDS[1] = queriedData[i].lon
      var selectedOption = Object.keys(obj)[0];
      var weight = obj[selectedOption];
    }
      displayData[i] = [COORDS, weight]
    }
    console.log(displayData)
    return displayData
 }


function Display(props){
  const containerStyle = {
    width: '100vw',
    height: '93.5vh'
  };
  
  const defaultCenter = {
    lat: 28.56,
    lng: -80.64
  };
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
            {/* <HeatmapLayer data={formatData(props.getData)} /> */}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  )
}


export default Display