import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  return (
    <div>
      <Filter filter={filter} handleChange={handleFilter} />
      <Countries countries={filteredCountries} handleClick={handleFilter} />
    </div>
  )
}

const Filter = ({filter, handleChange}) => {
  return (
    <div>find countries <input value={filter} onChange={handleChange} /></div>
  )
}

const Countries = ({countries, handleClick}) => {
  if (countries.length === 0) return (
    <div>No matches, specify another filter</div>
  )
  else if (countries.length === 1) return (
    <div><CountryInfo country={countries[0]} /></div>
  )
  else if (countries.length > 10) return (
    <div>Too many matches, specify another filter</div>
  )
  else return (
    <div>{countries.map(country => <Country key={country.name} country={country} handleClick={handleClick} />)}</div>
  )
}

const Country = ({country, handleClick}) => {
  return (
    <div>{country.name} <button value={country.name} onClick={handleClick}>show</button></div>
  )
}

const CountryInfo = ({country}) => {
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY.trim()
  const address = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`

  useEffect(() => {
    axios
    .get(address)
    .then(response => {
      setWeather(response.data)
    })
  }, [address])

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img alt={`${country.demonym} flag`} src={country.flag} height="150" />
      <h2>Weather in {country.capital}</h2>
      <Weather weather={weather} />
    </div>
  )
}

const Weather = ({weather}) => {
  if (Object.keys(weather).length > 0) return (
    <div>
      <div><strong>temperature: </strong>{weather.current.temperature} Celcius</div>
      {weather.current.weather_icons.map(icon => <img key={icon} alt="weather_icon" src={icon} />)}
      <div><strong>wind: </strong>{weather.current.wind_speed} {weather.request.unit} direction {weather.current.wind_dir}</div>
    </div>
  )
  else return (
    <div>Fetching weather...</div>
  )
}

export default App