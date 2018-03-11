import React from 'react'

import Blog from './components/Blog'
/*import User from './components/User'*/
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/logins'
import userService from './services/users'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      users: [],
      newBlog: '',
      showAll: true,
      error: null,
      success: null,
      username: '',
      password: '',
      loggedInUser: null,
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
          return b.likes - a.likes
        })
      })
    )

    userService.getAll().then(users =>
      this.setState({
        users: users
      })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const loggedInUser = JSON.parse(loggedUserJSON)
      this.setState({ loggedInUser })
      blogService.setToken(loggedInUser.token)
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
        this.setState({ success: null })
      }, 5000)
  }

  deleteBlog = (id, name) => {
    return () => {
      if (window.confirm(`Are you sure you want to delete blog ${name}?`)) {
        blogService
        .destroy(id)
        .then(() => {
          this.setState({
            blogs: this.state.blogs.filter(blog => blog.id !== id),
            success: `blog ${name} deleted`
          })
          setTimeout(() => {
            this.setState({ message: null })
          }, 5000)
        })
      }
    }
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const loggedInUser = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)

      this.setState({ username: '', password: '', loggedInUser: loggedInUser, success: 'login successful' })

      setTimeout(() => {
        this.setState({ success: null })
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
    this.setState({ loggedInUser: null, success: 'logout successful' })

    setTimeout(() => {
      this.setState({ success: null })
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
      <p key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></p>
    )

    const allUsers = this.state.users.map((user) =>
      <tr key={user.id}>
        <td><Link to={`/users/${user.id}`}>{user.name}</Link> </td>
        <td>{this.state.blogs.filter((blog) => blog.user ? blog.user._id === user.id : false).length} </td>
      </tr>
    )

    const User = ({ user }) => {
      if (!user) {
        return null
      }
      const addedBlogs = this.state.blogs.filter((blog) => blog.user ? blog.user._id === user.id : false)
      return (
        <div>
            <h2>{user.name}</h2>
            <h3>Added blogs</h3>
            <ul>
            {addedBlogs.map((blog) =>
                <li key={blog.id}>{blog.name} by {blog.author}</li>
            )}
            </ul>
        </div>
      )
    }

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

    const loggedInUser = this.state.loggedInUser

    const userById = (id) =>
      this.state.users.find(user => user.id === id)

    const blogById = (id) =>
      this.state.blogs.find(blog => blog.id === id)

    return (
      <div>

        <Errornotification message={this.state.error}/>
        <Successnotification message={this.state.success}/>

        <Router>

          {loggedInUser === null ?
            loginForm() :
            <div>
              <p>{loggedInUser.name} logged in</p>

              <form onSubmit={this.logout}>
                <button type="submit">Log out</button>
              </form>

              <br/>

              <Link to={'/users'}>Users</Link> / <Link to={'/'}>blogs</Link>

              <br/>
              <br/>

              <Route exact path="/" render={() =>
                <div>
                  {blogForm()}
                  <h2>Blogs</h2>
                  {allBlogs}
                </div>
                }
              />

              <Route exact path="/users" render={() =>
                <div>
                  <h2>Users</h2>
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Blogs added</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers}
                    </tbody>
                  </table>
                </div>
                }
              />

              <Route exact path="/users/:id" render={({ match }) =>
                <User user={userById(match.params.id)} blogs={this.state.blogs} />
              }/>

              <Route exact path="/blogs/:id" render={({ match }) =>
                <Blog blog={blogById(match.params.id)} addLike={this.addLike}
                destroy={this.deleteBlog}
                loggedInUser={this.state.loggedInUser} />
              }/>
            </div>
          }
        </Router>

      </div >
    )
  }
}

export default App
