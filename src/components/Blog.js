import React, { useState, useEffect } from 'react'
import ShowAll from './ShowAll'
import blogService from '../services/blogs'


const Blog = ({ blog }) => {

  const [likes, setNewLikes] = useState(blog.likes)

  useEffect(() => {
    setNewLikes(blog.likes)
  })

  const deleteBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      blogService
        .deleteBlog(blog.id)
        .then(returnedBlog => {
          console.log(returnedBlog)
          console.log('poisto ok')
          window.location.reload(true)
        }).catch(e => {
          console.log(e)
        })
    }
  }

  const addLike = (blog) => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    console.log(blogObject)

    blogService
      .update(blog.id, blogObject)
      .then(newBlog => {
        console.log(newBlog)
        setNewLikes(likes + 1)
      }).catch(e => {
        console.log(e)
      })
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title}  {blog.author}
      </div>
      <ShowAll buttonLabel="view">
        <ul>
          {blog.url}
        </ul>
        <ul>
          likes {blog.likes} <button onClick={() => addLike(blog)}>like</button>
        </ul>
        <ul>
          <button onClick={() => deleteBlog(blog)}>remove</button>
        </ul>
      </ShowAll>
    </div>
  )
}

export default Blog