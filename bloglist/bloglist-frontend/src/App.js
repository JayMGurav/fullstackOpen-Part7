import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'

import { checkUserLoginStatus } from './reducers/loginReducer'

import LoggedInSection from './components/LoggedInSection'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'


const App = (props) => {
  useEffect(() => {
    props.checkUserLoginStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container fluid>
      <Notification />
      {props.loggedIn ? <LoggedInSection /> : <LoginForm />}
    </Container>
  )
}

const mapStateToProps = ({ user: { loggedIn } }) => {
  return { loggedIn }
}

const mapDispatchToProps = {
  checkUserLoginStatus,
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default connectedApp