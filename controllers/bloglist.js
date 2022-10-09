const { Router } = require('express')
const router = new Router()
const Blog = require('../models/bloglist')

router
  .route('/')
  .get(async (req, res) => {
    try {
      const bloglist = await Blog.find({})
      res.json(bloglist)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  .post(async (req, res) => {
    if (!req.body.title || !req.body.url) {
      return res.status(400).json({ message: 'Bring correct params' })
    }

    try {
      const blog = new Blog(req.body)
      const result = await blog.save()
      res.status(201).json(result)
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

module.exports = router
