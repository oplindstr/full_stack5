import React from 'react'
import PropTypes from 'prop-types'

const BlogDetails = ({ addLike, destroy, id, title, author, url, likes, username, loggedInUser }) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }

      if (username && loggedInUser && username === loggedInUser.username) {
        return (
            <div style={blogStyle} className="blogContent">
                <p>{author}: {title}</p>
                <p>{url}</p>
                <p>
                    {likes} likes 
                    <button onClick={addLike(id)}>Like</button>
                </p>
                <button onClick={destroy(id, title)}>Delete</button>
                <p>Added by {username}</p>
            </div>
        )
    }

    if (!username && loggedInUser) {
        return (
            <div style={blogStyle} className="blogContent">
                <p>{author}: {title}</p>
                <p>{url}</p>
                <p>
                    {likes} likes 
                    <button onClick={addLike(id)}>Like</button>
                </p>
                <button onClick={destroy(id, title)}>Delete</button>
            </div>
        )
    }

    if (username) {
        return (
            <div style={blogStyle} className="blogContent">
                <p>{author}: {title}</p>
                <p>{url}</p>
                <p>
                    {likes} likes 
                    <button onClick={addLike(id)}>Like</button>
                </p>
                <p>Added by {username}</p>
            </div>
        )
    }

    return (
        <div style={blogStyle} className="blogContent">
            <p>{author}: {title}</p>
            <p>{url}</p>
            <p>
                {likes} likes 
                <button onClick={addLike(id)}>Like</button>
            </p>
        </div>
    )
}

BlogDetails.propTypes = {
    addLike: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
  }


export default BlogDetails