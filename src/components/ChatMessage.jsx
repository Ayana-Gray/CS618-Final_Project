import PropTypes from 'prop-types'
//import { Link } from 'react-router-dom'
export function ChatMessage({ username, message }) {
  return (
    <div>
      <b>{username}</b> created a new recipe post!
      <br />
      Click on the link below to view it.
      <br />
      {message}
    </div>
  )
}
ChatMessage.propTypes = {
  username: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}
