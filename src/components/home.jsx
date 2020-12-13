import React,{useCallback, useState} from 'react';

import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Marker } from '@react-google-maps/api';
import { Circle } from '@react-google-maps/api';
import { InfoWindow } from '@react-google-maps/api';
import { Polyline } from '@react-google-maps/api';
import { InfoBox } from '@react-google-maps/api';
import { useForm } from 'react-hook-form';
import { Document, Page, Text,Image, View, StyleSheet,PDFViewer } from '@react-pdf/renderer';
import {Table,TableHeader,TableCell,TableBody,DataTableCell} from '@david.kucsai/react-pdf-table'

import Map from './map'
import Land from './images/land.png'
import code from './images/qrcode.jpg'


var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = (R * c)/1000;
  return d.toFixed(1); // returns the distance in killometer
};

const Home = () => {
	const [latitude,setLatitude]=useState();
  const [longitude,setLongitude]=useState();
  const [latt,setLat]=useState(7.488862);//7.488862
  const [lngg,setLng]=useState(80.353441);//80.353441
  const [features, setFeatures] = useState({
    school: [],
    hospital: [],
    bank: [],
    police:[],
    supermarket:[]
  });
  const [open, setOpen] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const [data, setData] = useState();
  const { register ,getValues} = useForm({
    mode: 'onBlur',
  });
  const [facilities, setFacilities] = useState([]);
  const [school, setSchool] = useState(0);
  const [hospital, setHospital] = useState(0);
  const [bank, setBank] = useState(0);
  const [police, setPolice] = useState(0);
  const [supermarket, setSupermarket] = useState(0);
  const [finalValue, setFinalValue] = useState(0);
  
  const center = {
    lat: parseFloat(latt),
    lng: parseFloat(lngg)
  };

  const handleLatitude = (data) => {
    setLatitude(data);
  }

  const handleLongitude = (data) => {
    setLongitude(data);
  }

  const handleClick = () => {
    setLat(latitude);
    setLng(longitude);
  }

  const handleCheckbox = async (data,type) => {

    if(data){
      if(data){
        const result = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=${type}&key=AIzaSyAcOnvMwmTrA9bFr7MiMwu9Now2tRUre9U`)

        switch (type) {
          case 'school':
            setFeatures({...features,'school':result.data.results.slice(0,4)})
            break;
          case 'hospital':
            setFeatures({...features,'hospital':result.data.results.slice(0,4)})
            break;
          case 'bank':
            setFeatures({...features,'bank':result.data.results.slice(0,4)})
            break;
          case 'police':
            setFeatures({...features,'police':result.data.results.slice(0,4)})
            break;
          case 'supermarket':
            setFeatures({...features,'supermarket':result.data.results.slice(0,4)})
            break;
          default:
            break;
        }
      }
    }else{
      switch (type) {
        case 'school':
          setFeatures({...features,'school':[]})
          break;
        case 'hospital':
          setFeatures({...features,'hospital':[]})
          break;
        case 'bank':
          setFeatures({...features,'bank':[]})
          break;
        case 'police':
          setFeatures({...features,'police':[]})
          break;
        case 'supermarket':
          setFeatures({...features,'supermarket':[]})
          break;
        default:
          break;
      }
    }


  }

  const handleFacilities = (checked,facility) =>{
    if(checked){
      console.log(facility);
      switch (facility) {
        case 'electricity':
          setFacilities([...facilities,'electricity'])
          break;
        case 'communication_networks':
          setFacilities([...facilities,'communication_networks'])
          break;
        case 'trasportation_facilities':
          setFacilities([...facilities,'trasportation_facilities'])
          break;
        case 'sewage':
          setFacilities([...facilities,'sewage'])
          break;
        case 'water':
          setFacilities([...facilities,'water'])
          break;
        default:
          break;
      }
    }
    
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleOpenPdf = () => {
    setOpenPdf(true);
    calValue();
  };

  const handleClosePdf = (value) => {
    setOpenPdf(false);
  };

  const handleGenerate = (value) => {
    console.log(school,hospital,bank,police,supermarket);
    const values = getValues();
    setData(values);
    console.log(values);
    handleOpenPdf();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
  ];


  const styles = StyleSheet.create({
    page: { width:'1000px',height:'1000px' },
    heading: { backgroundColor:'black',color: 'white', textAlign: 'center',fontWeight:'bold',padding:20,marginBottom:10},
    text:{fontWeight:'bold'},
    section: { borderStyle:'solid',borderWidth:3,borderColor:'black' ,textAlign: 'left',fontSize:14,padding:10,fontWeight:'bold',width:170,marginLeft:10},
    test:{borderStyle:'solid',borderWidth:3,borderColor:'black'},
    table:{margin:10},
    image: {
      width: '30%',
      padding: 10,
      textAlign:'right'
      //backgroundColor: 'grey',
    },
    font:{fontSize:14,paddingLeft:10,paddingBottom:10,paddingTop:10},
    font1:{fontSize:14,paddingLeft:10,paddingBottom:10},
    font2:{fontSize:14,paddingLeft:80}
  });

  const caldistanceBased=(distance)=>{

    if(0<distance && distance<1){
      return 20;
    }else if(1<distance && distance<2){
      return 15;
    }else if(2<distance && distance<3){
      return 10;
    }else if(3<distance && distance<4){
      return 5;
    }else{
      return 0;
    }
  }

  const calValue = (distance) =>{
    const facValue=(facilities.length*20)/100;

    const distancePercent=(caldistanceBased(school)+caldistanceBased(hospital)+caldistanceBased(bank)+caldistanceBased(police)+caldistanceBased(supermarket))/100
    const averageValue=(facValue+distancePercent)/2
    const approximateValue=Number(getValues('value'))
    console.log('value',approximateValue);
    const finalResult=approximateValue+(approximateValue*averageValue)
    setFinalValue(finalResult)
  }
   
  const testMarker = (feature,type,index)=>{
    const path=[feature.geometry.location,center]
    const value=getDistance(feature.geometry.location,center);

    if(index===0){
      switch (type) {
        case 'school':
          setSchool(value)
          break;
        case 'hospital':
          setHospital(value)
          break;
        case 'bank':
          setBank(value)
          break;
        case 'police':
          setPolice(value)
          break;
        case 'supermarket':
          setSupermarket(value)
          break;
        default:
          break;
      }
    }
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

      return (
        <div>
          <Marker position={feature.geometry.location}/>
          <InfoWindow
            position={feature.geometry.location}
          >
            <div >
              <h3>{feature.name}</h3>
              <h4>{value}KM</h4>
            </div>
          </InfoWindow>
          <Polyline
            path={path}
            options={options}
          />
          
        </div>
        
      )
  }


  return (
		<Grid container>
      <Grid item container >
      
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"  color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            BOOMI Value
          </Typography>
        </Toolbar>
      </AppBar>
    
      </Grid>
      <Grid item>
      <Typography variant="subtitle1" gutterBottom style={{padding:"50px 100px 5px 100px"}}>
        Enter Cordinates (WGX) :
      </Typography>
      </Grid>
      <Grid item container style={{padding:"0px 100px 0px 100px"}} spacing={5}>
            <Grid item>
              <TextField onChange={(e)=>{handleLatitude(e.target.value);}} label="Latitude" variant="outlined" size="small" />
            </Grid>
            <Grid item>
              <TextField onChange={(e)=>{handleLongitude(e.target.value);}} label="Longitude" variant="outlined" size="small" />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleClick} color="primary">
                Submit
              </Button>
            </Grid>
            <Grid item style={{paddingLeft:'400px'}}>
              <Button variant="contained" color="secondary" style={{height:'60px',}} onClick={handleClickOpen}>
                Generate report
              </Button>
              
            </Grid>
            
      </Grid>
      <Typography variant="subtitle1" gutterBottom style={{padding:"0px 100px 0px 100px"}}>
        Select Features :
      </Typography>
      <Grid item container style={{padding:"0px 100px 50px 100px"}} spacing={5}>
        <Grid item>
          <FormControlLabel
          control={
            <Checkbox
              // checked={state.checkedB}
              onChange={(e)=>{handleCheckbox(e.target.checked,'school')}}
              name="checkedB"
              color="primary"
            />
          }
          label="Schools"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
          control={
            <Checkbox
              // checked={state.checkedB}
              onChange={(e)=>{handleCheckbox(e.target.checked,'hospital')}}
              name="checkedB"
              color="primary"
            />
          }
          label="Hospitals"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
          control={
            <Checkbox
              // checked={state.checkedB}
              onChange={(e)=>{handleCheckbox(e.target.checked,'bank')}}
              name="checkedB"
              color="primary"
            />
          }
          label="Banks"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
          control={
            <Checkbox
              // checked={state.checkedB}
              onChange={(e)=>{handleCheckbox(e.target.checked,'police')}}
              name="checkedB"
              color="primary"
            />
          }
          label="Police stations"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
          control={
            <Checkbox
              // checked={state.checkedB}
              onChange={(e)=>{handleCheckbox(e.target.checked,'supermarket')}}
              name="checkedB"
              color="primary"
            />
          }
          label="Super markets"
          />
        </Grid>

        </Grid>
      <div style={{padding:"0px 100px"}}>
        <Map center={center} features={features} facilities={facilities} testMarker={testMarker}/>
      </div>
      <Dialog
        maxWidth='md'
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Basic Information</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
           <Grid container >
              <Grid item style={{flex:1}} container spacing={3}>
                <Grid item  style={{flex:1}}>
                  <p style={{color:'black'}}>Village</p>
                  <FormControl fullWidth>
                    <TextField
                      inputRef={register}
                      name="village"
                      placeholder="Village"
                      variant="outlined"
                      size='small'
                    />
                  </FormControl>
                </Grid>
                <Grid item style={{flex:1}}>
                <p style={{color:'black'}}>GND</p>
                  <FormControl fullWidth>
                    <TextField
                      inputRef={register}
                      name="gnd"
                      placeholder="GND"
                      variant="outlined"
                      size='small'
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container spacing={3}>
                <Grid item style={{flex:1}} >
                <p style={{color:'black'}}>DSD</p>
                  <FormControl fullWidth>
                    <TextField
                      inputRef={register}
                      name="dsd"
                      placeholder="DSD"
                      variant="outlined"
                      size='small'
                    />
                  </FormControl>
                </Grid>
                <Grid item style={{flex:1}}>
                <p style={{color:'black'}}> District</p>
                  <FormControl fullWidth>
                    <TextField
                      inputRef={register}
                      name="district"
                      placeholder="District"
                      variant="outlined"
                      size='small'
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container spacing={3}>
                <Grid item style={{flex:1}}>
                <p style={{color:'black'}}>Province</p>
                  <FormControl fullWidth>
                    <TextField
                      inputRef={register}
                      name="province"
                      placeholder="Province"
                      variant="outlined"
                      size='small'
                    />
                  </FormControl>
                </Grid>
                <Grid item style={{flex:1}}>
                <p style={{color:'black'}}>Parcel ID</p>
                  <FormControl fullWidth>
                    <TextField
                      inputRef={register}
                      name="id"
                      placeholder="Parcel ID"
                      variant="outlined"
                      size='small'
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container spacing={3}>
                <Grid item style={{flex:1}}>
                <p style={{color:'black'}}>Lot No</p>
                  <FormControl fullWidth>
                    <TextField
                      inputRef={register}
                      name="lot"
                      placeholder="Lot No"
                      variant="outlined"
                      size='small'
                    />
                  </FormControl>
                </Grid>
                <Grid item style={{flex:1}}>
                <p style={{color:'black'}}>Extent</p>
                  <FormControl fullWidth>
                    <TextField
                      inputRef={register}
                      name="extent"
                      placeholder="Extent"
                      variant="outlined"
                      size='small'
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container spacing={3}>
                <Grid item style={{flex:1}}>
                <p style={{color:'black'}}>Name of the land</p>
                  <FormControl fullWidth>
                    <TextField
                      inputRef={register}
                      name="name"
                      placeholder="Name of the land"
                      variant="outlined"
                      size='small'
                    />
                  </FormControl>
                </Grid>
                <Grid item style={{flex:1}}>
                <p style={{color:'black'}}>Land use</p>
                  <FormControl fullWidth>
                    <TextField
                      inputRef={register}
                      name="land"
                      placeholder="Land use"
                      variant="outlined"
                      size='small'
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container spacing={3}>
                <Grid item style={{flex:1}}>
                <p style={{color:'black'}}>Claimant</p>
                  <FormControl fullWidth>
                    <TextField
                      inputRef={register}
                      name="claimant"
                      placeholder="Claimant"
                      variant="outlined"
                      size='small'
                    />
                  </FormControl>
                </Grid>
                <Grid item style={{flex:1}}>
                <p style={{color:'black'}}>Area (Acres/Roots/Perches)</p>
                  <FormControl fullWidth>
                    <TextField
                      inputRef={register}
                      name="area"
                      placeholder="Area"
                      variant="outlined"
                      size='small'
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container spacing={3}>
                <Grid item style={{flex:1}}>
                <p style={{color:'black'}}>Approximated Value</p>
                  <FormControl fullWidth>
                    <TextField
                      inputRef={register}
                      name="value"
                      placeholder="Approximated Value (Rs)"
                      variant="outlined"
                      size='small'
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container>
              <Grid item container>
              <p style={{color:'black'}}>Facilities</p>
              </Grid>
                <Grid item style={{flex:1}}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={state.checkedB}
                        onChange={(e)=>{handleFacilities(e.target.checked,'electricity')}}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Electricity"
                  />
                </Grid>
                <Grid item style={{flex:1}}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={state.checkedB}
                        onChange={(e)=>{handleFacilities(e.target.checked,'communication_networks')}}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Communication networks"
                  />
                </Grid>
                <Grid item style={{flex:1}}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={state.checkedB}
                        onChange={(e)=>{handleFacilities(e.target.checked,'trasportation_facilities')}}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Trasportation facilities"
                  />
                </Grid>
                <Grid item style={{flex:1}}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={state.checkedB}
                        onChange={(e)=>{handleFacilities(e.target.checked,'sewage')}}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Sewage"
                  />
                </Grid>
                <Grid item style={{flex:1}}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={state.checkedB}
                        onChange={(e)=>{handleFacilities(e.target.checked,'water')}}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Water"
                  />
                </Grid>
              </Grid>
           </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button onClick={handleGenerate} color="primary" autoFocus>
            Generate
          </Button>
        </DialogActions>
      </Dialog>


{data ?      <Dialog
      fullScreen
        open={openPdf}
        onClose={handleClosePdf}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <PDFViewer height='950px'>
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.heading}>
                <Text style={styles.text}>Final Report</Text>
              </View>
              <View style={styles.section}>
                  <Text>Latitude : {latitude}</Text>
                  <Text>Longitude: {longitude}</Text>
              </View>
              <Image
                style={styles.image}
                src={Land}
              />
              <View style={styles.table}>
              <Table
                    data={[
                        {firstName: "Village", lastName: `${data.village}`},
                        {firstName: "GND", lastName: `${data.gnd}`},
                        {firstName: "DSD", lastName: `${data.dsd}`},
                        {firstName: "District", lastName: `${data.district}`},
                        {firstName: "Province", lastName: `${data.province}`},
                        {firstName: "Parcel ID", lastName: `${data.id}`},
                        {firstName: "Lot No", lastName: `${data.lot}`},
                        {firstName: "Extent", lastName: `${data.extent}`},
                        {firstName: "Name of the land", lastName: `${data.name}`},
                        {firstName: "Land use", lastName: `${data.land}`},
                        {firstName: "Claimant", lastName: `${data.claimant}`},
                        {firstName: "Area", lastName: `${data.area}`},
                        {firstName: "Approximated Value (Rs)", lastName: `${data.value}`}
                    ]}
                >
                    <TableHeader textAlign={"center"}>
                        <TableCell weighting={0.8}>
                            Name
                        </TableCell>
                        <TableCell weighting={0.8}>
                            Value
                        </TableCell>
                    </TableHeader>
                    <TableBody textAlign={"center"}>
                        <DataTableCell getContent={(r) => r.firstName}/>
                        <DataTableCell getContent={(r) => r.lastName}/>
                    </TableBody>
                </Table>
                </View>
                <View >
                  <Text style={styles.font}>Infastructure :</Text>
                  {facilities.map(facility=>{
                    return <Text style={styles.font2}>{facility}</Text>
                  })}
                  
                </View>
                <View >
                  <Text style={styles.font}>Proximity Operators :</Text>
                  {school>0 ?  <Text style={styles.font2}>School - {school}KM</Text>:null}
                  {hospital>0 ? <Text style={styles.font2}>Hospital - {hospital}KM</Text>:null}
                  {bank>0 ? <Text style={styles.font2}>Bank - {bank}KM</Text>:null}
                  {police>0 ? <Text style={styles.font2}>police - {police}KM</Text>:null}
                  {supermarket>0 ? <Text style={styles.font2}>Supermarket - {supermarket}KM</Text>:null}
                  
                </View>
                <View style={{ textAlign: 'center',paddingTop:10}}>
                  <Text>Valuation Price Per Perch (Rs) </Text>
                  <Text style={{fontSize:'16'}}>{finalValue}/=</Text>
                </View>
                <View >
                  <Image
                      style={{width:'10%',margin:'50 0 0 500'}}
                      src={code}
                    />
                </View>
            </Page>
          </Document>
        </PDFViewer>
      </Dialog> : null}

        
		</Grid>
  );
};

export default Home;
