import React, { useState } from 'react'

const Entry = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const Numbers = ({ people }) => {
  return (
    <div>
      <h2>
        Numbers
      </h2>
      <ul>
        {people.map(person =>
          <Entry key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName) === false) {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')

    } else {
      window.alert(`${newName} is already in the phonebook`)
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const peopleToShow = persons.filter(person =>
    person.name.toLowerCase().includes(
      newFilter.toLowerCase()
    ))

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        <label htmlFor='filter'>Filter by name: </label>
        <input id='filter' value={newFilter} onChange={handleFilterChange} />
      </div>

      <h2>
        Add new
      </h2>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor='name'>Name: </label>
          <input id='name' value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <label htmlFor='number'>Number: </label>
          <input id='number' value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <Numbers people={peopleToShow} />
    </div>
  );
}

export default App;
