import React from 'react'

const BlogForm = ({ addBlog, handleChange, title, author, url }) => {
    return (
        <div>

        <h2>New Blog</h2>

        <form onSubmit={addBlog}>
                <div>
                title
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
                </div>
                <div>
                author
                <input
                    type="text"
                    name="author"
                    value={author}
                    onChange={handleChange}
                />
                </div>
                <div>
                url
                <input
                    type="text"
                    name="url"
                    value={url}
                    onChange={handleChange}
                />
                </div>
                <button type="submit">Add Blog</button>
            </form>

      </div >
    )
}


export default BlogForm