import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';
import backgroundImage from '../assets/wallpaperflare.com_wallpaper.jpg'; // Import your background image
import { Link ,useNavigate } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh', // Set height to viewport height
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
    backgroundImage: `url(${backgroundImage})`, // Set background image
    backgroundSize: 'cover', // Cover the entire container
    backgroundPosition: 'center', // Center the background image
    filter: 'blur(8px)', // Apply blur effect
  },
  content: {
    zIndex: 1,
  },
  formContainer: {
    maxWidth: 400,
    margin: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add a transparent white background
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
    borderRadius:'50px',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const isCityEmpty = city.trim() === '';
  const navigate=useNavigate();
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleGetWeather = async () => {
    if (!isCityEmpty) {                                                         
    try {
        const response = await axios.get(
            `https://api.weatherbit.io/v2.0/forecast/daily?city=${city},NC&key=635395237c214bb3b13baebbb198b5c2`
          );
          console.warn("Data",response.data);
          // navigate(`/weather-details/${city}`);    
    //   const { lat, lng } = response.data.results[0].geometry;
    //   window.location.href = `/weather-details/${lat}/${lng}`;
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
}
  };

  return (
    <div className={classes.root}>
      <div className={classes.background}></div>
      <Grid container spacing={3} className={`${classes.content} ${classes.formContainer}`}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Weather Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="City"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Country"
            variant="outlined"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            // error={isCountryEmpty && buttonClicked}
            // helperText={isCountryEmpty && buttonClicked ? 'Country cannot be empty' : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleGetWeather}
            className={classes.button}
            disabled={isCityEmpty}
          >
            Get Weather
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
