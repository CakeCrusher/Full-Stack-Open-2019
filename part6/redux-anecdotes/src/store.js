import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import anecdotesReducer from  './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    anecdotes: anecdotesReducer,
    filterText: filterReducer,
    notification: notificationReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store