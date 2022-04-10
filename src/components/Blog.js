import React from 'react'
import ShowAll from './ShowAll'
import blogService from '../services/blogs'
import App from '../App'


const deleteBlog = (blog) => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
    blogService
      .deleteBlog(blog.id)
      .then(returnedBlog => {
        console.log(returnedBlog)
        console.log('poisto ok')
        //TODO:Blogilistan päivitys, uuden sivun lataus. Alla versio a'la Pirkka
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
      App.setBlogs(newBlog)
    }).catch(e => {
      console.log(e)
    })
}

const Blog = ({ blog }) => {
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
          <ul>
            {blog.url}
          </ul>
          <ul>
            likes {blog.likes} <button onClick={() => addLike(blog)}>like</button>
          </ul>
          <ul>
            <button onClick={() => deleteBlog(blog)}>remove</button>
          </ul>
        </ul>
      </ShowAll>
    </div>
  )
}

export default Blog