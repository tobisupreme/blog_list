const listHelper = require('../utils/list_helper')
const blogs = require('./test_helper').initialBloglist

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blog = []
    blog.push(blogs[0])
    const result = listHelper.totalLikes(blog)
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  test('is one with highest count of total likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    const highestLikes = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
    expect(result).toEqual(highestLikes)
  })
})

describe('most blogs', () => {
  test('is one with highest number of blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    const mostBlogs = {
      author: 'Robert C. Martin',
      blogs: 3,
    }
    expect(result).toEqual(mostBlogs)
  })
})

describe('most likes', () => {
  test('is one with highest number of likes', () => {
    const result = listHelper.mostLikes(blogs)
    const mostLikes = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    }
    expect(result).toEqual(mostLikes)
  })
})
