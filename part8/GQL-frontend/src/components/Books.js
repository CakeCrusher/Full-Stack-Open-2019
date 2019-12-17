import React, { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)

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

  const books = props.result.data.allBooks

  let genres = []
  books.forEach(b => b.genres.forEach(g => {
    if (!genres.includes(g)) {
      genres.push(g)
    }
  }))

  const booksToShow = () => {
    if (genre) {
      return books.map(b => {
        if (b.genres.includes(genre)) {
          return (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.published}</td>
            </tr>
          )
        }
        return null
      })
    }
    return books.map(b => (
      <tr key={b.title}>
        <td>{b.title}</td>
        <td>{b.author}</td>
        <td>{b.published}</td>
      </tr>
    ))
  }

  return (
    <div>
      <h1>books</h1>
      <div>
        {genres.map(g => 
          <button key={g} onClick={() => setGenre(g)}>{g}</button>
        )}
      </div>
      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow()}
        </tbody>
      </table>
    </div>
  )
}

export default Books