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
      <Countries countries={filteredCountries} />
    </div>
  )
}

const Filter = ({filter, handleChange}) => {
  return (
    <div>find countries <input value={filter} onChange={handleChange} /></div>
  )
}

const Countries = ({countries}) => {
  if (countries.length === 0) return (
    <div>No matches, specify another filter</div>
  )
  if (countries.length === 1) return (
    <div><CountryInfo country={countries[0]} /></div>
  )
  else if (countries.length > 10) return (
    <div>Too many matches, specify another filter</div>
  )
  else return (
    <div>{countries.map(country => <Country key={country.name} country={country} />)}</div>
  )
}

const Country = ({country}) => {
  return (
    <div>{country.name}</div>
  )
}

const CountryInfo = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img alt={`${country.demonym} flag`} src={country.flag} height="150" />
    </div>
  )
}

export default App