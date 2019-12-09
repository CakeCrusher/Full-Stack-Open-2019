import blogsService from '../services/blogs'

export const initiateBlogs = () => {
    return async dispatch => {
        const blogs = await blogsService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = (blogObject) => {
    return async dispatch => {
        const newBlog = await blogsService.create(blogObject)
        dispatch({
            type: 'CREATE_BLOG',
            data: newBlog
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogsService.deleteBlog(id)
        dispatch({
            type: 'DELETE_BLOG'
        })
    }
}

export const voteBlog = (newLikes, id) => {
    return async dispatch => {
        const blogVoted = await blogsService.updateLike(newLikes, id)
        dispatch({
            type: 'VOTE',
            action: blogVoted
        })
    }
}

const blogsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'CREATE_BLOG':
            return [...state, action.data]
        case 'DELETE_BLOG':
            return state.filter(blog => blog.id !== action.data.id)
        case 'VOTE':
            const restOfBlogs = state.filter(blog => blog.id !== action.data.id)
            return [...restOfBlogs, action.data]
    }
    const sortedState = state.sort((s,b) => b.likes - s.likes)
    return sortedState
}

export default blogsReducer