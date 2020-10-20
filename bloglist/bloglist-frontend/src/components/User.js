import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const User = (props) => {
  return (
    <>
      <h2>{props?.user?.name}(@{props?.user?.username})</h2>
      <br />
      <ListGroup as="ul">
        <ListGroup.Item as="li" active>
          Added blogs
        </ListGroup.Item>
        {props?.user?.blogs.map(({ title, id }) => (
          <Link to={`/blogs/${id}`}><ListGroup.Item as="li" key={'added' + id}>{title}</ListGroup.Item></Link>
        ))}
      </ListGroup>
    </>
  )
}

export default User;