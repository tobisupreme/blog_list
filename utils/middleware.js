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

module.exports = {
  getRandom,
  getToken
}
