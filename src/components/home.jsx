import React,{useState} from 'react';

import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Map from './map'

const Home = () => {
	const [latitude,setLatitude]=useState();
  const [longitude,setLongitude]=useState();
  const [latt,setLat]=useState(7.488862);
  const [lngg,setLng]=useState(80.353441);
  
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
    console.log(data,type);
    if(data){
      const result = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=7.488862,80.353441&radius=1500&type=${type}&key=AIzaSyCOEhXSw6tr5bfmCDTVGvOQaFfwkJ4XPWM`)
      console.log(result.data.results);
    }

  }

  return (
		<Grid container>
      <Grid item>
      <Typography variant="subtitle1" gutterBottom style={{padding:"50px 100px 5px 340px"}}>
        Enter Cordinates (WGX) :
      </Typography>
      </Grid>
      <Grid item container style={{padding:"0px 100px 0px 340px"}} spacing={5}>
            <Grid item>
              <TextField onChange={(e)=>{handleLatitude(e.target.value);}} label="Lantitude" variant="outlined" size="small" />
            </Grid>
            <Grid item>
              <TextField onChange={(e)=>{handleLongitude(e.target.value);}} label="Lantitude" variant="outlined" size="small" />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleClick} color="primary">
                Submit
              </Button>
            </Grid>
      </Grid>
      <Typography variant="subtitle1" gutterBottom style={{padding:"20px 100px 0px 340px"}}>
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
        <Map center={center}/>
      </div>
        
		</Grid>
  );
};

export default Home;
