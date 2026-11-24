import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { User } from './User.jsx'

export function Post({
  title,
  contents,
  author,
  ingredients,
  image,
  _id,
  fullPost = false,
}) {
  return (
    <article className='user-post'>
      {image && <img src={image} alt={title} />}
      {fullPost ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/posts/${_id}`}>
          <h3>{title}</h3>
        </Link>
      )}
      <div style={{ whiteSpace: 'pre-line' }}>
        <h4>Ingredients</h4>
        {ingredients}
      </div>
      <br />
      <div style={{ whiteSpace: 'pre-line' }}>
        <h4>Recipe</h4>
        {contents}
      </div>
      {author && (
        <em>
          <br />
          Written by{' '}
          <strong>
            <User id={author} />
          </strong>
        </em>
      )}
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  ingredients: PropTypes.string,
  contents: PropTypes.string,
  author: PropTypes.string,
  _id: PropTypes.string.isRequired,
  fullPost: PropTypes.bool,
}
