import React, { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')
  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return (
      <div>
        loading...
      </div>
    )
  }
  const authors = props.result.data.allAuthors

  let authorNames = []
  authors.forEach((item, index) => authorNames.push({value: item.name, label: item.name}))
  const onSubmit = async (e) => {
    e.preventDefault()

    await props.editAuthor({
        variables: {name, born: parseInt(born, 10)}
    })

    setName('')
    setBorn('')
  }

  const AuthorForm = () => {
    if (props.token){
      return(
        <div>
          <h2>set birthyear</h2>
          <form onSubmit={onSubmit}>
            <Select
              value={name}
              onChange={(obj) => setName(obj.value)}
              options={authorNames}
            />
            <div>
                born <input
                    value={born}
                    onChange={({target}) => setBorn(target.value)}
                />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      )
    }
    return null
  }

  return (
    <div>
      <div>
        <h1>authors</h1>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {AuthorForm()}
    </div>
  )
}

export default Authors