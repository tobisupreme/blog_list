const dummy = (blogs) => {
  return blogs ? 1 : 0
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum += blog.likes
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const blogsArray = blogs.map(blog => blog.likes)
  const maxLikes = Math.max.apply(null, blogsArray)
  const fav = blogs.find(blog => blog.likes === maxLikes)
  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  }
}

const mostBlogs = (blogs) => {
  const authorCount = blogs.reduce((obj, blog) => {
    if (!obj[blog.author]) obj[blog.author] = 0
    obj[blog.author]++
    return obj
  }, {})

  const maxBlogs = Math.max.apply(null, Object.values(authorCount))

  const entries = Object.entries(authorCount)
  const fav = entries.find(entry => entry[1] === maxBlogs)

  return {
    author: fav[0],
    blogs: fav[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
