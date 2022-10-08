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

describe('POST request to /api/blogs', () => {
  test('successfully creates a new blog post', async () => {
    const newBlog = {
      title: 'Nearly All Are Mad',
      author: 'Adamu Igbo',
      url: 'https://google.com',
      likes: 54,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const listInDb = await helper.bloglistInDb()
    expect(listInDb.length).toBe(helper.initialBloglist.length + 1)

    const contents = listInDb.map((blog) => blog.title)
    expect(contents).toContain('Nearly All Are Mad')
  })
})

describe('POST request to /api/blogs without likes property', () => {
  test('defaults likes property to the value 0', async () => {
    const newBlog = {
      title: 'My Beautiful Dark Twisted Fantasy',
      author: 'Kanye West',
      url: 'https://shop.kanyewest.com',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })
})

describe('POST request to /api/blogs without', () => {
  test('title property responds with 400 Bad Request', async () => {
    const newBlog = {
      author: 'Kanye West',
      url: 'https://shop.kanyewest.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('url property responds with 400 Bad Request', async () => {
    const newBlog = {
      title: 'My Beautiful Dark Twisted Fantasy',
      author: 'Kanye West',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
