import { Header } from '../components/Header.jsx'
import { Status } from '../components/Status.jsx'
import { ChatRoom } from '../components/ChatRoom.jsx'
import { useSocket } from '../contexts/SocketIOContext.jsx'
export function Chat() {
  const { status } = useSocket()
  return (
    <main className='chat-page'>
      <header className='chat-header'>
        <br />
        <Header />
      </header>
      <br />
      <Status />
      <br />
      <hr />
      <br />
      {status === 'connected' && <ChatRoom />}
    </main>
  )
}
