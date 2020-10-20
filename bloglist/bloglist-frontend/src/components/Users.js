import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = (props) => {
  return (
    <div>
      <h2>Users</h2>
      <Table responsive bordered={false}>
        <thead>
          <tr>
            <th>user name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(({ length, id, name }) => (
            <tr key={id}>
              <td><Link to={`/users/${id}`}>{name} </Link></td>
              <td>{length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div >
  )
}


export default Users