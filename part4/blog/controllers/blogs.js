const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id){
        return response.status(400).json({
            error: 'token not veryfied'
        })
    }

    const user = await User.findById(decodedToken.id)
    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
        date: new Date(),
    })

    try {
        const savedBlog = await newBlog.save()
        console.log('savedBlog: ',savedBlog)
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(newBlog)
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(400).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.put('/:id', async (request, response) => {
    const updatedLikes = {
        likes: request.body.likes
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedLikes, { new:true })
    console.log(typeof(updatedBlog))
    response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request,response,next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id){
        return response.status(400).json({
            error: 'token not verified'
        })
    }
    const blogToDelete = await Blog.findById(request.params.id)
    if (blogToDelete.user.toString() !== decodedToken.id){
        return response.status(400).json({
            error: 'cant delete a note not made by this login'
        })
    }
    
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch(exception) {
        next(exception)
    }
})

module.exports = blogsRouter