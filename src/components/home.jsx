import React,{useState} from 'react';

import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm } from 'react-hook-form';

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
  const { register } = useForm({
    mode: 'onBlur',
  });
  
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
        const result = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=${type}&key=AIzaSyCOEhXSw6tr5bfmCDTVGvOQaFfwkJ4XPWM`)
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
		<Grid container>
      <Grid item>
      <Typography variant="subtitle1" gutterBottom style={{padding:"50px 100px 5px 340px"}}>
        Enter Cordinates (WGX) :
      </Typography>
      </Grid>
      <Grid item container style={{padding:"0px 100px 0px 340px"}} spacing={5}>
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
      <Typography variant="subtitle1" gutterBottom style={{padding:"0px 100px 0px 340px"}}>
        Select Features :
      </Typography>
      <Grid item container style={{padding:"0px 100px 50px 340px"}} spacing={5}>
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
      <div style={{padding:"0px 340px"}}>
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
              </Grid>
           </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Generate
          </Button>
        </DialogActions>
      </Dialog>
        
		</Grid>
  );
};

export default Home;
