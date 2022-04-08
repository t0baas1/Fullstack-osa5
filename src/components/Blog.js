import React from 'react'
import ShowAll from './ShowAll'
import blogService from '../services/blogs'

const addLike = (blog) => {

  //const newLikes = blog.likes
  console.log("tänne päästy")

  const blogObject = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1
  }

  console.log("mites tänne")

  blogService
  .update(blog.id, blogObject)
  .then(returnedBlog => {
    //TODO: Tähän se särkee
    //setBlogs(blogs.map(blog => blog.id === id ? blog.id=))
    console.log("ok")
  })
}

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
        <div>likes {blog.likes} <button onClick={() => addLike(blog)}>like</button></div>
        </ShowAll>
        </div>
      </div>
    </div>
  )
}

export default Blog