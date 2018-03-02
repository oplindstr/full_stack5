import React from 'react'
import Togglable from './Togglable'
import BlogDetails from './BlogDetails'

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      blog: props.blog,
      addLike: props.addLike,
      destroy: props.destroy,
      loggedInUser: props.loggedInUser,
      detailsVisible: false
    }
  }

  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const username = () => {
      if (this.state.blog.user) {
        return this.state.blog.user.username
      }
      return null
    }

    const buttonText = `${this.state.blog.author}: ${this.state.blog.title}`

    return (
      <div style={blogStyle} className="blog">
        <Togglable buttonLabel={buttonText}>
          <BlogDetails
            addLike={this.state.addLike}
            destroy={this.state.destroy}
            id={this.state.blog.id}
            title={this.state.blog.title}
            author={this.state.blog.author}
            url={this.state.blog.url}
            likes={this.state.blog.likes}
            username={username()}
            loggedInUser={this.state.loggedInUser}
          />
        </Togglable>
      </div>
    )
  }
}

export default Blog