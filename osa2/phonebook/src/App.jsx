/* eslint-disable react/prop-types */
import { useState , useEffect } from 'react'
import personService from './services/persons'

const Person = ({person , rm}) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={rm}>delete</button>
    </div>
  )
}

const Persons = ({persons, remove}) => {
  return (
  <div>{persons.map(person =>
    <Person key={person.name} person={person}
    rm={() => remove(person)} />
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

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="infomessage">
      {message}
    </div>
  )
}

const ErrorMessage = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [message, setMessage] = useState(null)
  const [eMessage, setEMessage] = useState(null)

  useEffect(() => {
      personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  //console.log('render', persons.length,'persons')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const names = persons.map(person => person.name)
    console.log(names)

    if (names.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook.
        Do you want to replace the old number with a new one?`)) {

        const personToFind = persons.find(person => person.name === newName)
        const id = personToFind.id
        const changedPerson = {...personToFind, number: newNumber}
        console.log({id},{newNumber});
        console.log(persons)
        
        personService
          .update(id,changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response.data))
            setNewName('')
            setNewNumber('')
            setMessage(`number for ${newName} changed to ${newNumber}`)
        setTimeout(() => {
          setMessage(null)
        },7000)
          })
          .catch(error => {
            setEMessage(`${newName} already removed`)
            setPersons(persons.filter(person => person.id !== id))
            setTimeout(()=> {
              setEMessage(null)
            },5000)
          })
      }
    }
    else {
    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length +1),
    }
      
    personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setMessage(`${newName} added to phonebook`)
        setTimeout(() => {
          setMessage(null)
        },5000)
        console.log(persons)
      })
    }
  }

  const removeName = (person) => {
    const id = person.id
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .remove(id)
      .then(response => {
        console.log(response)
        setPersons(persons.filter(person => person.id !== id))
        setMessage(`${person.name} deleted from phonebook`)
        setTimeout(() => {
          setMessage(null)
        },5000) 
      })
      .catch(error => {
        setEMessage(`${person.name} already removed`)
        setPersons(persons.filter(person => person.id !== id))
        setTimeout(()=> {
          setEMessage(null)
        },5000)
      })
    }
  }

  const handleNameAdd = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberAdd = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterText = (event) => {
    //console.log(event.target.value)
    {setFilterText(event.target.value)}
  }

  const filtered = persons.filter((person) => 
    person.name.toLowerCase().includes(filterText.toLowerCase())
)

  // <div>debug: {newName} {newNumber}</div>
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message}/>
      <ErrorMessage message={eMessage}/>
      <Filter ft={filterText} handleFT={handleFilterText}/>
     
      <h2>add new</h2>
      <PersonForm nName={newName} nNumb={newNumber} hNameAdd=
      {handleNameAdd} hNumbAdd={handleNumberAdd} aName={addName}/>
      
      <h2>Numbers</h2>
      <Persons persons={filtered} remove={removeName} />
    </div>
  )

}

export default App