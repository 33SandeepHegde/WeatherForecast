import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, makeStyles, Paper } from '@material-ui/core';
import axios from 'axios';
import backgroundImage from '../assets/wallpaperflare.com_wallpaper.jpg'; 
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh', 
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    filter: 'blur(8px)', 
  },
  content: {
    zIndex: 1,
  },
  formContainer: {
    maxWidth: 400,
    margin: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
    borderRadius:'50px',
  },
 inpu:{
  marginBottom:'10px',
 }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate=useNavigate();
  const isCountryEmpty = country.trim() === '';
  const isCityEmpty = city.trim() === '';
  const handleGetWeather = async () => {
    setButtonClicked(true);
    if (!isCountryEmpty && !isCityEmpty) {
      try {
        const response = await axios.get(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${country}&key=635395237c214bb3b13baebbb198b5c2`
        );
        console.warn("Data",response.data);
         navigate(`/weather-details/${city}/${country}`); 
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.background}></div>
      <Grid container justify="center" alignItems="center" className={`${classes.content}`}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper className={classes.formContainer}>
            <Typography variant="h4" align="center" gutterBottom>
              Weather Forecast
            </Typography>
            <TextField className={classes.inpu}
              fullWidth
              label="City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              error={isCityEmpty && buttonClicked}
              helperText={isCityEmpty && buttonClicked ? 'City cannot be empty' : ''}
            />
            <TextField className={classes.inpu}
              fullWidth
              label="Country"
              variant="outlined"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              error={isCountryEmpty && buttonClicked}
              helperText={isCountryEmpty && buttonClicked ? 'Country cannot be empty' : ''}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleGetWeather}
              className={classes.button}
              disabled={isCountryEmpty && isCityEmpty}
            >
              Get Weather
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
