const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Bloglist = require('../models/bloglist')
const helper = require('./test_helper')

beforeEach(async () => {
  await Bloglist.deleteMany({})

  const bloglistObject = helper.initialBloglist.map((li) => new Bloglist(li))
  const bloglistArray = bloglistObject.map((li) => li.save())
  await Promise.all(bloglistArray)
})

describe('check environment variables', () => {
  test('check that node environment is test', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })
})

describe('test the /api/blogs endpoints', () => {
  const URL = '/api/blogs'
  test('get request returns the correct amount of blog posts', async () => {
    const listInDb = await helper.bloglistInDb()

    const response = await api
      .get(URL)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(listInDb.length)
  })
})

describe('GET request to /api/blogs', () => {
  const URL = '/api/blogs'
  test('returns the correct amount of blog posts', async () => {
    const listInDb = await helper.bloglistInDb()

    const response = await api
      .get(URL)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(listInDb.length)
  })

  test('returns objects with an "id" property', async () => {
    const response = await api.get(URL)

    expect(response.body[0].id).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})
