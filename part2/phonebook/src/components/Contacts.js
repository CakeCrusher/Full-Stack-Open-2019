import React from 'react'

const Contacts = ({persons, query, handleDelete}) => {
    const personsFiltered = () => persons.filter(person => person.name.toUpperCase().indexOf(query.toUpperCase()) >= 0)
    return (
      <ul>
        {personsFiltered().map((person,i) => (
          <li key={i} >
            {person.name} | {person.number} <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
          </li>
        
        ))}
      </ul>
    )
  }

export default Contacts