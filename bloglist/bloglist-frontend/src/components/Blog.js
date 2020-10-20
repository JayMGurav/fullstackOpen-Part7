import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';

import { removeBlog, likeBlog, commentBlog } from '../reducers/blogsReducer'
import useFeild from '../customHooks/useFeild'

const Blog = (props) => {
  const comment = useFeild('text', 'comment')

  const handleClick = (id, comment) => {
    props.commentBlog(id, comment)
  }

  const blog = props.blog
  return (
    <div className="blog">
      <h2>{blog?.title} -{blog?.author}</h2>
      <div className="blogDetails">
        <p>{blog?.url}</p>
        <p>Likes : {blog?.likes} <Button className="like_btn" onClick={() => props.likeBlog(blog?.id, { ...blog, likes: blog?.likes + 1 })}>like</Button></p>
        {blog?.user ? <p>added by : {blog?.user.name}</p> : null}
        <Button variant="danger" onClick={() => props.removeBlog(blog?.id, blog?.title)}>remove</Button>
      </div>
      <div style={{ marginTop: 20 }}>
        comment :
          <input {...comment} reset="" />
        <button onClick={() => handleClick(blog?.id, { comment: comment.value })}>comment</button>
      </div>
      {blog?.comments?.length ? (
        <ul>
          {blog?.comments.map(c => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}


const mapDispatchToProps = {
  removeBlog,
  likeBlog,
  commentBlog
}

const connectedBlog = connect(null, mapDispatchToProps)(Blog)
export default connectedBlog