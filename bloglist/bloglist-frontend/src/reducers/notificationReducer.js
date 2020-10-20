export const createNotification = (message, type, timeToLive) => {
  return async dispatch => {
    let timeoutId = null
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    }, timeToLive * 1000)

    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        type
      }
    })
  }
}

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION': return action.data
  case 'RESET_NOTIFICATION': return {}

  default: return state
  }
}

export default notificationReducer