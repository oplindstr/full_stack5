import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      blog: props.blog,
      destroy: props.destroy,
      loggedInUser: props.loggedInUser,
      comment: ''
    }
  }

  addLike = (id) => {
    return () => {
      blogService.get(id)
      .then(blog => {

        const changedBlog = { ...blog, likes: blog.likes + 1 }

        blogService
      .update(id, changedBlog)
        .then(() => {
          this.setState({
            blog: changedBlog
          })
        })
      })
    }
  }

  addComment = () => {
    return () => {
      blogService.addComment(this.state.blog.id, this.state.comment)
      .then(response => {
        console.log('updated')
        console.log(response.data)
        const updatedBlog = response.data
        this.setState({
          blog: updatedBlog,
          comment: ''
        })
      })
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {

    console.log(this.state.blog)

    if (!this.state.blog) {
      return null
    }

    const destroy=this.state.destroy
    const id=this.state.blog.id
    const title=this.state.blog.title
    const author=this.state.blog.author
    const url=this.state.blog.url
    const likes=this.state.blog.likes
    const loggedInUser=this.state.loggedInUser

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const getUsername = () => {
      if (this.state.blog.user) {
        return this.state.blog.user.username
      }
      return null
    }

    const username = getUsername()

    const blogDetails = () => {
      if (username && this.state.loggedInUser && username === this.state.loggedInUser.username) {
        return (
            <div className="blogContent">
                <h2>{author}: {title}</h2>
                <p>{url}</p>
                <p>
                    {likes} likes
                    <button onClick={this.addLike(id)}>Like</button>
                </p>
                <button onClick={destroy(id, title)}>Delete</button>
                <p>Added by {username}</p>
            </div>
        )
      }

      if (!username && loggedInUser) {
          return (
              <div className="blogContent">
                  <h2>{author}: {title}</h2>
                  <p>{url}</p>
                  <p>
                      {likes} likes
                      <button onClick={this.addLike(id)}>Like</button>
                  </p>
                  <button onClick={destroy(id, title)}>Delete</button>
              </div>
          )
      }

      if (username) {
          return (
              <div className="blogContent">
                  <h2>{author}: {title}</h2>
                  <p>{url}</p>
                  <p>
                      {likes} likes
                      <button onClick={this.addLike(id)}>Like</button>
                  </p>
                  <p>Added by {username}</p>
              </div>
          )
      }

      return (
          <div className="blogContent">
              <h2>{author}: {title}</h2>
              <p>{url}</p>
              <p>
                  {likes} likes
                  <button onClick={this.addLike(id)}>Like</button>
              </p>
          </div>
      )
    }

    let comments = null

    if (this.state.blog.comments) {
      comments = this.state.blog.comments.map((comment, index) =>
        <li key={index}>{comment}</li>
      )
    }

    return (
      <div style={blogStyle} className="blog">
        {blogDetails()}

        <h2>Comments</h2>
        <ul>
        {comments}
        </ul>

        <h2>Add Comment</h2>
          <div>
          Comment
            <input
                type="text"
                name="comment"
                value={this.state.comment}
                onChange={this.handleChange}
            />
          </div>
          <button onClick={this.addComment()}>Add Comment</button>

      </div >
    )
  }
}

export default Blog