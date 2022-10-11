const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/users')

router
  .route('/')
  .post(async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const correctPassword = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && correctPassword)) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const validityPeriod = 60*60*24 // 60s * 60 * 24 === 24 hours
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: validityPeriod })

    res.json({ token, username: user.username, name: user.name })
  })

module.exports = router
