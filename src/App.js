import React, { useState, useEffect } from 'react'
import peopleService from './services/people'

import './index.css'
import { Form } from './components/Form'
import { InputField } from './components/InputField'
import { Entries } from './components/Entries'
import { Heading } from './components/Heading'



const App = () => {

  // initialise states
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('neutral')

  // GET all records on first load
  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
        setPeople(initialPeople)
      })
  }, [])


  // Event Handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  // CREATE NEW
  const addPerson = (event) => {
    event.preventDefault()

    // If person does not already exist
    if (people.map(person => person.name).includes(newName) === false) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      peopleService
        .create(personObject)
        .then(returnedPerson => {
          setPeople(people.concat(returnedPerson))
          displayNotification(`Added ${returnedPerson.name}`, 'good')
          setNewName('')
          setNewNumber('')
        })
    } else { // if person exists then UPDATE
      if (!window.confirm(`${newName} is already in the phonebook, overwrite number?`)) return;
      let person = people.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }

      peopleService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPeople(
            people.map(person =>
              person.id !== returnedPerson.id ? person : returnedPerson))
          displayNotification(`Updated '${person.name}' succesfully`, 'good')
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          displayNotification(`The person '${person.name}' was already deleted on the server`, 'bad')
          setPeople(people.filter(p => p.id !== person.id))
        })
    }
  }

  // DELETE
  const deletePerson = id => {
    let person = people.find(p => p.id === id)
    if (!window.confirm(`Are you sure you want to delete '${person.name}'?`)) return;
    peopleService
      .remove(id)
      .then(() => {
        displayNotification(`Deleted '${person.name}' succesfully`, 'good')
        setPeople(people.filter(p => p.id !== id))
      })
      .catch(error => {
        displayNotification(`The person '${person.name}' was already deleted on the server`, 'bad')
        setPeople(people.filter(p => p.id !== person.id))
      })
  }

  // FILTER
  const peopleToShow = people.filter(person =>
    person.name.toLowerCase().includes(
      newFilter.toLowerCase()
    ))


  // Display NOTIFICATION with timeout
  const displayNotification = (message, type) => {
    setNotificationType(type)
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
      setNotificationType('neutral')
    }, 5000)
  }
  // Set notification message and style (good/bad/neutral)
  const Notification = ({ message, type }) => {
    const colors = {
      'neutral': 'black',
      'good': 'green',
      'bad': 'red',
    }
    if (message === null) {
      return null
    }
    return (
      <div className="notification" style={{ color: colors[type] }}>
        {notification}
      </div>
    )
  }

  return (
    <div>

      <h1>Phonebook</h1>

      <Heading text='Add new' />

      <Notification message={notification} type={notificationType} />

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
