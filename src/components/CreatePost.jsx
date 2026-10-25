import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts.js'
export function CreatePost() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [image, setImage] = useState('')
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () =>
      createPost({ title, author, ingredients, contents, image }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
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
        <label htmlFor='create-author'>Author: </label>
        <input
          type='text'
          name='create-author'
          id='create-author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
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
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createPostMutation.isPending}
      />

      {createPostMutation.isSuccess ? (
        <>
          <br />
          Post created successfully!
        </>
      ) : null}
      {createPostMutation.isError ? (
        <p role='alert'>{createPostMutation.error.message}</p>
      ) : null}
    </form>
  )
}
