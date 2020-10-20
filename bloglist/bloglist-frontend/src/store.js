import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
// import filterReducer from './reducers/filterReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/usersReducer'


const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  user: loginReducer,
  users: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)


export default store


