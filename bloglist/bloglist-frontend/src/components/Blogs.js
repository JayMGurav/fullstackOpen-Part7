import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

import BlogForm from './BlogForm'

const Blogs = (props) => {
  const blogFormRef = useRef()


  return (
    <ListGroup >
      <BlogForm blogFormRef={blogFormRef} />
      <br />
      {props.blogs.map(({ id, title }) =>
        <Link to={`/blogs/${id}`} key={id}><ListGroup.Item >{title}</ListGroup.Item></Link>
      )}
    </ListGroup>

  )
}

export default Blogs