import blogService from '../services/blogs'
import loginService from '../services/login'
import { createNotification } from './notificationReducer'

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN_USER',
        data: user
      })
    }
    catch (error) {
      let errMessage = error?.response?.data?.error || error.message
      dispatch(createNotification(errMessage, 'error', 5));
    }
  }
}

export const checkUserLoginStatus = () => {
  return async dispatch => {
    try {
      dispatch({
        type: 'IS_LOGGED_IN'
      })
    }
    catch (error) {
      let errMessage = error?.response?.data?.error || error.message
      dispatch(createNotification(errMessage, 'error', 5));
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    try {
      dispatch({
        type: 'LOGOUT_USER'
      })
    }
    catch (error) {
      let errMessage = error?.response?.data?.error || error.message
      dispatch(createNotification(errMessage, 'error', 5));
    }
  }
}

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_USER': return { ...action.data, loggedIn: true }
    case 'IS_LOGGED_IN': {
      const user = JSON.parse(window.localStorage.getItem('loggedBloglistappUser'))
      if (user) blogService.setToken(user.token)
      return user ? { ...user, loggedIn: true } : { loggedIn: false }
    }
    case 'LOGOUT_USER':
      window.localStorage.removeItem('loggedBloglistappUser')
      return { loggedIn: false }

    default: return state
  }
}

export default loginReducer