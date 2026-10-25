import { PostList } from './components/PostList.jsx'
import { CreatePost } from './components/CreatePost.jsx'
import { PostFilter } from './components/PostFilter.jsx'
import { PostSorting } from './components/PostSorting.jsx'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from './api/posts.js'
import { useState } from 'react'
export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  })
  const posts = postsQuery.data ?? []

  return (
    <main className='blog-page'>
      <header className='blog-header'>
        <h1>Crave Recipes</h1>
        <p>Crave · Create · Consume</p>
      </header>

      <section className='blog-create'>
        <CreatePost />
      </section>

      <section className='blog-controls'>
        <div className='blog-filter'>
          <span>Filter by</span>
          <PostFilter
            field='author'
            value={author}
            onChange={(value) => setAuthor(value)}
          />
        </div>

        <PostSorting
          fields={['createdAt', 'updatedAt']}
          value={sortBy}
          onChange={(value) => setSortBy(value)}
          orderValue={sortOrder}
          onOrderChange={(orderValue) => setSortOrder(orderValue)}
        />
      </section>

      <section className='blog-posts'>
        <PostList posts={posts} />
      </section>
    </main>
  )
}
