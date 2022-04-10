import PropTypes from 'prop-types'

const BlogForm = ({ onSubmit, handleTitleChange, handleAuthorChange, handleUrlChange, title, author, url }) => {
  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={onSubmit}>
        <div>
        title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
        author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
        url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author : PropTypes.string.isRequired,
  url : PropTypes.string.isRequired
}

export default BlogForm