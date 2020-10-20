import blogsService from '../services/blogs'
import { createNotification } from './notificationReducer'

export const createBlog = (title, author, url) => {
  return async dispatch => {
    try {
      const createdBlog = await blogsService.create({ title, author, url })
      dispatch({
        type: 'NEW_BLOG',
        data: { ...createdBlog }
      })
      dispatch(createNotification(`Added "${createdBlog.title}" to the list`, 'success', 5))
    } catch (error) {
      let errMessage = error?.response?.data?.error || error.message
      dispatch(createNotification(errMessage, 'error', 5));
    }

  }
}

export const removeBlog = (id, title) => {
  return async dispatch => {
    try {
      await blogsService.remove(id);
      dispatch({
        type: 'REMOVE_BLOG',
        data: { id }
      })
      dispatch(createNotification(`Removed "${title}" from the list`, 'success', 5))
    } catch (error) {
      let errMessage = error?.response?.data?.error || error.message
      dispatch(createNotification(errMessage, 'error', 5));
    }
  }
}

export const likeBlog = (id, updatedBlog) => {
  return async dispatch => {
    try {
      await blogsService.update(id, updatedBlog)
      dispatch({
        type: 'LIKE_BLOG',
        data: { ...updatedBlog }
      })
      dispatch(createNotification(`Liked "${updatedBlog.title}"`, 'success', 5))
    } catch (error) {
      let errMessage = error?.response?.data?.error || error.message
      dispatch(createNotification(errMessage, 'error', 5));
    }
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogsService.comment(id, comment)
      console.log(updatedBlog)
      dispatch({
        type: 'COMMENT_BLOG',
        data: { ...updatedBlog, comments: [...updatedBlog.comments] }
      })
      dispatch(createNotification(`You commented "${comment.comment}"`, 'success', 5))
    } catch (error) {
      let errMessage = error?.response?.data?.error || error.message
      dispatch(createNotification(errMessage, 'error', 5));
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    // get all the blogs and dispatch
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}


// export const getSingleBlog = (id) => {
//   return async dispatch => {
//     // get all the blogs and dispatch
//     // const blog = await blogsService.getBlog(id)
//     dispatch({
//       type: 'GET_BLOG',
//       data: { id }
//     })
//   }
// }


const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS': return [...action.data]
    case 'NEW_BLOG': return [...state, { ...action.data }]
    case 'COMMENT_BLOG': return [...state.filter(b => b.id !== action.data.id), { ...action.data }]
    case 'LIKE_BLOG':
      return [...state.filter(b => b.id !== action.data.id), { ...action.data }].sort((a, b) => b.likes - a.likes)
    case 'REMOVE_BLOG': return [...state.filter(b => b.id !== action.data.id)]
    default: return state
  }
}

export default blogsReducer