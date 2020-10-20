import usersService from '../services/users'
import { createNotification } from './notificationReducer'

export const initializeUsers = () => {
  return async dispatch => {
    // get all the users and dispatch
    try {
      const users = await usersService.getAllUsers()
      dispatch({
        type: 'INIT_USERS',
        data: users
      })
    } catch (error) {
      let errMessage = error?.response?.data?.error || error.message
      dispatch(createNotification(errMessage, 'error', 5));
    }
  }
}

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS': return [...action.data]
    default: return state
  }
}

export default usersReducer