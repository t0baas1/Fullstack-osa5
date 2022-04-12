import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAll, setShowAll] = useState(false)
  const remove = () => {
    if (blog.user && blog.user.username === user.username) {
      return (
        <button onClick={(event) => {
          //TODO Varmista
          event.stopPropagation()
          removeBlog(blog.id)
        }}> remove </button>
      )
    } else {
      return null
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      <div data-testid="container" onClick={() => setShowAll(!showAll)}>
        {showAll
          ? <div>
            {blog.title} {blog.author}<br />
            {blog.url}<br />
            likes {blog.likes} <button onClick={(event) => {
              event.stopPropagation()
              addLike(blog.id)
            }}>like</button><br />
            {blog.name}<br/>
            {remove()}
          </div>
          : <div>{blog.title} {blog.author}</div>
        }
      </div>
    </div>
  )
}

export default Blog