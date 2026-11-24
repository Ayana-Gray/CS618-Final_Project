import PropTypes from 'prop-types'
import { jwtDecode } from 'jwt-decode'
import { User } from './User.jsx'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import slug from 'slug'
import { useAuth } from '../contexts/AuthContext.jsx'
import { addLike } from '../api/posts.js'
import { useApolloClient } from '@apollo/client/react/index.js'
export function Post({
  title,
  contents,
  author,
  id,
  ingredients,
  image,
  likes = [],
  fullPost = false,
}) {
  const [token] = useAuth()
  const [liked, setLiked] = useState(false)
  const [error, setError] = useState('')
  const [likeCount, setLikeCount] = useState(likes.length)
  useEffect(() => {
    setLikeCount(likes.length)
  }, [likes.length])
  const userId = token ? jwtDecode(token).sub : null
  const alreadyLiked = likes.some((likeId) => String(likeId) === String(userId))
  const isLiked = alreadyLiked || liked
  const client = useApolloClient()
  async function handleLike() {
    try {
      const updatedPost = await addLike(token, id)
      setLikeCount(updatedPost.likes.length)
      setLiked(true)

      const cacheId = client.cache.identify({ __typename: 'Post', id })
      if (cacheId) {
        client.cache.modify({
          id: cacheId,
          fields: {
            likes: () => updatedPost.likes.map(String),
          },
        })
      }
    } catch (err) {
      setError(err.message)
    }
  }
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
      <br />
      <br />
      <input
        type='button'
        value={isLiked ? 'Liked' : 'Like'}
        disabled={!token || isLiked}
        onClick={handleLike}
      />
      <span> {likeCount}</span>
      {error && <p role='alert'>{error}</p>}
    </article>
  )
}
Post.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  ingredients: PropTypes.string,
  contents: PropTypes.string,
  author: PropTypes.shape(User.propTypes),
  likes: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  fullPost: PropTypes.bool,
}
