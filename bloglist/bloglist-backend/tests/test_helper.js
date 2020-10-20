const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML For Beginners',
    author: 'Frank',
    url: 'https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjni47JvP_rAhWf7HMBHfMaAYsQFjALegQIBBAB&url=https%3A%2F%2Fhtml.com%2F&usg=AOvVaw2YFwb7rXo4NSV_-WBWb2Rv',
    likes: 10
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Jay',
    url: 'http://thisIsDummyUrl.iDontKnow',
    likes: 7
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'noOne', url: 'dontCare' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}