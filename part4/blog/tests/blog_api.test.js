const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.blogList
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('getting all blogs from DB', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const blogs = await helper.blogsInDb()
    expect(blogs.length).toBe(helper.blogList.length)
})

test('blog.id is defined', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs[0].id).toBeDefined()
})

test('blog is posted successfully', async () => {
    const newBlog = {
        _id: '5a422ab71b54a676234d17f8',
        title: 'Carry Leaf',
        author: 'Ant 122',
        url: 'http://www.antcolony.com',
        likes: 2051,
        __v: 0
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const blogsInDb = await helper.blogsInDb()
    
    expect(blogsInDb.length).toBe(helper.blogList.length + 1)

    const blogsContent = blogsInDb.map(blog => blog.title)

    expect(blogsContent).toContain(newBlog.title)
})

test('blog likes if set to zero if empty', async () => {
    const newBlog = {
        _id: '5a422ab71b54a676234d17f8',
        title: 'Carry Leaf',
        author: 'Ant 122',
        url: 'http://www.antcolony.com',
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    
    const blogsInDb = await helper.blogsInDb()
    const newBlogInDb = blogsInDb.find(blog => blog.id === newBlog._id)

    expect(newBlogInDb.likes).toBe(0)
})

test('post must contain title', async () => {
    const newBlog = {
        _id: '5a422ab71b54a676234d17f8',
        author: 'Ant 122',
        url: 'http://www.antcolony.com',
        likes: 2051,
        __v: 0
    }

    await api
        .post('/api/blog')
        .send(newBlog)
        .expect(404)
})

test('post must contain url', async () => {
    const newBlog = {
        _id: '5a422ab71b54a676234d17f8',
        title: 'Carry Leaf',
        author: 'Ant 122',
        likes: 2051,
        __v: 0
    }

    await api
        .post('/api/blog')
        .send(newBlog)
        .expect(404)
})

test('post can be deleted', async () => {
    const oldDb = await helper.blogsInDb()
    const noteToDelete = oldDb[0]

    await api
        .delete(`/api/blogs/${noteToDelete.id}`)
        .expect(204)
    
    const newDb = await helper.blogsInDb()
    expect(newDb.length).toBe(oldDb.length - 1)
})

test('likes can be updated', async () => {
    const likesUpdate = {
        likes: 33
    }

    const oldDb = await helper.blogsInDb()
    const blogToUpdate = oldDb[0]

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(likesUpdate)
        .expect(200)

    const newDb = await helper.blogsInDb()
    expect(newDb[0].likes).toBe(33)
})


afterAll(() => {
    mongoose.connection.close()
})