import React, { useState } from 'react'
import blogs from '../services/blogs'
import users from '../services/users'

const User = ({ user }) => {
    const [expanded, setExpanded] = setState(false)
    const toggleExpand = () => {
        setExpanded(!expand)
    }
    if (expanded) {
        return (
            <div>
                <h1>{user.username}</h1>
                <div>added blogs</div>
                <ul>
                    {user.blogs.map(blogId => (
                        <li>{blogs.find(b => b.id === blogId)}</li>
                    ))}
                </ul>
            </div>
        )
    } else {
        return (
            <tr>
                <td>{user.username}</td>
                <td>{user.blogs.length}</td>
            </tr>
        )
    }
}

export default User