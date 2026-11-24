import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Header } from '../components/Header.jsx'
import { Post } from '../components/Post.jsx'
import { getPostById } from '../api/posts.js'
export function ViewPost() {
  const { postId } = useParams()
  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
  })
  const post = postQuery.data
  return (
    <div style={{ padding: 8 }}>
      <Header />
      <br />
      <hr />
      <Link to='/'>Back to main page</Link>
      <br />
      <hr />
      {post ? <Post {...post} fullPost /> : `Post with id${postId} not found.`}
    </div>
  )
}
