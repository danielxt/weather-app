import './App.css';
import {TempWidget, HumidityWidget, IconWidget} from './Widget.js'
import { useState, useEffect } from 'react';
import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import citiesList from './citiesList.txt'



import {convertUnixToHoursAndMinutes, convertUnixToWeekdayDayMonth, convertCityNameToCityId} from './utils.js';
const api_key = 'a6a45909c28cd58903e60dee2e8f4923'


function App() {
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('')
  
  const [forecasts, setForecasts] = useState([])

  const [timezone, setTimeZone] = useState(0);

  const [darkModeOn, setDarkMode] = useState(false);
  
  const [modeClasses, setModeClasses] = useState('text-light bg-dark')
  const [borderClasses, setBorderClasses] = useState('border border-white border-thickness')

  const [fiveDayForecasts, setFiveDayForecasts] = useState([])
  // forecast

  const [cityId, setCityId] = useState('4984247')
  const [cityName, setCityName] = useState('Ann Arbor') // THE INPUT TRIGGER
 

    useEffect(() => {
      fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${api_key}&units=metric`)
      .then((res) => {
          return res.json();
      })
      .then((data) => {

          setTemp(data.list[0].main.temp);
          setHumidity(data.list[0].main.humidity)
          setCity(data.city.name)

          setWeather(data.list[0].weather[0].main)
          setForecasts(data.list.slice(0,5))
          setTimeZone(data.city.timezone)

          setFiveDayForecasts([data.list[4], data.list[12], data.list[20], data.list[28],data.list[36] ])
      });
  }, [cityId]);

  const [currentTemp, setCurrentTemp] = useState(0);
  const [feelsLikeTemp, setFeelsLikeTemp] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [currentWeather, setCurrentWeather] = useState('');
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState('')

  const [currentHumidity, setCurrentHumidity] = useState(0);
  const [currentPressure, setCurrentPressure] = useState(0);
  const [currentWindSpeed, setCurrentWindSpeed] = useState(0);
  const [currentVisibility, setCurrentVisibility] = useState(0);
  const [time, setCurrentTime] = useState('')
  const [date, setCurrentDate] = useState(0)

  

  // current weather
  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${api_key}&units=metric`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
      setCurrentTemp(data.main.temp)
      setFeelsLikeTemp(data.main.feels_like)
      setSunrise(convertUnixToHoursAndMinutes(data.sys.sunrise, data.timezone))

      setSunset(convertUnixToHoursAndMinutes(data.sys.sunset, data.timezone))
      setCurrentWeather(data.weather[0].main)
      setCurrentWeatherIcon(data.weather[0].icon)
      
      
 
      setCurrentTime(convertUnixToHoursAndMinutes(data.dt, data.timezone))

      setCurrentDate(convertUnixToWeekdayDayMonth(data.dt, data.timezone))


      setCurrentHumidity(data.main.humidity)
      setCurrentPressure(data.main.pressure)
      setCurrentWindSpeed(data.wind.speed)
      setCurrentVisibility(data.visibility)

        
    });
  }, [cityId]);

 
  // fix later
  const [cities, setCities] = useState([
    "Tokyo",
    "Delhi",
    "Shanghai",
    "Mexico City",
    "Ann Arbor",
    "Kuala Lumpur"
  ])
  fetch(citiesList)
    .then(r => r.text())
    .then(text => {
      setCities(text.split("\n"))
    });
  // const cities = [
  //   "Tokyo",
  //   "Delhi",
  //   "Shanghai",
  //   "Mexico City",
  //   "Ann Arbor",
  //   "Kuala Lumpur"
  // ]
  
  // dark/light mode checking
  useEffect(() => {
   
    if (darkModeOn) {
      setModeClasses('text-light bg-dark')
      setBorderClasses('border border-white border-thickness')
    }
    else {
      setModeClasses('text-dark bg-light')
      setBorderClasses('border border-dark border-thickness')
    }
  }, [darkModeOn]);


  
  return (
      
      <div className="App">
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous"></link>
        </head>
        <body class={modeClasses}>
          
          <div class='container'>
            <div class='row py-3'>
              <div class='col'>
                <FormControl component="fieldset">

      <FormGroup aria-label="position" row>
 
        <FormControlLabel
          value="bottom"
          control={<Switch color="primary"/>}
          label="Dark mode"
          labelPlacement="bottom"
         
          onChange={(nextMode) => {
            setDarkMode(!darkModeOn)
          }}
        />

      </FormGroup>
    </FormControl>




              </div>
              <div class='col'>
             
             
                <DropdownList
                placeholder="Enter city"
    data={cities} name='cityName'
    onChange={(nextCityName) => {
        var cityId = convertCityNameToCityId(nextCityName)
        setCityName(nextCityName)
        setCityId(cityId)
      }
  
    }
  />
           
  
                
              </div>
              <div class='col'>

              </div>
              
            </div>

         
            
            <div class='row my-2 text-center'>
              <div class='col-4 mx-2 border  align-items-center'>
              <br/>
           
              <div class='font-weight-bold'><h2>{city}</h2></div>
                <div class='font-weight-bold' style={{fontSize:60}}><b>{time}</b></div>
                <div>{date} </div>
             
                
              
               
              </div>
              <div class='col mx-2 border rounded'>
                <div class='row'>
                    <div class='col'>
                     
                        <p style={{fontSize:40}}><b>{currentTemp}°C</b> </p>
                        <p>Feels like: <b>{feelsLikeTemp}°C</b>  </p>
                        <br/>
                        <p><svg class="feather feather-sunrise" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" x2="12" y1="2" y2="9"/><line x1="4.22" x2="5.64" y1="10.22" y2="11.64"/><line x1="1" x2="3" y1="18" y2="18"/><line x1="21" x2="23" y1="18" y2="18"/><line x1="18.36" x2="19.78" y1="11.64" y2="10.22"/><line x1="23" x2="1" y1="22" y2="22"/><polyline points="8 6 12 2 16 6"/></svg>  Sunrise: {sunrise} </p>
                        <p><svg class="feather feather-sunset" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" x2="12" y1="9" y2="2"/><line x1="4.22" x2="5.64" y1="10.22" y2="11.64"/><line x1="1" x2="3" y1="18" y2="18"/><line x1="21" x2="23" y1="18" y2="18"/><line x1="18.36" x2="19.78" y1="11.64" y2="10.22"/><line x1="23" x2="1" y1="22" y2="22"/><polyline points="16 5 12 9 8 5"/></svg>  Sunset: {sunset} </p>
                   
                     
                    </div>
                    <div class='col'>
                      <p><IconWidget iconCode={currentWeatherIcon} size={130}/></p>
                      <p style={{fontSize:40}}><b>{currentWeather}</b></p>
                    </div>
                    <div class='col'>
                      <div class='row'>
                        <div class='col'>
                         
                        <p style={{fontSize:30}}>💦</p>
                        <p>{currentHumidity}%</p>
                        <p>Humidity</p>
                        </div>
                        <div class='col'>
                        <p style={{fontSize:30}}> 🌡</p>
                        <p>{currentPressure} hPa</p>
                        <p>Pressure</p>
                        </div>
                      </div>
                      <div class='row'>
                        <div class='col'>
                        <p style={{fontSize:30}}>💨</p>
                        <p>{currentWindSpeed} km/h</p>
                        <p>Wind speed</p>
                        </div>
                        <div class='col'>
                        <p style={{fontSize:30}}>👁</p>
                        <p>{currentVisibility} m</p>
                        <p>Visibility</p>
                          
                        </div>
                      </div>
                    </div>

                </div>
                
                
                
                
              </div>
            </div>



            {/* {Second row} */}
     
              <div class='row my-2'>
                <div class='col-4  border mx-2  rounded text-center'>
                  <h3><b>5 day forecast</b></h3>
                {fiveDayForecasts.map((forecast) => (
                    <div key={forecast.dt}>
                        <div class='row text-center'>
                          <div class='d-flex align-items-center justify-content-center col'><IconWidget iconCode={forecast.weather[0].icon} size={50}/></div>
                          <div class='d-flex align-items-center justify-content-center col'>{forecast.main.temp}°C</div>
                          <div class='d-flex align-items-center justify-content-center col'>{convertUnixToWeekdayDayMonth(forecast.dt, timezone)}</div>
                          
                          
                        </div>
                        
                    </div> 
                  ))}
                  
                </div>
                <div class='col border mx-2 rounded text-center'>
                  <h3><b> Hourly forecast</b></h3>
                  <div class='row '>
            
                  {forecasts.map((forecast) => (
                    <div key={forecast.dt} class='col'>
                        <p>{convertUnixToHoursAndMinutes(forecast.dt, timezone)}</p>
                        <p>{forecast.main.temp}°C</p>
                        <IconWidget iconCode={forecast.weather[0].icon}/>
                    </div> 
                  ))}
                  </div>
                 
                </div>
                
              </div>
              
        

          </div>
        </body>
     
     
          
   
        </div>
        
    
  );
}

export default App;
