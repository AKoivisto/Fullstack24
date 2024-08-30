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

const CountryLine = ({country}) => {
  return (
    <div>
      {country} it is
    </div>
  )
}

const CountryList = ({ft, countries}) => {
  //console.log('ft:',ft,countries);

  const countryList = countries.map(country => country.name.common)
  console.log({countryList});
  const filteredList = countryList.filter((country) =>
    country.toLowerCase().includes(ft.toLowerCase())
)
  console.log({filteredList})
  
  const countriesInList = countries.filter(country => country.name.common.includes(ft))
  console.log({countriesInList})

  if (filteredList.length > 10) {
    return(
      <p>Too many results.</p>
    )
  }
  else {
  return(
     <div>
       {filteredList.map(country =>
        <CountryLine key={country} country={country} />
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

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
        //console.log(countries);
        
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
      <CountryList ft={filterText} countries={countries}/>
    </div>
  )
}

export default App
