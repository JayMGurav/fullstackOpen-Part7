import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  if (!notification.message && !notification.type) {
    return null
  }
  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}

const mapStateToProps = ({ notification }) => {
  return { notification }
}


const connectedNotification = connect(mapStateToProps, null)(Notification)
export default connectedNotification