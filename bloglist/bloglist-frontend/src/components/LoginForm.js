import React from 'react'
import { connect } from 'react-redux'

import useField from '../customHooks/useFeild'
import { loginUser } from '../reducers/loginReducer'

const LoginForm = (props) => {
  const username = useField('text', 'username')
  const password = useField('password', 'password')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log({ username: username.value, password: password.value })
    props.loginUser(username.value, password.value)
    username.reset()
    password.reset()
  }

  return (
    <>
      <h2>Login to Bloglist</h2>
      <form onSubmit={handleLogin}>
        <div>
          username :
          <input {...username} reset="" />
        </div>
        <div>
          password :
          <input {...password} reset="" />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  loginUser
}

const connectedLoginForm = connect(null, mapDispatchToProps)(LoginForm)
export default connectedLoginForm