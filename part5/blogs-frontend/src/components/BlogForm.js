import React from 'react'

const BlogForm = ({
        handleSubmit,
        titleFields, authorFields, blogUrlFields
    }) => (
        <form onSubmit={handleSubmit}>
            Title:
            <input {...titleFields} />
            <br/>
            Author:
            <input {...authorFields} />
            <br/>
            Url:
            <input {...blogUrlFields} />
            <br/>
            <button type="submit">Add</button>
        </form>
    )

export default BlogForm