const getRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

module.exports = {
  getRandom
}
