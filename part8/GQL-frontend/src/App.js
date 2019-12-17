import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author
    id
    genres
  }
`

const ALL_BOOKS = gql`
  {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const FILTERED_BOOKS = gql`
  {
    allBooks(author: "", genre: "") {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const ADD_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name
      born
      id
      bookCount
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const ME = gql`
  {
    me {
      favoriteGenre
    }
  }
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded{
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')

  const [token, setToken] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const me = useQuery(ME)
  const filteredBooks = useQuery(FILTERED_BOOKS)

  const updateCacheWith = (bookAdded) => {
    const alreadyAdded = (set, object) =>
      set.map(b => b.id).includes(object.id)
    const booksInStore = client.readQuery({ query: ALL_BOOKS })
    if (!alreadyAdded(booksInStore.allBooks, bookAdded)) {
      booksInStore.allBooks.push(bookAdded)
      client.writeQuery({
        query: ALL_BOOKS,
        data: booksInStore
      })
    }
    
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded
      window.alert(`${bookAdded.title} added`)
      updateCacheWith(bookAdded)
    }
  })

  const [addBook] = useMutation( ADD_BOOK, {
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    },
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const [login] = useMutation(LOGIN)

  const logout = () => {
    localStorage.clear()
    setToken(null)
    client.resetStore()
    setPage('authors')
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors
          result={authors}
          token={token}
          editAuthor={editAuthor}
          show={page === 'authors'}
        />
        
        <Books
          result={books}
          show={page === 'books'}
        />

        <LoginForm
          login={login}
          setToken={(token) => {
            console.log('|||login, token: ', token)
            setToken(token)
          }}
          show={page === 'login'}
          setPage={(page) => setPage(page)}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        result={authors}
        token={token}
        editAuthor={editAuthor}
        show={page === 'authors'}
      />
      <Books
        result={books}
        show={page === 'books'}
      />
      <NewBook
        addBook={addBook}
        show={page === 'add'}
      />
      <Recommendations
        filteredBooks={filteredBooks}
        me={me}
        show={page === 'recommend'}
      />
    </div>
  )
}

export default App