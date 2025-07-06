import { useEffect } from "react"
import { type Weather } from "../../hooks/useWeather"
import { formatTemperature } from "../../utils"
import styles from './WeatherDetail.module.css'

type WeatherDetailProps = {
    weather: Weather
}

export default function WeatherDetail({weather} : WeatherDetailProps) {

  useEffect(() => {
    if(!weather) return
    if(weather.main.temp < 5){
      document.body.className=styles.fondoFrio
    }
    else if(weather.main.temp > 25){
      document.body.className='fondoCalor'
    }
  },[weather.main.temp])

  
  return (
    <div className={styles.container}>
        <h2>{weather.name}</h2>
        <p className={styles.current}>{ formatTemperature( weather.main.temp )}&deg;C</p>
        <div className={styles.temperatures}>
            <p>Min: <span>{ formatTemperature( weather.main.temp_min )}&deg;C</span> </p>
            <p>Max: <span>{ formatTemperature( weather.main.temp_max )}&deg;C</span> </p>
        </div>
    </div>
  )
}
