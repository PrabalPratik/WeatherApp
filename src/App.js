import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

function App() {
  const [data, setData] = useState({})
  const [forecast, setForecast] = useState([])
  const [location, setLocation] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [unit, setUnit] = useState('metric')
  const [currentTime, setCurrentTime] = useState(moment().format('h:mm A'))

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=895284fb2d2c50a520ea537456963d9c`

  useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=895284fb2d2c50a520ea537456963d9c`
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=895284fb2d2c50a520ea537456963d9c`

            axios
              .get(geoUrl)
              .then((response) => {
                setData(response.data)
                setLocation(response.data.name)
              })
              .catch((error) => {
                setError('Failed to fetch location data')
              })

            axios
              .get(forecastUrl)
              .then((response) => {
                setForecast(response.data.list)
              })
              .catch((error) => {
                setError('Failed to fetch forecast data')
              })
          },
          (error) => {
            setError('Unable to retrieve your location')
          }
        )
      } else {
        setError('Geolocation is not supported by this browser')
      }
    }

    fetchUserLocation()
    const interval = setInterval(() => {
      setCurrentTime(moment().format('h:mm A'))
    }, 1000)

    return () => clearInterval(interval)
  }, [unit])

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setIsLoading(true)
      axios
        .get(url)
        .then((response) => {
          setData(response.data)
          setError('')
        })
        .catch((error) => {
          setError('Location not found')
        })
        .finally(() => {
          setIsLoading(false)
          setLocation('')
        })
    }
  }

  const getWindDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8
    return directions[index]
  }

  const formatUnixTimestamp = (unixTimestamp) => {
    return moment.unix(unixTimestamp).format('h:mm A')
  }

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric')
  }

  const renderForecast = () => {
    return forecast.filter((_, index) => index % 8 === 0).map((item) => (
      <div key={item.dt} className="forecast-item">
        <p>{moment.unix(item.dt).format('ddd')}</p>
        <img
          src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
          alt={item.weather[0].description}
        />
        <p>
          {unit === 'metric'
            ? `${item.main.temp.toFixed(0)}°C`
            : `${(((item.main.temp * 9) / 5) + 32).toFixed(0)}°F`}
        </p>
      </div>
    ))
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>
                {unit === 'metric'
                  ? `${data.main.temp.toFixed(0)}°C`
                  : `${(((data.main.temp * 9) / 5) + 32).toFixed(0)}°F`}
              </h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
          <div className="time">
            <p>{currentTime}</p>
          </div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {unit === 'metric'
                    ? `${data.main.feels_like.toFixed(0)}°C`
                    : `${(((data.main.feels_like * 9) / 10) + 32).toFixed(0)}°F`}
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <div>
                  <p className="bold">
                    {data.wind.speed.toFixed(1)}{' '}
                    {unit === 'metric' ? 'm/s' : 'mph'}{' '}
                    {getWindDirection(data.wind.deg)}
                  </p>
                  <p>Wind</p>
                </div>
              ) : null}
            </div>
            <div className="clouds">
              {data.clouds ? <p className="bold">{data.clouds.all}%</p> : null}
              <p>Cloud Cover</p>
            </div>
            <div className="sunrise">
              {data.sys ? (
                <div>
                  <p className="bold">{formatUnixTimestamp(data.sys.sunrise)}</p>
                  <p>Sunrise</p>
                </div>
              ) : null}
            </div>
            <div className="sunset">
              {data.sys ? (
                <div>
                  <p className="bold">{formatUnixTimestamp(data.sys.sunset)}</p>
                  <p>Sunset</p>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
      {data.name !== undefined && (
        <div className="forecast">
          <h2>5-Day Forecast</h2>
          <div className="forecast-container">{renderForecast()}</div>
        </div>
      )}
    </div>
  )
}

export default App
