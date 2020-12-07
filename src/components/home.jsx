import React,{useState} from 'react';

import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
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
import { useForm } from 'react-hook-form';
import { Document, Page, Text, View, StyleSheet,PDFViewer } from '@react-pdf/renderer';
import MaterialTable from 'material-table'
import {Table,TableHeader,TableCell,TableBody,DataTableCell} from '@david.kucsai/react-pdf-table'

import Map from './map'

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
        console.log(data,type);
        console.log(result.data.results);

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

  const handleFacilities = (type) =>{
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleOpenPdf = () => {
    setOpenPdf(true);
    console.log('DATAAAAAAAAAAAAAAAAA',data);
  };

  const handleClosePdf = (value) => {
    setOpenPdf(false);
  };

  const handleGenerate = (value) => {
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
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const styles = StyleSheet.create({
    page: { width:'1000px',height:'1000px' },
    heading: { backgroundColor:'black',color: 'white', textAlign: 'center',fontWeight:'bold',padding:20,marginBottom:10},
    text:{fontWeight:'bold'},
    section: { borderStyle:'solid',borderWidth:3,borderColor:'black' ,textAlign: 'left',fontSize:14,padding:10,fontWeight:'bold',width:170,marginLeft:10},
    test:{borderStyle:'solid',borderWidth:3,borderColor:'black'}
  });

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
        <Map center={center} features={features}/>
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
              <Grid item container>
              <Grid item container>
              <p style={{color:'black'}}>Facilities</p>
              </Grid>
                <Grid item style={{flex:1}}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={state.checkedB}
                        //onChange={(e)=>{handleCheckbox(e.target.checked,'bank')}}
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
                        //onChange={(e)=>{handleCheckbox(e.target.checked,'bank')}}
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
                        //onChange={(e)=>{handleCheckbox(e.target.checked,'bank')}}
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
                        //onChange={(e)=>{handleCheckbox(e.target.checked,'bank')}}
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
                        //onChange={(e)=>{handleCheckbox(e.target.checked,'bank')}}
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
                    ]}
                >
                    <TableHeader>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Value
                        </TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell getContent={(r) => r.firstName}/>
                        <DataTableCell getContent={(r) => r.lastName}/>
                    </TableBody>
                </Table>
            </Page>
          </Document>
        </PDFViewer>
      </Dialog> : null}

        
		</Grid>
  );
};

export default Home;
