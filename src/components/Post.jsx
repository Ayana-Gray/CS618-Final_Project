import PropTypes from 'prop-types'
export function Post({ title, contents, author, ingredients, image }) {
  return (
    <article className='user-post'>
      {image && <img src={image} alt={title} />}
      <h3>{title}</h3>

      <div style={{ whiteSpace: 'pre-line' }}>
        <h4>Ingredients </h4>
        {ingredients}
      </div>
      <br />
      <div style={{ whiteSpace: 'pre-line' }}>
        <h4>Recipe </h4>
        {contents}
      </div>
      {author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
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
}
