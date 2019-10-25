import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Search from './components/Search'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import Notification from './components/Notification'
import contactService from './service/phones'

const App = () =>{
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newTel, setNewTel] = useState('')
  const [query, setQuery] = useState('')
  const [notification, setNotification] = useState({message: null, type: null})

  const effectHandler = () =>{
    contactService
      .getAll()
      .then(response => (
        setPersons(response)
      ))
  }
  useEffect(effectHandler, [])

  const onNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const onTelChange = (event) =>{
    setNewTel(event.target.value)
  }

  const onQueryChange = (event) =>{
    setQuery(event.target.value)
  }

  const addPerson = (event) =>{
    event.preventDefault()
    const personsNames = () => persons.map(person => person.name.toUpperCase())

    if (personsNames().indexOf(newName.toUpperCase()) < 0){
      console.log('A')
      console.log('error')
      console.log('A')
      const personObject = {
        name: newName, number: newTel
      }
      contactService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewTel('')
          setNotification({message: 'Added ' + newName, type: 'create'})
          setTimeout(() =>{
            setNotification({message: null, type: null})
          }, 5000)
        })
        .catch(error => {
          setNotification({message: error.response.data.error.message, type: 'error'})
          setTimeout(() => {
            setNotification({message: null, type: null})
          }, 5000)
        })
    }
    else{
      const targetPerson = persons.find(person => person.name.toUpperCase() === newName.toUpperCase())

      if(window.confirm(targetPerson.name + ' is already added. Would you like to update his number?')){
        const personUpdated = {...targetPerson, number: newTel}
        
        contactService
          .updateNum(targetPerson.id, personUpdated)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== targetPerson.id ? person : updatedPerson))
            setNewName('')
            setNewTel('')
          })
          .catch( error => {
            setNotification({message: 'Information of ' + newName + ' has been removed from server', type: 'error'})
            setTimeout(() =>{
              setNotification({message: null, type: null})
            }, 5000)
          })
      }
    }
  }
  
  const handleDelete = (id, name) => {
    if (window.confirm('Are you sure you want do delete ' + name)){
      contactService
        .onDelete(id)
        .then(
          setPersons(
            persons.filter(person => person.id !== id)
          )
        )
    }
  }

  return(
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification.message} type={notification.type} />
      <Search onChange={onQueryChange} />
      <h1>Add new contact</h1>
      <ContactForm onSubmit={addPerson} onNameChange={onNameChange} onTelChange={onTelChange} nameValue={newName} telValue={newTel} />
      <h1>Numbers</h1>
      <Contacts persons={persons} query={query} handleDelete={handleDelete} />
    </div>
  )
}

export default App