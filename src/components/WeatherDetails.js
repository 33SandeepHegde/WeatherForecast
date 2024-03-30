import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Audio } from 'react-loader-spinner'
import {  Typography, makeStyles, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import backgroundImage from '../assets/wallpaperflare.com_wallpaper.jpg';
import weatherBackImg from '../assets/skyback.jpg'
import locationImg from '../assets/—Pngtree—pin location icon with map_7261847.png'

import warmImg2 from '../assets/abstract-background-featuring-sky-clouds.jpg'
import { Link  } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
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
    filter: 'blur(8px)'
  },
  detailsContainer: {
    width: '80%',
    height: '80%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  row: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '100%',
    height: '30%',
    background: `url(${warmImg2})`,
    overflowX: 'auto', 
  },
  firstRow: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    background: `url(${weatherBackImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(2),
    color: 'white',
    boxSizing: 'border-box',
    height: '70%'
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    filter: 'blur(10px)'
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '6rem',
    color: 'white',
    marginBottom: theme.spacing(2),
    animation: '$fadeIn 1s ease-in'
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  locationImg: {
    maxHeight: 60,
    maxWidth: 60,
    marginRight:5,
  },
  weathercontanerright: {
    display: 'flex',
    position: 'relative'
  },
  frecastcardfirst: {
    width: '30%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#917e7e42',
    borderRight: '1px solid #000',
    borderLeft: '1px solid #000',
    height: '97%',
    borderRadius: '12px',
    margin: '2px',
    color: '#fff',
    animation: '$fadeIn 1s ease-in'
  },
  frecastcard: {
    width: 'calc(14.2857% - 20px)',
    height: '100%',
    background: '#f0f0f0',
    borderRight: '1px solid #000',
    borderLeft: '1px solid #000',
    boxSizing: ' border-box',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: '5px',
    padding: theme.spacing(2),
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgb(255 255 255 / 0%)',
    // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    maxWidth: '300px',
    animation: '$fadeIn 1s ease-in'
  },
  temp: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: theme.spacing(1),
  },
  datetime: {
    fontSize: '1rem',
    color: '#fff',
    background: '#3991c04f',
    borderRadius: '12px',
    padding: '2px 12px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  imgcode: {
    width: '40px',
    height: '40px',
  },
  imgcodefirst: {
    width: '100px',
    height: '100px',
  },
  frecastcardfirstContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  back:{
    background:'white',
    padding:'5px 30px',
    margin:'20px',
     borderRadius:'12px',
     color:'black',
     textDecoration: 'none',
  },
  loaderback:{
    background:'black',
    padding:'5px 30px',
    margin:'20px',
     borderRadius:'12px',
     color:'white',
     textDecoration: 'none',
  },
  loader:{
      position: 'fixed',
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      backgroundColor: '#ffffff',
      padding: '20px' ,
      textAlign:'center',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    
  }
}));

const WeatherDetails = () => {
  const classes = useStyles();
  const { city ,country} = useParams();
  const [weather, setWeather] = useState(null);
  const getImageSource = (iconCode) => {
    switch (iconCode) {
      case 200:
        return 'https://cdn.weatherbit.io/static/img/icons/t01d.png'; 
      case 201:
        return 'https://cdn.weatherbit.io/static/img/icons/t02d.png'; 
      case 202:
        return 'https://cdn.weatherbit.io/static/img/icons/t03d.png'; 
      case 230:
        return 'https://cdn.weatherbit.io/static/img/icons/t04d.png'; 
      case 231:
        return 'https://cdn.weatherbit.io/static/img/icons/t04d.png';
      case 232:
          return 'https://cdn.weatherbit.io/static/img/icons/t04d.png';
      case 233:
          return 'https://cdn.weatherbit.io/static/img/icons/t05d.png';
      case 300:
          return 'https://cdn.weatherbit.io/static/img/icons/d01d.png';                                                                            
      case 301:
          return 'https://cdn.weatherbit.io/static/img/icons/d02d.png';
      case 302:
          return 'https://cdn.weatherbit.io/static/img/icons/d03d.png';
      case 500:
          return 'https://cdn.weatherbit.io/static/img/icons/r01d.png';
      case 501:
          return 'https://cdn.weatherbit.io/static/img/icons/r02d.png';
      case 502:
          return 'https://cdn.weatherbit.io/static/img/icons/r03d.png';
      case 511:
          return 'https://cdn.weatherbit.io/static/img/icons/f01d.png';
          case 520:
          return 'https://cdn.weatherbit.io/static/img/icons/r04d.png';
          case 521:
          return 'https://cdn.weatherbit.io/static/img/icons/r05d.png';
          case 522:
          return 'https://cdn.weatherbit.io/static/img/icons/r06d.png';
          case 600:
          return 'https://cdn.weatherbit.io/static/img/icons/s01d.png';
          case 601:
          return 'https://cdn.weatherbit.io/static/img/icons/s02d.png';
          case 602:
          return 'https://cdn.weatherbit.io/static/img/icons/s03d.png';
          case 610:
            return 'https://cdn.weatherbit.io/static/img/icons/s04d.png';
            case 611:
            return 'https://cdn.weatherbit.io/static/img/icons/s05d.png';
            case 621:
            return 'https://cdn.weatherbit.io/static/img/icons/s01d.png';
            case 622:
            return 'https://cdn.weatherbit.io/static/img/icons/s02d.png';
            case 623:
            return 'https://cdn.weatherbit.io/static/img/icons/s06d.png';
            case 700:
            return 'https://cdn.weatherbit.io/static/img/icons/a01d.png';
            case 711:
            return 'https://cdn.weatherbit.io/static/img/icons/a02d.png';
            case 721:
            return 'https://cdn.weatherbit.io/static/img/icons/a03d.png';
            case 731:
            return 'https://cdn.weatherbit.io/static/img/icons/a04d.png';
            case 741:
            return 'https://cdn.weatherbit.io/static/img/icons/a05d.png';
            case 751:
            return 'https://cdn.weatherbit.io/static/img/icons/a06d.png';
            case 800:
            return 'https://cdn.weatherbit.io/static/img/icons/c01d.png';
            case 801:
            return 'https://cdn.weatherbit.io/static/img/icons/c02d.png';
            case 802:
            return 'https://cdn.weatherbit.io/static/img/icons/c02d.png';
            case 803:
            return 'https://cdn.weatherbit.io/static/img/icons/c03d.png';
            case 804:
            return 'https://cdn.weatherbit.io/static/img/icons/c04d.png';
            case 900:
            return 'https://cdn.weatherbit.io/static/img/icons/u00d.png';
      default:
        return 'default.png'; 
    }
  };
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${country}&key=635395237c214bb3b13baebbb198b5c2`
        );
        // console.log(response.data);
        setWeather(response.data);
        // console.log("weather",response.data.data[0].weather.description);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();

  }, [city ,country]);
  
  if (!weather) {
    return <div>
      <div className={classes.loader}>
      <Audio
  height="80"
  width="80"
  radius="9"
  color="blue"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
<Typography variant="body1" gutterBottom >Looking for a result</Typography>
<Link to="/" className={classes.loaderback}>Back</Link>
      </div>
     
    </div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.background}></div>
      <Paper className={classes.detailsContainer}>
        
        <div className={classes.firstRow}>
        <div className={classes.backgroundOverlay}></div>
        <Typography variant="h4" gutterBottom className={classes.title}>
        {weather.city_name}
        </Typography>
        <div className={classes.weathercontanerright}>

           <div className={classes.weathercontanerrightlogo}>
          <img className={classes.locationImg}src={locationImg} alt="location" />
           </div>
           <div className={classes.weathercontanerrightcontent}>
           <Typography variant="body1"> {weather.country_code}</Typography>
          <Typography variant="body1"> {weather.timezone}</Typography>
          
           </div>
          
          </div>
        </div>
        <div className={classes.row}>
        <div className={classes.backgroundOverlay}></div>
          {
            weather ?
            weather.data.slice(0, 7).map((item,index)=>index === 0 ?(
              <div className={classes.frecastcardfirst}>
                <div className={classes.frecastcardfirstContent}>
                <Typography variant="h2">{item.temp}°</Typography>
              <Typography variant="body1"  className={classes.datetime}>Today </Typography>
              <Typography variant="body1">{item.weather.description}</Typography>
                </div>
                <div className={classes.frecastcardfirstLogo}>
                  <img src={getImageSource(item.weather.code)} className={classes.imgcodefirst} alt={item.weather.description} />

                </div>
                 
             
            </div>
            ):(
<div className={classes.frecastcard}>
              <Typography variant="body1" className={classes.datetime}>{item.datetime} </Typography>
              {/* <Typography variant="body1">{item.weather.description}</Typography> */}
              <Typography variant="body1"  className={classes.temp}>{item.temp}°</Typography>
              <img src={getImageSource(item.weather.code)} className={classes.imgcode} alt={item.weather.description} />
            </div>
            )
            )
            :
            <div>
            <h3 className='no-result'>No Result found</h3>
        </div>
          }
         
        </div>
      </Paper>
      <Link className={classes.back} to="/">Back</Link>
    </div>
  );
};

export default WeatherDetails;
