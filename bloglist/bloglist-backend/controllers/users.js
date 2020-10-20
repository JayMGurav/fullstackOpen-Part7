const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1 })
  res.json(users)
})

userRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('blogs', { title: 1, url: 1, likes: 1 })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

userRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.password.length >= 3) {
    return res.status(400).json({ error: 'Password should be atleast 3 characters long' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

module.exports = userRouter