//import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
//import { createPost } from '../api/posts.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import {
  CREATE_POST,
  GET_POSTS,
  GET_POSTS_BY_AUTHOR,
} from '../api/graphql/posts.js'
import { Link } from 'react-router-dom'
import slug from 'slug'
export function CreatePost() {
  const [token] = useAuth()
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [image, setImage] = useState('')
  const [createPost, { loading, data }] = useGraphQLMutation(CREATE_POST, {
    variables: { title, contents, image, ingredients },
    context: { headers: { Authorization: `Bearer ${token}` } },
    refetchQueries: [GET_POSTS, GET_POSTS_BY_AUTHOR],
  })
  /* const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () => createPost(token, { title, contents }),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  }) */
  const handleSubmit = (e) => {
    e.preventDefault()
    // createPostMutation.mutate()
    createPost()
  }

  if (!token) {
    return <p>Please log in to create a new post.</p>
  }

  return (
    <form onSubmit={handleSubmit} className='createpost-form'>
      <div>
        <label htmlFor='create-title'>Recipe Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-image'>Image URL: </label>
        <input
          type='text'
          name='create-image'
          id='create-image'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <br />
      <label htmlFor='create-ingredients'>Ingredients: </label>
      <textarea
        name='create-Ingredients'
        id='create-ingredients'
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <br />
      <br />
      <div>
        <label htmlFor='create-contents'>Recipe: </label>
        <textarea
          name='create-contents'
          id='create-contents'
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
      </div>
      <br />
      <br />
      <input
        type='submit'
        value={loading ? 'Creating...' : 'Create'}
        disabled={!token || !title || loading}
      />
      {data?.createPost ? (
        <>
          <br />
          Post{' '}
          <Link
            to={`/posts/${data.createPost.id}/${slug(data.createPost.title)}`}
          >
            {data.createPost.title}
          </Link>{' '}
          created successfully!
        </>
      ) : null}
    </form>
  )
}
