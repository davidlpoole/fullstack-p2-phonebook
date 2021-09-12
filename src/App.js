import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Form } from './components/Form'
import { InputField } from './components/InputField'
import { Entries } from './components/Entries'

const App = () => {

  const [people, setPeople] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/people')
      .then(response => {
        console.log('promise fulfilled')
        setPeople(response.data)
      })
  }, [])
  console.log('render', people.length, 'notes')

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (people.map(person => person.name).includes(newName) === false) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: people.length + 1,
      }
      setPeople(people.concat(personObject))
      setNewName('')
      setNewNumber('')

    } else {
      window.alert(`${newName} is already in the phonebook`)
    }
  }

  const peopleToShow = people.filter(person =>
    person.name.toLowerCase().includes(
      newFilter.toLowerCase()
    ))


  return (
    <div>
      <h1>Phonebook</h1>

      <h2>
        Add new
      </h2>
      <Form
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>
        Numbers
      </h2>
      <InputField
        htmlFor='filter'
        label='Filter by Name: '
        type='text'
        value={newFilter}
        onChange={handleFilterChange}
      />

      <Entries people={peopleToShow} />
    </div>
  );
}

export default App;
