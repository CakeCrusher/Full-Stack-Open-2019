import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    props.initializeAnecdotes()
  }, [])
  
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <NewAnecdote />
      <Filter />
      <Anecdotes />
    </div>
  )
}

export default connect(
  null,
  { initializeAnecdotes }
)(App)