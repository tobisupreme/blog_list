const info = (...params) => {
  return console.log(...params)
}

const error = (...params) => {
  return console.error(...params)
}

const tick = Date.now()

const log = (v) => console.log(`${v} \n Elapsed: ${Date.now() - tick}ms`)

module.exports = {
  info,
  error,
  tick,
  log
}
