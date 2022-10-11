const { Router } = require('express')
const router = new Router()
const Blog = require('../models/bloglist')
const { getUser, checkId } = require('../utils/middleware')

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const bloglist = await Blog.find({}).populate('user', { username: 1, name: 1 })
      res.json(bloglist)
    } catch (err) {
      next(err)
    }
  })
  .post(getUser, async (req, res, next) => {
    if (!req.body.title || !req.body.url) {
      return res.status(400).json({ message: 'Bring correct params' })
    }

    try {
      const user = req.user

      req.body.user = user._id
      const blog = new Blog(req.body)
      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      res.status(201).json(savedBlog)
    } catch (err) {
      next(err)
    }
  })

router
  .route('/:id')
  .delete(getUser, checkId, async (req, res, next) => {
    try {
      const blogToDelete = await Blog.findById(req.params.id)

      await blogToDelete.remove()
      res.status(204).end()
    } catch (err) {
      next(err)
    }
  })
  .patch(async (req, res, next) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { likes: req.body.likes }, { new: true, runValidators: true, context: 'query' })
      res.json(updatedBlog)
    } catch (err) {
      next(err)
    }
  })

module.exports = router
