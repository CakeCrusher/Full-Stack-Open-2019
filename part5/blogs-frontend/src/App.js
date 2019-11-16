import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import userService from './services/users'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useField, useResource } from './hooks'

const fakeUser = {
  name: "Name"
}
const fakeBlogs = [
  {title: "Title1", author: "Author1"},
  {title: "Title2", author: "Author2"}
]

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
      const blogs = await blogService.getAll()
      const thisUserBlogs = blogs.filter(b => b.user.username === userToken.username)

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

    await blogService.update({likes: blogTarget.likes}, blog.id)

    const restBlogs = userBlogs.filter(b => b.id !== blog.id)
    setUserBlogs(restBlogs.concat(blogTarget))
    window.localStorage.setItem('userBlogsJSON', JSON.stringify(restBlogs.concat(blogTarget)))
  }

  const handleDelete = (blog) => async () => {
    console.log('blog: ', blog)
    if(window.confirm(`removing blog ${blog.title}`)){
        await blogService._delete(blog.id)
        
        setUserBlogs(userBlogs.filter(b => b.id !== blog.id))
        window.localStorage.setItem('userBlogsJSON', JSON.stringify(userBlogs.filter(b => b.id !== blog.id)))
    }
  }

  const blogsInfo = () => (
    <div>
      <h1>Blogs</h1>
      <br/>
      <h3>
        Logged in as: {user.name}
        <button onClick={handleClearWindow}>Log Out</button>
      </h3>
      
      <br/>
      {blogForm()}
      {userBlogs.map(b => (<Blog blog={b} username={user.username} onLike={handleLike(b)} onDelete={handleDelete(b)} />))}
    </div>
  )

  return (
    <div>
      {
        user === null ?
        loginForm() : blogsInfo()
      }
    </div>
  )
}

export default App;
