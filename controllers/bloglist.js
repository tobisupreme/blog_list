const { Router } = require('express')
const router = new Router()
const Blog = require('../models/bloglist')
const User = require('../models/users')
const getRandom = require('../utils/middleware').getRandom

router
  .route('/')
  .get(async (req, res) => {
    try {
      const bloglist = await Blog.find({}).populate('user', { username: 1, name: 1 })
      res.json(bloglist)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  .post(async (req, res) => {
    if (!req.body.title || !req.body.url) {
      return res.status(400).json({ message: 'Bring correct params' })
    }

    const users = await User.find({})
    const userIds = users.map((user) => user._id)
    const userId = getRandom(userIds)
    const user = await User.findById(userId)

    req.body.user = user._id

    try {
      const blog = new Blog(req.body)
      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      res.status(201).json(savedBlog)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

router
  .route('/:id')
  .delete(async (req, res) => {
    try {
      await Blog.findByIdAndRemove(req.params.id)
      res.status(204).end()
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  .patch(async (req, res) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { likes: req.body.likes }, { new: true, runValidators: true, context: 'query' })
      res.json(updatedBlog)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

module.exports = router
