import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { signup } from '../api/users.js'
export function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate('/login'),
    onError: () => alert('failed to sign up!'),
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    signupMutation.mutate()
  }
  return (
    <main className='signup-page'>
      <header className='signup-header'>
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
          <br />
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
            value={signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
            disabled={!username || !password || signupMutation.isPending}
          />
        </div>
      </form>
    </main>
  )
}
