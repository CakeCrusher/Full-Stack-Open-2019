import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogsReducer from './reducers/blogsReducer'
import usersReducer from './reducers/usersReducer'

const reducers = combineReducers({
    blogs: blogsReducer,
    users: usersReducer
})

const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

export default store