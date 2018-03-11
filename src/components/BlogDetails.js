import React from 'react'
import PropTypes from 'prop-types'

const BlogDetails = ({ addLike, destroy, id, title, author, url, likes, username, loggedInUser }) => {

      if (username && loggedInUser && username === loggedInUser.username) {
        return (
            <div className="blogContent">
                <h2>{author}: {title}</h2>
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
            <div className="blogContent">
                <h2>{author}: {title}</h2>
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
            <div className="blogContent">
                <h2>{author}: {title}</h2>
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
        <div className="blogContent">
            <h2>{author}: {title}</h2>
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
    destroy: PropTypes.func.isRequired
  }


export default BlogDetails