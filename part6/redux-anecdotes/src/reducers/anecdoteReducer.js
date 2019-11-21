import anecdoteService from '../services/anecdoteService'
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}
export const changeVote = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVote(id)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdotesReducer = (state = [], action) => {
  switch (action.type){
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const anecdoteId = action.data.id
      const anecdoteToChange = state.find(a => a.id === anecdoteId)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => a.id !== anecdoteId ? a : changedAnecdote)
    case 'INIT_ANECDOTES':
      return action.data
  }
  return state
}

export default anecdotesReducer