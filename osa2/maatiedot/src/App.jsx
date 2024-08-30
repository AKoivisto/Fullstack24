/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import countryService from './services/countries'


const Filter = ({ft, handleFT}) => {
  return (
    <form>
  <div>
    find countries: 
    <input
      value={ft}
      onChange={handleFT}
    />
  </div>
  </form>
  )

}

const CountryLine = ({country, handleClick}) => {
  return (
    <div>
      {country}
      <button onClick={()=> handleClick(country)}>
        show
      </button>
    </div>
  )
}

const Weather = ({location}) => {
  const [weather, setWeather] = useState(undefined)
  const lat = location[0]
  const lon = location[1]
  
  useEffect(() => {
    countryService
    .getWeather(lat,lon)
    .then(response => {
      setWeather(response.data)
      //console.log(weather)
    })
  },[])

  if(!weather) {
    return null
  }

  const temps = weather.main
  const temp = Math.round((temps.temp - 272.15))
  const wind = weather.wind.speed
  //console.log(temp)
  const icon = weather.weather[0].icon
  //console.log(icon);
  

  return (
    <div>
    <p>temperature: {temp} C</p>
    <p>wind: {wind} m/s</p>
    <img className="icon" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt ="icon not found"/>
    </div>
  )
}

const CountryStats = ({country}) => {
  console.log(country);
  const languages = Object.values(country.languages)
  console.log(languages)
  //const langi = languages.map(language => language +'a' )
  //console.log(langi)
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <p>region: {country.region} </p>
      </div>
      <h2>Languages</h2>
      <ul> 
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
      </ul>
      <img src={country.flags.png} alt ="flag not found"/>
      <h3>Weather in {country.capital}</h3>
      <Weather location={country.capitalInfo.latlng} />
    </div>
  )
}

const CountryList = ({ft, countries, handleClick}) => {
  //console.log('ft:',ft,countries);
  const countryList = countries.map(country => country.name.common)
  //console.log({countryList});
  const filteredList = countryList.filter((country) =>
    country.toLowerCase().includes(ft.toLowerCase())
)
  //console.log({filteredList})
  
  const countriesInList = countries.filter(country => country.name.common.toLowerCase().includes(ft.toLowerCase()))
  //console.log({countriesInList})

  if (filteredList.length > 10) {
    return(
      <p>Too many results. Please specify.</p>
    )
  }
  if (filteredList.length === 1) {
    return(
      <CountryStats country={countriesInList[0]} />
    )
  }
  else {
  return(
     <div>
       {filteredList.map(country =>
        <CountryLine key={country} country={country} handleClick={handleClick} />
       )}
     </div>
  )
  }
}

function App() {
  const [filterText, setFilterText] = useState('')
  const [countries, setCountries] = useState(null)

  const handleFilterText = (event) => {
    console.log(event.target.value)
    {setFilterText(event.target.value)}
  }

  const handleClick = ((country) => {
    console.log('show')
    setFilterText(country)
    console.log(country)
  })

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
        console.log(countries);
        
      })
  }, [])

  if(!countries) {
    return null
  }

  //console.log(countries)
  console.log('filter text:' , filterText);
  
  return (
    <div>
      <h1>Countries</h1>
      <Filter ft={filterText} handleFT={handleFilterText}/>
      <CountryList ft={filterText} handleClick={handleClick} countries={countries}/>
    </div>
  )
}

export default App
