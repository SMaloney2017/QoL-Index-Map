import React, { useState } from "react";
import { GoogleMap, LoadScript, Circle } from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./css/Display.css";

function Display(props) {
  const [mapref, setMapRef] = useState(null);
  const colors = [
    "#fe2323",
    "#ff5528",
    "#ff872c",
    "#ffeb35",
    "#c7ef39",
    "#72f43f",
    "#1cf945",
  ];
  var ID = 0;

  const containerStyle = {
    width: "100vw",
    height: "93.5vh",
  };

  var center = {
    lat: 28.56,
    lng: -80.64,
  };

  const handleOnLoad = (map) => {
    setMapRef(map);
  };

  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter();
      center.lat = newCenter.lat();
      center.lng = newCenter.lng();
      console.log(center);
      props.shareCenter(center);
    }
  };

  const formatData = (queriedData) => {
    var displayData = [{}];
    for (var i in queriedData) {
      if (queriedData.hasOwnProperty(i)) {
        var gData = new window.google.maps.LatLng(
          parseFloat(queriedData[i].lat),
          parseFloat(queriedData[i].lng)
        );
        var obj = queriedData[i];
        var selectedOption = Object.keys(obj)[0];
        var weight = obj[selectedOption];
      }
      displayData[i] = { COORDS: gData, w: weight };
    }
    return displayData;
  };

  var displayData = formatData(props.getData);
  var newCenter = props.getCenter;
  var newRange = props.getRange;
  var selectedCenter = props.getSelectedCenter;

  return (
    <>
      <div>
        <LoadScript googleMapsApiKey="AIzaSyCkXkSH1iYfTYeHDtIdSM4zGJGVvd9f-9s">
          <GoogleMap
            id="display"
            mapContainerStyle={containerStyle}
            center={newCenter}
            zoom={5}
            onLoad={handleOnLoad}
            onDragEnd={handleCenterChanged}
          >
            {displayData.map(({ COORDS, w }) => (
              <Circle
                key={ID++}
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
                  zIndex: 1,
                }}
              />
            ))}
            <Circle
              center={selectedCenter}
              options={{
                strokeColor: "#3f00ff",
                strokeOpacity: 0,
                fillColor: "#3f00ff",
                fillOpacity: 0.5,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                radius: newRange,
                zIndex: 0,
              }}
            />
            <div className="ret">
              <FaMapMarkerAlt />
            </div>
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}
export default Display;
