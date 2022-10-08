const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
})

blogSchema.set('toJSON', {
  transform: (document, doc) => {
    doc.id = doc._id.toString()
    delete doc._id
    delete doc.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
