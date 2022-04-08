import React from 'react'
import ShowAll from './ShowAll'

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <div>{blog.title} {blog.author} <ShowAll buttonLabel="view">
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button>like</button></div>
        </ShowAll>
        </div>
      </div>
    </div>
  )
}

export default Blog