import React,{useState,useCallback} from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import { Circle } from '@react-google-maps/api';
import { InfoWindow } from '@react-google-maps/api';
import { InfoBox } from '@react-google-maps/api';
import { DistanceMatrixService } from '@react-google-maps/api';

const Map = ({center,features}) => {

  const [distance, setDistance] = useState(null);
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

  console.log("Featuesssssss",features.school);

  // const calculateDist=(locTo, locFrom)=> {
  //   var lat2 = locTo.lat;
  //   var lon2 = locTo.lng;
  //   var lat1 = locFrom.lat;
  //   var lon1 = locFrom.lng;
  
  //   var R = 6371; // km 
  //   //has a problem with the .toRad() method below.
  //   var x1 = lat2 - lat1;
  //   var dLat = x1.toRad();
  //   var x2 = lon2 - lon1;
  //   var dLon = x2.toRad();
  //   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
  //     Math.sin(dLon / 2) * Math.sin(dLon / 2);
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   var d = R * c;
  //   return d;
  // }

  // const getDistance = () =>{
    
  //   return(    
  //     <DistanceMatrixService
  //       options={{
  //                 destinations: [feature.geometry.location],
  //                 origins: [center],
  //                 travelMode: "DRIVING",
  //               }}
  //       callback = {(response) => {
  //         console.log('Distance',response)

  //         setDistance(response.rows[0].elements[0].distance.text) 
          
  //       }}
  //       />
  //     )

  // }

  const testMarker=(feature,type)=>{
    // const distance=calculateDist(feature.geometry.location,center)
    //var distance='malith'
      return (
        <div>
          <Marker position={feature.geometry.location}/>
          <InfoWindow
            //onLoad={onLoad}
            position={feature.geometry.location}
          >
            <div >
              <h3>{feature.name}</h3>
              <h4></h4>
            </div>
          </InfoWindow>
          
        </div>
        
      )
    

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
      googleMapsApiKey="AIzaSyAcOnvMwmTrA9bFr7MiMwu9Now2tRUre9U"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        <Marker position={center}/>
        
        {features.school.map(school=>(
          testMarker(school,'school')
        ))}
        {features.hospital.map(hospital=>(
          testMarker(hospital,'hospital')
          
        ))}
        {features.bank.map(bank=>(
          testMarker(bank,'bank')
        ))}
        {features.police.map(police=>(
          testMarker(police,'police')
        ))}
        {features.supermarket.map(supermarket=>(
          testMarker(supermarket,'supermarket')
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