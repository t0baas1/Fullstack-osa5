import React from 'react'

const DummyBlog = ({ blog, onClick }) => {
  return(
    <div>
      <div className="blog">
        {blog.title} {blog.author}
      </div>
      <div className="like">
            likes {blog.likes}
        <button onClick={onClick}>like</button>
      </div>
    </div>
  )
}

export default DummyBlog