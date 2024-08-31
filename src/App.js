import './App.css';
import {TempWidget, HumidityWidget, IconWidget} from './Widget.js'
import { useState, useEffect } from 'react';
import "react-widgets/styles.css";
import cityData from './city.list.json'
import DropdownList from "react-widgets/DropdownList";
const api_key = 'a6a45909c28cd58903e60dee2e8f4923'



function App() {
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('')
  
  const [forecasts, setForecasts] = useState([])

  

  const [fiveDayForecasts, setFiveDayForecasts] = useState([])
  // forecast

  const [cityId, setCityId] = useState('1850147')
  const [cityName, setCityName] = useState('Tokyo') // THE INPUT TRIGGER
 

    useEffect(() => {
      fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${api_key}&units=metric`)
      .then((res) => {
          return res.json();
      })
      .then((data) => {

          setTemp(data.list[0].main.temp);
          setHumidity(data.list[0].main.humidity)
          setCity(data.city.name)

          /// this is wrong - doesnt reflect chosen timezon
          // var now = new Date()
          // setDate(now.toDateString())
          // setTime(now.toLocaleTimeString())

          setWeather(data.list[0].weather[0].main)
          setForecasts(data.list.slice(0,5))

          setFiveDayForecasts([data.list[4], data.list[12], data.list[20], data.list[28],data.list[36] ])
        
          // console.log(data.list)
      });
  }, [cityId]);

  const [currentTemp, setCurrentTemp] = useState(0);
  const [feelsLikeTemp, setFeelsLikeTemp] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [currentWeather, setCurrentWeather] = useState('');

  const [currentHumidity, setCurrentHumidity] = useState(0);
  const [currentPressure, setCurrentPressure] = useState(0);
  const [currentWindSpeed, setCurrentWindSpeed] = useState(0);
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
      var sunriseTime = new Date()
      sunriseTime.setSeconds(data.sys.sunrise)

      setSunrise(sunriseTime.toISOString().substr(11, 8))

      var sunsetTime = new Date()
      sunsetTime.setSeconds(data.sys.sunset)
      setSunset(sunsetTime.toISOString().substr(11, 8))
      setCurrentWeather(data.weather[0].main)

      var unixTime = data.dt + data.timezone
      const dateObj = new Date(unixTime * 1000)
      const utcString = dateObj.toUTCString();
 
      setCurrentTime(utcString)

  
      let date = new Date(data.dt  * 1000)
      setCurrentDate(date.toLocaleDateString())


      setCurrentHumidity(data.main.humidity)
      setCurrentPressure(data.main.pressure)
      setCurrentWindSpeed(data.wind.speed)

        
    });
  }, [cityId]);

 
  // fix later
  const cities = [
    "Tokyo",
    "Delhi",
    "Shanghai",
    "Sao Paulo",
    "Mexico City",
    "Ann Arbor"
  ]
  function convertCityNameToCityId(cityName) {
    for (let i = 0; i < cityData.length; i++) {
      if (cityData[i].name == cityName) {
        return cityData[i].id
      }
    }
    return 1850144
  }

  
  return (
      
      <div className="App">
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous"></link>
        </head>
        <body class='bg-dark text-light'>
          <div class='container'>
            <div class='row'>
              <div class='col'>

              </div>
              <div class='col'>
             
             
                <DropdownList
                placeholder="Enter city"
    data={cities} name='cityName' defaultValue={"Tokyo"}
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

            {/* First row */}
            <div class='row text-center  '>
              <div class='col-4 border border-white rounded'>
                <p class='font-weight-bold'>{city}</p>
                <p class='font-weight-bold'><h1>{time}</h1> </p>
                <p>{date} </p>
              </div>
              <div class='col border border-white rounded'>
                <p>Current temp: {currentTemp} </p>
                <p>Feels like: {feelsLikeTemp} </p>
                <p>Sunrise: {sunrise} </p>
                <p>Sunset: {sunset}</p>
                <p>Current weather: {currentWeather}</p>
                <p>Humidity: {currentHumidity}%</p>

                <p>Pressure: {currentPressure} hPa</p>
                <p>Wind: {currentWindSpeed} km/h</p>
              </div>
            </div>



            {/* {Second row} */}
     
              
              <div class='row'>
                <div class='col-4 border border-white rounded text-center'>
                {fiveDayForecasts.map((forecast) => (
                    <div key={forecast.dt} class='col'>
                        <p>{forecast.dt_txt}</p>
                        <p>{forecast.main.temp}°C</p>
                        <IconWidget iconCode={forecast.weather[0].icon}/>
                    </div> 
                  ))}
                  
                </div>
                <div class='col border border-white rounded text-center'>
                  <p class='font-weight-bold text-center'>Hourly forecast:</p>
                  <div class='row '>
            
                  {forecasts.map((forecast) => (
                    <div key={forecast.dt} class='col'>
                        <p>{forecast.dt_txt}</p>
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
