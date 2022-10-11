const jwt = require('jsonwebtoken')
const User = require('../models/users')

const getRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

const getToken = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    req.token = authorization.substring(7)
    return next()
  }

  req.token = null
  return next()
}

const getUser = async (req, res, next) => {
  try {
    if (req.token === null) return next()

    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

const checkId = (req, res, next) => {
  try {
    const blogIds = req.user.blogs.map(blog => (blog.toString()))
    const check = blogIds.includes(req.params.id)

    if (!check) return res.status(403).json({
      error: 'unauthorised'
    })

    next()
  } catch (err) {
    next(err)
  }
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'JsonWebTokenError') {
    return res.status(400).json({
      error: 'invalid token',
    })
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(400).json({
      error: 'token expired',
    })
  }

  res.status(400).json({
    error: error.message,
  })

  next()
}

module.exports = {
  getRandom,
  getToken,
  errorHandler,
  getUser,
  checkId
}
