import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

import { logoutUser } from '../reducers/loginReducer'


const Header = (props) => {
  return (
    <Navbar variant="light" bg="light">
      <Navbar.Brand href="/">Blog list</Navbar.Brand>
      <Navbar.Toggle />
      <Nav className="mr-auto">
        <Link className="mr-2" to="/">Home</Link>
        <Link className="mr-2" to="/blogs">blogs</Link>
        <Link className="mr-2" to="/users">users</Link>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <strong>{props.user.name}(@{props.user.username})</strong>
          <Button variant="outline-dark" onClick={props.logoutUser}>Logout</Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = ({ user }) => {
  return {
    user
  }
}

const mapDispatchToProps = {
  logoutUser
}


const connectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header)
export default connectedHeader