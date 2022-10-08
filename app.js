const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const blogListRouter = require('./controllers/bloglist')
const { info, error } = require('./utils/logger')

const connect = async () => {
  try {
    mongoose.connect(MONGODB_URI)
    info('Connected to database')
  } catch (err) {
    error('failed to connect', err.message)
  }
}
connect()

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogListRouter)

module.exports = app
