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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
