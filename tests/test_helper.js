const Bloglist = require('../models/bloglist')
const User = require('../models/users')
const bcrypt = require('bcrypt')

const initialBloglist = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const bloglistInDb = async () => {
  const bloglist = await Bloglist.find({})
  return bloglist.map((blog) => blog.toJSON())
}

const initialUsers = [
  {
    username: 'admin',
    name: 'Super User',
    _id: '6344c5454ce3286e04013c84',
    passwordHash: async () => {
      return await bcrypt.hash('password', 10)
    },
  },
  {
    username: 'user1',
    name: 'User 1',
    _id: '6344c5454ce3286e04013c85',
    passwordHash: async () => {
      return await bcrypt.hash('password1', 10)
    },
  },
  {
    username: 'user2',
    name: 'User 2',
    _id: '6344c5454ce3286e04013c86',
    passwordHash: async () => {
      return await bcrypt.hash('password2', 10)
    },
  },
  {
    username: 'user3',
    name: 'User 3',
    _id: '6344c5454ce3286e04013c87',
    passwordHash: async () => {
      return await bcrypt.hash('password3', 10)
    },
  },
  {
    username: 'user4',
    name: 'User 4',
    _id: '6344c5454ce3286e04013c88',
    passwordHash: async () => {
      return await bcrypt.hash('password4', 10)
    },
  },
  {
    username: 'user5',
    name: 'User 5',
    _id: '6344c5454ce3286e04013c89',
    passwordHash: async () => {
      return await bcrypt.hash('password5', 10)
    },
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBloglist,
  bloglistInDb,
  usersInDb,
  initialUsers,
}
