import React,{useState,useCallback} from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import { Circle } from '@react-google-maps/api';
import { InfoWindow } from '@react-google-maps/api';
import { Polyline } from '@react-google-maps/api';
import { InfoBox } from '@react-google-maps/api';
import { DistanceMatrixService } from '@react-google-maps/api';


const Map = ({center,features,facilities,testMarker}) => {

  const [distance, setDistance] = useState([]);
  const [count, setCount] = useState('false')

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

  return (
      <LoadScript
      googleMapsApiKey="AIzaSyAcOnvMwmTrA9bFr7MiMwu9Now2tRUre9U"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        <Marker position={center}/>
        
        {features.school.map((school,index)=>(
          testMarker(school,'school',index)
        ))}
        {features.hospital.map((hospital,index)=>(
          testMarker(hospital,'hospital',index)
          
        ))}
        {features.bank.map((bank,index)=>(
          testMarker(bank,'bank',index)
        ))}
        {features.police.map((police,index)=>(
          testMarker(police,'police',index)
        ))}
        {features.supermarket.map((supermarket,index)=>(
          testMarker(supermarket,'supermarket',index)
        ))}
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