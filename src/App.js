import './App.css';
import {TempWidget, HumidityWidget, IconWidget} from './Widget.js'
import { useState, useEffect } from 'react';
const api_key = 'a6a45909c28cd58903e60dee2e8f4923'

function App() {
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('')
  const [time, setTime] = useState(0)
  const [date, setDate] = useState(0)
  const [forecasts, setForecasts] = useState([])

  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=4984247&appid=${api_key}&units=metric`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {

        setTemp(data.list[0].main.temp);
        setHumidity(data.list[0].main.humidity)
        setCity(data.city.name)


        var now = new Date()
        setDate(now.toDateString())
        setTime(now.toLocaleTimeString())

        setWeather(data.list[0].weather[0].main)

        setForecasts(data.list.slice(0,5))
      
        // console.log(data.list)
    });
}, []);
  return (
      
      <div className="App">
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous"></link>
        </head>
        <body class='bg-dark text-light'>
          <div class='container'>

            {/* First row */}
            <div class='row text-center '>
              <div class='col-4 bg-danger rounded'>
                <p class='font-weight-bold'>{city}</p>
                <p class='font-weight-bold'><h1>{time}</h1> </p>
                <p>{date} </p>
              </div>
              <div class='col'>

              </div>
            </div>



            {/* {Second row} */}
     
              
              <div class='row'>
                <div class='col-4'>
                  
                </div>
                <div class='col bg-warning rounded text-center'>
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
