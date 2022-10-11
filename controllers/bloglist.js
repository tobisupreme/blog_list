const { Router } = require('express')
const router = new Router()
const Blog = require('../models/bloglist')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

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
  .post(async (req, res, next) => {
    if (!req.body.title || !req.body.url) {
      return res.status(400).json({ message: 'Bring correct params' })
    }

    try {
      const decodedToken = jwt.verify(req.token, process.env.SECRET)
      const user = await User.findById(decodedToken.id)

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
  .delete(async (req, res, next) => {
    try {
      const currUser = jwt.verify(req.token, process.env.SECRET)
      const blogToDelete = await Blog.findById(req.params.id)

      if (!(currUser.id.toString() === blogToDelete.user.toString())) {
        return res.status(403).json({
          error: 'unauthorised'
        })
      }

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
