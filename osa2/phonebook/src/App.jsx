import { useState } from 'react'

const Person = ({person}) => {
  return (
  <p>{person.name} {person.number}</p>
  )
}

const Persons = ({persons}) => {

  return (
  <div>{persons.map(person =>
    <Person key={person.name} person={person} />
     )}
  </div>
  )
}

const Filter = ({ft, handleFT}) => {
  return (
  <form>
  <div>
    filter:
    <input
      value={ft}
      onChange={handleFT}
    />
  </div>
  </form>
)
}

const PersonForm = ({nName, nNumb, hNameAdd, hNumbAdd, aName}) => {
  return (
    <form>
        <div>
          name:
          <input
            value={nName}
            onChange={hNameAdd} 
          />
          <div>
            number:
          <input
            value={nNumb}
            onChange={hNumbAdd} 
          />
          </div>
        </div>
        <div>
          <button type="submit" onClick={aName}>add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Test Tester', number: '0451207172' },
    { name: 'Testers dad', number: '0451207173' },
    { name: 'A. Hella', number: '20502030-1' },
    { name: 'Vesa Lappalaine', number: '085028200' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log(newName)

    const names = persons.map(person => person.name)
    console.log(names)

    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length +1),
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameAdd = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberAdd = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterText = (event) => {
    console.log(event.target.value)
    {setFilterText(event.target.value)}
  }

  const filtered = persons.filter((person) => 
    person.name.toLowerCase().includes(filterText.toLowerCase())
)

  // <div>debug: {newName} {newNumber}</div>
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter ft={filterText} handleFT={handleFilterText}/>
     
      <h2>add new</h2>
      <PersonForm nName={newName} nNumb={newNumber} hNameAdd=
      {handleNameAdd} hNumbAdd={handleNumberAdd} aName={addName}/>
      
      <h2>Numbers</h2>
      <Persons persons={filtered} />
    </div>
  )

}

export default App