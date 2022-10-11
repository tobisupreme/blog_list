const getRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

const getToken = (req, res, next) => {
  const authorization = req.get('authorization')

  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    req.token = authorization.substring(7)
    return next()
  }

  req.token = null
  return next()
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
  errorHandler
}
