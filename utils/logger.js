const info = (...params) => {
  return console.log(...params)
}

const error = (...params) => {
  return console.error(...params)
}

module.exports = {
  info,
  error,
}
