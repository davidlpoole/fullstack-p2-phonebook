import React, { useState, useEffect } from 'react'
import peopleService from './services/people'

import { Form } from './components/Form'
import { InputField } from './components/InputField'
import { Entries } from './components/Entries'
import { Heading } from './components/Heading'

const App = () => {

  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
        setPeople(initialPeople)
      })
  }, [])

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
      peopleService
        .create(personObject)
        .then(returnedPerson => {
          setPeople(people.concat(personObject))
          setNewName('')
          setNewNumber('')
        })
    } else {
      window.alert(`${newName} is already in the phonebook`)
    }
  }

  const deletePerson = id => {
    let person = people.find(p => p.id === id)
    if (!window.confirm(`Are you sure you want to delete '${person.name}'?`)) return;
    peopleService
      .remove(id)
      .then(() => {
        alert(`Deleted '${person.name}' succesfully`)
        setPeople(people.filter(p => p.id !== id))
      })
  }

  const peopleToShow = people.filter(person =>
    person.name.toLowerCase().includes(
      newFilter.toLowerCase()
    ))

  return (
    <div>

      <h1>Phonebook</h1>

      <Heading text='Add new' />

      <Form
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <Heading text='Entries' />

      <InputField
        htmlFor='filter'
        label='Filter by Name: '
        type='text'
        value={newFilter}
        onChange={handleFilterChange}
      />

      <Entries people={peopleToShow} onDelete={deletePerson} />

    </div>
  );
}

export default App;
