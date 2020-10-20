import React from 'react'
import { connect } from 'react-redux'

import { createBlog } from '../reducers/blogsReducer'
import useFeild from '../customHooks/useFeild'
import Toggleable from './Togglable'


const BlogForm = ({ blogFormRef, createBlog }) => {
  const title = useFeild('text', 'title')
  const author = useFeild('text', 'author')
  const url = useFeild('text', 'url')

  const handleSubmit = (event) => {
    event.preventDefault()
    title.reset()
    author.reset()
    url.reset()
    createBlog(title.value, author.value, url.value)
  }

  return (
    <Toggleable buttonLabel="add new blog" ref={blogFormRef}>
      <h2>Add new blog to the list</h2>
      <form onSubmit={handleSubmit} className="formDiv">
        <div>
          Title :
          <input {...title} reset="" />
        </div>
        <div>
          Author :
          <input {...author} reset="" />
        </div>
        <div>
          Url :
          <input {...url} reset="" />
        </div>
        <button type="submit" id="add_to_bloglist">Add</button>
      </form>
    </Toggleable>
  )
}

const mapDispatchToProps = {
  createBlog
}

const connectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)
export default connectedBlogForm
