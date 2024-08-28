import { useState } from 'react'

const Person = ({person}) => {
  return (
  <p>{person.name} {person.number}</p>
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

  // <div>debug: {newName} {newNumber}</div>
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameAdd} 
          />
          <div>
            number:
          <input
            value={newNumber}
            onChange={handleNumberAdd} 
          />
          </div>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person =>
     <Person key={person.name} person={person} />
      )}
      </div>
    </div>
  )

}

export default App