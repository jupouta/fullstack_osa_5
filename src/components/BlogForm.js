import React from 'react'
import PropTypes from 'prop-types'

//handleTitleChange, handleAuthorChange, handleUrlChange, value
const BlogForm = ({ onSubmit, title, author, url }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
            title: <input
            value={title.value}
            onChange={title.onChange}
            reset={title.reset}
          />
        </div>
        <div>
            author: <input
            value={author.value}
            onChange={author.onChange}
            reset={author.reset}
          />
        </div>
        <div>
            url: <input
            value={url.value}
            onChange={url.onChange}
            reset={url.reset}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  //handleTitleChange: PropTypes.func.isRequired,
  //handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
}

export default BlogForm