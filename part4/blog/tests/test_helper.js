const Blog = require('../models/blog')

const blogList = [
    {
        _id: '5a422bb71b54a676234d17f8',
        title: 'Simple Page',
        author: 'Mr. Person',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/simple_page.html',
        likes: 3,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Single Page App',
        author: 'Mr. Person',
        url: 'http://www.u.arizona.edu/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 4,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const mostBlogs = (blogList) => {
    let authorBlogs = {}
    for(blog of blogList){
        const author = blog.author
        if(authorBlogs[author]){
            authorBlogs[author] += 1
        } else {
            authorBlogs[author] = 1
        }
    }
    const highestBlogs = Object.keys(authorBlogs).reduce((author, highest) =>{
        return authorBlogs[author] > authorBlogs[highest] ? author : highest
    })
    
    return {
        author: highestBlogs,
        blogs: authorBlogs[highestBlogs]
    }
}

const mostLikes = (blogsList) => {
    let authorLikes = {}
    for(blog of blogList){
        const author = blog.author
        if(authorLikes[author]) {
            authorLikes[author] += blog.likes
        } else {
            authorLikes[author] = blog.likes
        }
    }
    const highestLikes = Object.keys(authorLikes).reduce((author, highest) => {
        return authorLikes[author] > authorLikes[highest] ? author : highest
    })
    return {
        author: highestLikes,
        likes: authorLikes[highestLikes]
    }
}

module.exports = {
    blogList,
    blogsInDb,
    mostBlogs,
    mostLikes
}