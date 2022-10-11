const router = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')

router
  .route('/')
  .get(async (req, res) => {
    const users = await User.find({})
    return res.json(users)
  })
  .post(async (req, res) => {
    const { username, name, password } = req.body
    const existingUser = await User.findOne({ username })

    if (existingUser) {
      return res.status(400).json({
        error: 'username must be unique'
      })
    }

    if (username.length < 5) {
      return res.status(400).json({
        error: 'username must contain at least 5 characters'
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'password must contain at least 6 characters'
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
      username,
      name,
      passwordHash
    })
    const savedUser = await user.save()

    return res.status(201).json(savedUser)

  })

module.exports = router
