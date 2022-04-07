import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Error from './components/Error'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [addMessage, setAddMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

  try {
    const user = await loginService.login({
      username, password,
    })

    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    console.log('loggin ok')
  } catch (exception) {
    setErrorMessage('wrong username or password')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    console.log(blogObject.name)
    console.log(blogs.includes(blogObject.title))

    blogService
    .create(blogObject)
    .then(returnedNote => {
      setBlogs(blogs.concat(returnedNote))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setAddMessage(`a new blog ${newTitle} by ${newAuthor} added`)
      setTimeout(() => {
      setAddMessage(null)
      }, 5000)
    })
    .catch(error => {
      console.log(error.response.data.error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const toggleLogout = (event) => {
    window.localStorage.clear()
    window.location.reload(true)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )


  if (user === null) {
    return (
      <div>
        <h2>Log In to application</h2>
        <Error message={errorMessage} />
          {loginForm()}

      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Error message={errorMessage} />
      <Notification message={addMessage} />
      <div>
        {user.name} logged in
        <button onClick={toggleLogout}>logout</button>
      </div>
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
        <div>title: <input value={newTitle} onChange={handleTitleChange}/></div>
        <div>author: <input value={newAuthor} onChange={handleAuthorChange}/></div>
        <div>url: <input value={newUrl} onChange={handleUrlChange}/></div>
        <div><button type="submit">create</button></div>
      </form>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App