const blogsRouter = require('express').Router()
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

// const getTokenFrom = req => {
//   const authorization = req.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }


blogsRouter.get('/', async (req, res) => {
  const allBlogs = await Blog.
    find({}).
    sort({ likes: -1 }).
    populate('user', { username: 1, name: 1 }).exec()
  res.json(allBlogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).
    populate('user', { username: 1, name: 1 }).exec()
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})


blogsRouter.post('/', async (req, res) => {
  const body = req.body
  // const token = getTokenFrom(req)
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token && !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid, please login again' })
  }

  const user = await User.findById(decodedToken.id)
  const newBlog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const { comment } = req.body
  // const token = getTokenFrom(req)
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token && !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid, please login again' })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {
    $push: { comments: comment }
  }, {
    new: true,
    runValidators: true,
    context: 'query'
  })
  res.status(200).json(updatedBlog)
})




blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token && !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid, please login again' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return res.status(401).json({ error: 'invalid, token' })
  }
  await Blog.findByIdAndRemove(req.params.id)
  // remove from user.blogs also
  user.blogs = user.blogs.filter(b => b.id !== req.params.id)
  await user.save()
  res.status(204).end()
})


blogsRouter.put('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token && !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid, please login again' })
  }


  const body = req.body

  const dataToUpdate = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, dataToUpdate, {
    new: true,
    runValidators: true,
    context: 'query'
  })
  // no need to update user.blogs as it holds only the id of the blogs
  // data is populated later on
  res.status(200).json(updatedBlog)
})


module.exports = blogsRouter