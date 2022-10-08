const { Router } = require('express')
const router = new Router()
const Blog = require('../models/bloglist')

router
  .route('/')
  .get(async (request, response) => {
    try {
      const bloglist = await Blog.find({})
      response.json(bloglist)
    } catch (err) {
      response.status(500).json({ message: err.message })
    }
  })
  .post(async (request, response) => {
    try {
      const blog = new Blog(request.body)
      const result = await blog.save()
      response.status(201).json(result)
    } catch (err) {
      response.status(500).json({ message: err.message })
    }
  })

module.exports = router
