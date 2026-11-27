import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Status } from './Status.jsx'
import { ChatRoom } from './ChatRoom.jsx'
import { useSocket } from '../contexts/SocketIOContext.jsx'

export function Chat() {
  const { socket, status } = useSocket()
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (!socket) return

    const handlePostCreated = ({ postId, title }) => {
      setNotifications((current) => [{ postId, title }, ...current])
    }

    socket.on('post.created', handlePostCreated)
    return () => socket.off('post.created', handlePostCreated)
  }, [socket])

  return (
    <div style={{ padding: 8 }}>
      <Status />

      {notifications.map(({ postId, title }) => (
        <p key={postId}>
          New recipe posted: <Link to={`/posts/${postId}`}>{title}</Link>
        </p>
      ))}

      {status === 'connected' && <ChatRoom />}
    </div>
  )
}

/*import { Status } from '../components/Status.jsx'
import { ChatRoom } from '../components/ChatRoom.jsx'
import { useSocket } from '../contexts/SocketIOContext.jsx'
export function Chat() {
  const { status } = useSocket()
  return (
    <div style={{ padding: 8 }}>
      
      <Status />
     
      {status === 'connected' && <ChatRoom />}
    </div>
  )
}*/
