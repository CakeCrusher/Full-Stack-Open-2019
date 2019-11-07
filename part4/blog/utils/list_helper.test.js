const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    const blogLikes = blogs.map(blog => blog.likes)

    return blogLikes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const likesMap = blogs.map(blog => blog.likes)
    const mostLikes = Math.max(...likesMap)
    const favBlog = blogs.find(blog => blog.likes === mostLikes)
    const formattedBlog = {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
    }

    return formattedBlog
}

const blogListSingle = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]
const blogListDouble = [
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
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

test('dummy returns one', () => {
    const blogs = []
    expect(dummy(blogs)).toBe(1)
})

describe('total likes', () => {    
    test('list of blogs only contains one', () => {
        const result = totalLikes(blogListSingle)
        
        expect(result).toBe(5)
    })
    test('list of blogs contains two', () => {
        const result = totalLikes(blogListDouble)
        
        expect(result).toBe(8)
    })
})

describe('favorite blog', () => {
    test('when a list of 1 blog returned that one', () => {
        const response = favoriteBlog(blogListSingle)
        const expectedResponse = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        expect(response).toEqual(expectedResponse)
    })
    test('when a list of 2 blogs returns the most popular blog', () => {
        const response = favoriteBlog(blogListDouble)
        const expectedResponse = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        expect(response).toEqual(expectedResponse)
    })
})

// THERE ARE TWO LEFT TO DO FINISH AT THE END OF PART