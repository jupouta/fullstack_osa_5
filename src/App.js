import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import useField  from './hooks/index'
import './css/message.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [newBlog, setNewBlog] = useState('')
  //const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const username = useField('text')
  const password = useField('password')
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [user, setUser] = useState(null)
  //const [title, setTitle] = useState('')
  //const [author, setAuthor] = useState('')
  //const [url, setUrl] = useState('')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs ))
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="message">
        {message}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const usernameStr = username.value
      const passwordStr = password.value
      const user = await loginService.login({
        username: usernameStr,
        password: passwordStr
      })
      console.log(user)

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      //username.value = ''
      //password.value = ''
      //setUsername('')
      //setPassword('')
      console.log(username.value)

    } catch (exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const blogFormRef = React.createRef()

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    const user = JSON.parse(loggedUserJSON)

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      user: user
    }

    //setTitle('')
    //setAuthor('')
    //setUrl('')

    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`a blog named ` +  title.value + ` by ` + author.value + ` was added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(() => {
        setErrorMessage(`jotain meni pieleen`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={errorMessage} />
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            //handleUsernameChange={username.onChange}
            //handlePasswordChange={password.onChange}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  //   <div>

  //     <form onSubmit={handleLogin}>
  //       <div>
  //         käyttäjätunnus
  //           <input
  //           type="text"
  //           value={username}
  //           name="Username"
  //           onChange={({ target }) => setUsername(target.value)}
  //         />
  //       </div>
  //       <div>
  //         salasana
  //           <input
  //           type="password"
  //           value={password}
  //           name="Password"
  //           onChange={({ target }) => setPassword(target.value)}
  //         />
  //       </div>
  //       <button type="submit">kirjaudu</button>
  //     </form>
  //   </div>
  // )


  // const blogForm = () => (
  //   <form onSubmit={addBlog}>
  //     <div>
  //     title: <input
  //       value={title}
  //       onChange={({ target }) => setTitle(target.value)}
  //     />
  //     </div>
  //     <div>
  //     author: <input
  //       value={author}
  //       onChange={({ target }) => setAuthor(target.value)}
  //     />
  //     </div>
  //     <div>
  //     url: <input
  //       value={url}
  //       onChange={({ target }) => setUrl(target.value)}
  //     />
  //     </div>
  //     <button type="submit">create</button>
  //   </form>
  // )

  if (user === null) {
    return (
      loginForm()
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <p>{user.name} logged in</p>
      <div>
        <button onClick={handleLogout} type="button">logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          onSubmit={addBlog}
          title={title}
          author={author}
          url={url}
          //handleTitleChange={({ target }) => setTitle(target.value)}
          //handleAuthorChange={({ target }) => setAuthor(target.value)}
          //handleUrlChange={({ target }) => setUrl(target.value)}
          />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default App