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
    <main className='view-post-page'>
      <header className='view-post-header'>
        <Header />
        <br />
        <Link to='/'>Back to main page</Link>
      </header>

      {post ? <Post {...post} fullPost /> : `Post with id ${postId} not found.`}
    </main>
  )
}
