import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, username, onDelete, onLike}) => {
    const [expand, setExpand] = useState(false)

    const hideWhileExpand = {display: expand ? 'none' : ''}
    const showWhileExpand = {display: expand ? '' : 'none'}

    const toggleExpand = () => {
        setExpand(!expand)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const deleteStyle = {
        backgroundColor: 'red',
        color: 'white'
    }

    return (
        <div>
            <div className="contracted" onClick={toggleExpand} style={hideWhileExpand}>
                <div style={blogStyle}>
                <p>{blog.title} | {blog.author}</p>
                </div>
            </div>
            <div className="expanded" style={showWhileExpand}>
                <div style={blogStyle}>
                    <p onClick={toggleExpand}>{blog.title} | {blog.author}</p>
                    <p onClick={toggleExpand}>{blog.url}</p>
                    <p>{blog.likes}<button onClick={onLike}>like</button></p>
                    <p onClick={toggleExpand}>added by {username}</p>
                    <button onClick={onDelete} style={deleteStyle}>delete</button>
                </div>
            </div>
        </div>
    )
}

export default Blog