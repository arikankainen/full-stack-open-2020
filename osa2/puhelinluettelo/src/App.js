import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
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
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleFilter} />
      <h3>add a new</h3>
      <PersonForm handleSubmit={addPerson} name={newName} handleNameChange={handleNewName} number={newNumber} handleNumberChange={handleNewNumber} />
      <h3>Numbers</h3>
      <Numbers persons={personsToShow} />
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

const Numbers = ({persons}) => {
  return (
    <ul>
      {persons.map((person) => <Number key={person.name} person={person} />)}
    </ul>
  )
}

const Number = ({person}) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

export default App