import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'
import slug from 'slug'
export function Post({
  title,
  contents,
  author,
  id,
  ingredients,
  image,
  fullPost = false,
}) {
  return (
    <article className='user-post'>
      {image &&
        (fullPost ? (
          <img src={image} alt={title} />
        ) : (
          <Link to={`/posts/${id}/${slug(title)}`}>
            <img src={image} alt={title} />
          </Link>
        ))}
      {fullPost ? (
        <h2>{title}</h2>
      ) : (
        <Link to={`/posts/${id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
      )}

      {fullPost && (
        <div style={{ whiteSpace: 'pre-line' }}>
          <h3>Ingredients </h3>
          {ingredients}
        </div>
      )}
      <br />
      {fullPost && (
        <div style={{ whiteSpace: 'pre-line' }}>
          <h3>Recipe </h3>
          {contents}
        </div>
      )}
      {author && (
        <em>
          {fullPost && <br />}
          Written by{' '}
          <strong>
            <User {...author} />
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
  author: PropTypes.shape(User.propTypes),
  id: PropTypes.string.isRequired,
  fullPost: PropTypes.bool,
}
