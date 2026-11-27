import { Link } from 'react-router-dom'
import { User } from './User.jsx'
import { useSocket } from '../contexts/SocketIOContext.jsx'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
export function Header() {
  const [token, setToken] = useAuth()
  const { socket } = useSocket()
  const handleLogout = () => {
    socket.disconnect()
    setToken(null)
  }
  if (token) {
    const { sub } = jwtDecode(token)
    return (
      <div>
        <h1>Crave Recipes</h1>
        <p>Crave · Create · Consume</p>
        Logged in as <User id={sub} />
        <br />
        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }
  return (
    <div>
      <h1>Crave Recipes</h1>
      <p>Crave · Create · Consume</p>
      <br />
      <Link to='/login'>Log In</Link> | <Link to='/signup'>Sign Up</Link>
    </div>
  )
}
