import React from 'react'

const SimpleBlog = ({ blog, onClick }) => {
    const handleLike = async () => {
        const newLikesAmt = likes + 1
        const newBlog = await blogService
            .updateLike(newLikesAmt, blog.id)

        const userBlogsJSON = JSON.parse(window.localStorage.getItem('userBlogsJSON'))
        let  blogTarget = userBlogsJSON.find(b => b.id === blog.id)
        blogTarget.likes = newLikesAmt
        const restBlogs = userBlogsJSON.filter(b => b.id !== blog.id)

        window.localStorage.setItem('userBlogsJSON', JSON.stringify(restBlogs.concat(blogTarget)))
        setLikes(newLikesAmt)
    }
    return (
        <div>
            <div className="general-info">
                {blog.title} {blog.author}
            </div>
            <div className="likes-info">
                blog has {blog.likes} likes
                <button onClick={onClick}>like</button>
            </div>
        </div>
    )

}

export default SimpleBlog