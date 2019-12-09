import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import userService from './services/users'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import User from './components/User'
import Togglable from './components/Togglable'
import { useField, useResource } from './hooks'

import { connect } from 'react-redux'
import { initiateBlogs, createBlog, voteBlog, deleteBlog } from './reducers/blogsReducer'
import { initiateUsers } from './reducers/usersReducer'
import blogs from './services/blogs'
import {
  BrowserRouter as Router,
  Route, link
} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

function App() {
  const password = useField('password')
  const username = useField('text')
  const [user, setUser] = useState(null)
  const [userBlogs, setUserBlogs] = useState(null)
  const title = useField('text')
  const author = useField('text')
  const blogUrl = useField('url')
  const [notification, setNotification] = useState({text: '', type: ''})
  const loginService = useResource('/api/login')
  const blogService = useResource('/api/blogs')

  const blogFormRef = React.createRef()

  useEffect(() => {
    const userTokenJSON = JSON.parse(window.localStorage.getItem('userTokenJSON'))
    const userBlogsJSON = JSON.parse(window.localStorage.getItem('userBlogsJSON'))
    if (userTokenJSON) {
      blogService.setToken(userTokenJSON.token)
      setUserBlogs(userBlogsJSON.sort((s,b) => b.likes - s.likes))
      setUser(userTokenJSON)
    }
  },[])

  const handleClearWindow = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userToken = await loginService.login({
        password: password.fields.value,
        username: username.fields.value
      })
      await initiateBlogs()
      await initiateUsers()
      const _blogs = await blogService.getAll()
      const thisUserBlogs = _blogs.filter(b => b.user.username === userToken.username)

      blogService.setToken(userToken.token)
      window.localStorage.setItem('userBlogsJSON', JSON.stringify(thisUserBlogs))
      window.localStorage.setItem('userTokenJSON', JSON.stringify(userToken))
      setUserBlogs(thisUserBlogs.sort((s,b) => b.likes - s.likes))
      setUser(userToken)
      username.reset()
      password.reset()
    } catch (exception) {
      setNotification({text: 'Incorrect username or passwod', type: 'error'})
      setTimeout(() => (
        setNotification({text: '', type: ''})
      ), 3000)
      console.log('Error at handleLogin: ', exception)
    }
  }
  
  const handleBlogForm = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    try{
      const newBlog = {
        title: title.fields.value,
        author: author.fields.value,
        url: blogUrl.fields.value,
        likes: 0
      }
      const returnedBlog = await blogService.create(newBlog)
      console.log('returnedBlog: ', returnedBlog)
      await createBlog(newBlog)
      setUserBlogs(userBlogs.concat(returnedBlog))
  
      title.reset()
      author.reset()
      blogUrl.reset()
      setNotification({text: `Blog--${newBlog.title}--has beed added`, type: ''})
      setTimeout(() => (
        setNotification({text: '', type: ''})
      ),3000)
    } catch (exception) {
      console.log('Error at handleBlogForm: ', exception)
    }
  }

  const blogForm = () => (
    <Togglable btnLabel='add new blog' ref={blogFormRef}>
      <h2>Add Blog</h2>
      <Notification text={notification.text} type={notification.type}/>
      <BlogForm
        handleSubmit={handleBlogForm}
        titleFields={title.fields}
        authorFields={author.fields}
        blogUrlFields={blogUrl.fields}
      />
    </Togglable>
  )

  const loginForm = () => (
    <div>
      <h1>Login</h1>
      <Notification text={notification.text} type={notification.type}/>
      <LoginForm 
        handleSubmit={handleLogin}
        usernameFields={username.fields}
        passwordFields={password.fields}
      />
    </div>
  )
  
  const handleLike = (blog) => async () => {
    let  blogTarget = userBlogs.find(b => b.id === blog.id)
    blogTarget.likes = blogTarget.likes + 1

    await voteBlog({likes: blogTarget.likes}, blog.id)
    await blogService.update({likes: blogTarget.likes}, blog.id)

    const restBlogs = userBlogs.filter(b => b.id !== blog.id)
    setUserBlogs(restBlogs.concat(blogTarget))
    window.localStorage.setItem('userBlogsJSON', JSON.stringify(restBlogs.concat(blogTarget)))
  }

  const handleDelete = (blog) => async () => {
    console.log('blog: ', blog)
    if(window.confirm(`removing blog ${blog.title}`)){
        await blogService._delete(blog.id)
        await deleteBlog(blog.id)
        
        setUserBlogs(userBlogs.filter(b => b.id !== blog.id))
        window.localStorage.setItem('userBlogsJSON', JSON.stringify(userBlogs.filter(b => b.id !== blog.id)))
    }
  }

  const blogsInfo = () => (
    <div>
      <h1>Blogs</h1> 
      <br/>
      {blogForm()}
      {blogs.map(b => (<Blog blog={b} username={user.username} onLike={handleLike(b)} onDelete={handleDelete(b)} />))}
      <h1>Users</h1>
      <table>
      {users.map(u => (
        <User user={u} />
      ))}
      </table>

    </div>
  )
  
  const Menu_ = () => (
    <Menu>
      <Menu.item link>
        <Link to='/blogs'>blogs</Link>
      </Menu.item>
      <Menu.item link>
        <Link to='/users'>users</Link>
      </Menu.item>
      <Menu.item>
        Logged in as: {user.name}
      </Menu.item>
      <Menu.item link>
        <button onClick={handleClearWindow}>Log Out</button>
      </Menu.item>
    </Menu>
  )

  return (
    <div>
      <Router>
        <Menu_ />
        <Route path="/blogs" render={user === null ? loginForm() : blogsInfo()} />
        <Route path="/users" render={user === null ? loginForm() : blogsInfo()} />
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users
  }
}

const mapDispatchToProps = {
  initiateBlogs,
  createBlog,
  voteBlog,
  deleteBlog,
  initiateUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
