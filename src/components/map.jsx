import React,{useState,useCallback} from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import { Circle } from '@react-google-maps/api';

const Map = ({center}) => {

  const [map, setMap] = useState(null)

  const containerStyle = {
    width: '1200px',
    height: '650px'
  };
   
  // const center = {
  //   lat: 7.488862,
  //   lng: 80.353441
  // };

  const position = {
    lat: 7.488862,
    lng: 80.353441
  };

  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FFFFFF',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 1000,
    zIndex: 1
  }

  const optionsTwo = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FFFFFF',
    fillOpacity: 0.1,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 2000,
    zIndex: 1
  }
 
  // const onLoad = useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map)
  // }, [])
 
  // const onUnmount = useCallback(function callback(map) {
  //   setMap(null)
  // }, [])

  return (
      <LoadScript
      googleMapsApiKey="AIzaSyCOEhXSw6tr5bfmCDTVGvOQaFfwkJ4XPWM"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        <Marker position={center}/>
        <Circle
          options={options}
          center={center}
        />
        <Circle
          options={optionsTwo}
          center={center}
        />
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;