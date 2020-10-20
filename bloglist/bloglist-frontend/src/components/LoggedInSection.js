import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Container, Jumbotron } from 'react-bootstrap'


import { initializeUsers } from '../reducers/usersReducer'
import { initializeBlogs } from '../reducers/blogsReducer'
import Blog from './Blog'
import Blogs from './Blogs'
import Header from './Header'
import User from './User'
import Users from './Users'


const LoggedInSection = (props) => {

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const itemById = (id, items) =>
    props[items].find(a => a.id === id)

  const blogMatch = useRouteMatch({
    path: '/blogs/:id'
  })
  const blogById = blogMatch
    ? itemById(blogMatch.params.id, 'blogs')
    : null

  const userMatch = useRouteMatch({
    path: '/users/:id'
  })
  const userById = userMatch
    ? itemById(userMatch.params.id, 'users')
    : null
  const blogsAsProps = props.blogs.map(({ id, title }) => ({ id, title }))
  const usersAsProps = props.users.map(({ id, name, blogs: { length } }) => ({ id, name, length }))


  return (
    <>
      <Header />
      <Jumbotron fluid>
        <Container>
          <h1>Blog App</h1>
        </Container>
      </Jumbotron>
      <Container>
        <Switch>
          <Route path="/blogs/:id">
            <Blog blog={blogById} />
          </Route>
          <Route path="/blogs">
            <Blogs blogs={blogsAsProps} />
          </Route>
          <Route path="/users/:id" >
            <User user={userById} />
          </Route>
          <Route path="/users" >
            <Users users={usersAsProps} />
          </Route>
          <Route path="/">
            <Blogs blogs={blogsAsProps} />
          </Route>
        </Switch>
      </Container>
      {/* <Footer/> */}
    </>
  )
}

const mapStateToProps = ({ users, blogs }) => {
  return {
    users,
    blogs
  }
}

const mapDispatchToProps = {
  initializeUsers,
  initializeBlogs
}

const connectedLoggedInSection = connect(mapStateToProps, mapDispatchToProps)(LoggedInSection)
export default connectedLoggedInSection
