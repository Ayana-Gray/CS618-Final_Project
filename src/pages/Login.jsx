import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/users.js'
import { useAuth } from '../contexts/AuthContext.jsx'
export function Login() {
  const [, setToken] = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      setToken(data.token)
      navigate('/')
    },
    onError: () => alert('failed to login!'),
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate()
  }
  return (
    <main className='login-page'>
      <header className='login-header'>
        <br />
        <h1>Crave Recipes</h1>
        <p>Crave · Create · Consume</p>
        <br />
        <Link to='/'>Back to main page</Link>
      </header>
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit} className='login-form'>
        <section className='login-username_password'>
          <center>
            <h2>Please Log In</h2>
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
            value={loginMutation.isPending ? 'Logging in...' : 'Log In'}
            disabled={!username || !password || loginMutation.isPending}
          />
        </div>
      </form>
    </main>
  )
}
