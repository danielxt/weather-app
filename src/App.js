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
     
          <header className="App-header">
            <p>The weather is : {weather}</p>
            <p>Location: {city}</p>
            <p>Time: {time} </p>
            <p>Date: {date} </p>

            {forecasts.map((forecast) => (
              
              <div key={forecast.dt}>
                  <p>{forecast.dt_txt}</p>
                  <p>{forecast.main.temp} C</p>
                  <p>{forecast.weather[0].main} </p>
                  <IconWidget iconCode={forecast.weather[0].icon}/>
              </div> 
            ))}
      </header>
    </div>
    
  );
}

export default App;
