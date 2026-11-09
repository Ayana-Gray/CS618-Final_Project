import { useState } from 'react'
//import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
//import { signup } from '../api/users.js'
import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import { SIGNUP_USER } from '../api/graphql/users.js'
export function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [signupUser, { loading }] = useGraphQLMutation(SIGNUP_USER, {
    variables: { username, password },
    onCompleted: () => navigate('/login'),
    onError: () => alert('failed to sign up!'),
  })
  /* const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate('/login'),
    onError: () => alert('failed to sign up!'),
  }) */
  const handleSubmit = (e) => {
    e.preventDefault()
    signupUser()
    //signupMutation.mutate()
  }
  return (
    <main className='signup-page'>
      <header className='signup-header'>
        <link rel='stylesheet' href='/src/App.css' />
        <br />
        <h1>Crave Recipes</h1>
        <p>Crave · Create · Consume</p>
        <br />
        <Link to='/'>Back to main page</Link>
      </header>
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit} className='signup-form'>
        <section className='signup-username_password'>
          <br />
          <center>
            <h2>Please Sign Up</h2>
          </center>
          <div>
            <label htmlFor='create-username'>Username: </label>
            <input
              type='text'
              name='create-username'
              id='create-username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor='create-password'>Password: </label>
            <input
              type='password'
              name='create-password'
              id='create-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
        </section>
        <br />
        <br />
        <div>
          <input
            type='submit'
            value={loading ? 'Signing up...' : 'Sign Up'}
            disabled={!username || !password || loading}
          />
        </div>
      </form>
    </main>
  )
}
