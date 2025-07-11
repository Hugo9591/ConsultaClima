import styles from './App.module.css'
import Form from './components/Form/Form'
import useWeather from './hooks/useWeather'
import WeatherDetail from './components/WeatherDetail/WeatherDetail'
import Spinner from './components/Spinner/Spinner';
import Alert from './components/Alert/Alert';

function App() {

  const { weather, fetchWeather, notFound, hasWeatherData, loading } = useWeather();

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>

      <div className={styles.container}>
        <Form 
          fetchWeather={fetchWeather}/>

        {loading && <Spinner/>}
        
        {hasWeatherData && <WeatherDetail weather={weather}/>}

        {notFound && <Alert>Ciudad No Encontrada</Alert>}

        {/* {weather.main.temp_max} */}
        
      </div>
    </>
    
  )
}

export default App
