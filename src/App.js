import React from 'react'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/logins'

import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: '',
      showAll: true,
      error: null,
      success: null,
      username: '',
      password: '',
      user: null,
      author: '',
      title: '',
      url: '',
      visible: false
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ 
        blogs: blogs.sort(function (a, b) {
          return b.likes - a.likes;
        }) 
      })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      date: new Date(),
      important: Math.random() > 0.5
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog: '',
          success: `New blog '${newBlog.title}' by '${newBlog.author}' added`
        })
      })
      setTimeout(() => {
        this.setState({success: null})
      }, 5000)
  }

  deleteBlog = (id, name) => {
    return () => {
      if (window.confirm(`Are you sure you want to delete blog ${name}?`)) { 
        blogService
        .destroy(id)
        .then(response => {
          this.setState({
            blogs: this.state.blogs.filter(blog => blog.id !== id),
            success: `blog ${name} deleted`
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 5000)
        })
      }
    }
  }

  addLike = (id) => {
    return () => {
      blogService.get(id)
      .then(blog => {

        const changedBlog = { ...blog, likes: blog.likes + 1 }

        blogService
      .update(id, changedBlog)
        .then(response => {
          this.setState({
            blogs: this.state.blogs.map(blog => blog.id === id ? changedBlog : blog ),
            success: `Blog '${blog.title}' by '${blog.author}' liked`
          })
        })
        setTimeout(() => {
          this.setState({success: null})
        }, 5000)
      })
    }
  }

  toggleImportanceOf = (id) => {
    // ...
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({ username: '', password: '', user: user, success: 'login successful'})

      setTimeout(() => {
        this.setState({success: null})
      }, 5000)
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    this.setState({ user: null, success: 'logout successful' })

    setTimeout(() => {
      this.setState({success: null})
    }, 5000)
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  render() {

    const loginForm = () => {
      return (
        <Togglable buttonLabel="log in">
          <LoginForm
            visible={this.state.visible}
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleChange}
            handleSubmit={this.login}
          />
        </Togglable>
      )
    }

    const blogForm = () => {
      return (
        <Togglable buttonLabel="Add Blog">
          <BlogForm
            addBlog={this.addBlog}
            handleChange={this.handleChange}
            author={this.state.author}
            title={this.state.title}
            url={this.state.url}
          />
        </Togglable>
      )
    }

    const allBlogs = this.state.blogs.map((blog) =>
    <Blog key={blog.id}
          blog={blog}
          addLike={this.addLike}
          destroy={this.deleteBlog}
          loggedInUser={this.state.user} />
      )

      const Errornotification = ({ message }) => {
        if (message === null) {
          return null
        }
        return (
          <div className="error">
            {message}
          </div>
        )
      }

      const Successnotification = ({ message }) => {
        if (message === null) {
          return null
        }
        return (
          <div className="success">
            {message}
          </div>
        )
      }

      const user = this.state.user

    return (
      <div>

        <Errornotification message={this.state.error}/>
        <Successnotification message={this.state.success}/>

        {user === null ?
          loginForm() :
          <div>
            <p>{user.name} logged in</p>

            <form onSubmit={this.logout}>
              <button type="submit">Log out</button>
            </form>

            {blogForm()}

            <h2>Blogs</h2>

            {allBlogs}
          </div>
        }

      </div >
    )
  }
}

export default App;
