import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: '',
      showAll: true,
      error: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      content: this.state.newBlog,
      date: new Date(),
      important: Math.random() > 0.5
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog: ''
        })
      })
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

      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleBlogChange = (event) => {
    this.setState({ newBlog: event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  render() {
    const allBlogs = this.state.blogs.map((blog) =>
    <Blog key={blog.id}
          blog={blog} />
      )

      if (this.state.user === null) {
        return (
          <div>
            <h2>Log in</h2>
    
            <form onSubmit={this.login}>
              <div>
                username
                <input
                  type="text"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                />
              </div>
              <div>
                password
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
              </div>
              <button type="submit">kirjaudu</button>
            </form>
          </div>
        )
      }

    return (
      <div>

        <h2>New Blog</h2>

        <form onSubmit={this.addBlog}>
          <input
            value={this.state.newBlog}
            onChange={this.handleBlogChange}
          />
          <button type="submit">Save</button>
        </form>

        <h2>Blogs</h2>

        {allBlogs}

      </div >
    )
  }
}

export default App;
