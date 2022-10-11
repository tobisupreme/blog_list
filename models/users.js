const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: [{
    ref: 'Blog',
    type: mongoose.Schema.Types.ObjectId,
  }]
})

userSchema.set('toJSON', {
  transform: (document, doc) => {
    doc.id = doc._id.toString()
    delete doc._id
    delete doc.__v
    delete doc.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)
