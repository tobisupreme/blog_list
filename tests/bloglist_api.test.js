const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Bloglist = require('../models/bloglist')
const helper = require('./test_helper')

beforeEach(async () => {
  await Bloglist.deleteMany({})
  await Bloglist.insertMany(helper.initialBloglist)
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

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const listInDb = await helper.bloglistInDb()
    const blogToDelete = listInDb[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const listInDbAfterDelete = await helper.bloglistInDb()
    expect(listInDbAfterDelete).toHaveLength(listInDb.length - 1)

    const contents = listInDbAfterDelete.map(blog => blog.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const listInDb = await helper.bloglistInDb()
    const blogToUpdate = listInDb[0]
    const update = { likes: 40 }

    const response = await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send(update)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(update.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
