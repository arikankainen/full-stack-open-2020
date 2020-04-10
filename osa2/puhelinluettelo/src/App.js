import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        alert(`Error retrieving phonebook from server`)
      })
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDeleteNumber = (event) => {
    const id = +event.target.value
    const nameToDelete = persons.filter(person => person.id === id)[0].name
    
    if (window.confirm(`Delete ${nameToDelete} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`Error deleting person from server`)
        })
    }
  }

  const handleFilter = (event) => {
    setShowAll(
      (event.target.value.length > 0) ? false : true
    )
    setFilter(event.target.value)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    let alreadyAdded = false
    persons.forEach((item, index, array) => {
      if (item.name === newName) alreadyAdded = true
    })

    if (alreadyAdded) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert(`Error adding ${newName} to server`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleFilter} />
      <h3>add a new</h3>
      <PersonForm handleSubmit={addPerson} name={newName} handleNameChange={handleNewName} number={newNumber} handleNumberChange={handleNewNumber} />
      <h3>Numbers</h3>
      <Numbers persons={personsToShow} handleDelete={handleDeleteNumber} />
    </div>
  )
}

const Filter = ({filter, handleChange}) => {
  return (
    <div>filter shown with <input value={filter} onChange={handleChange} /></div>
  )
}

const PersonForm = ({handleSubmit, name, handleNameChange, number, handleNumberChange}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>name: <input value={name} onChange={handleNameChange} /></div>
      <div>number: <input value={number} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Numbers = ({persons, handleDelete}) => {
  return (
    <ul>
      {persons.map((person) => <Number key={person.name} person={person} handleDelete={handleDelete} />)}
    </ul>
  )
}

const Number = ({person, handleDelete}) => {
  return (
    <li>
      <div>{person.name} {person.number} <button value={person.id} onClick={handleDelete}>delete</button></div>
    </li>
  )
}

export default App