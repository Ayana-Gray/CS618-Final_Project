import { PostList } from '../components/PostList.jsx'
import { CreatePost } from '../components/CreatePost.jsx'
import { PostFilter } from '../components/PostFilter.jsx'
import { PostSorting } from '../components/PostSorting.jsx'
import { Header } from '../components/Header.jsx'
//import { useQuery } from '@tanstack/react-query'
//import { getPosts } from '../api/posts.js'
import { useState } from 'react'
import { useQuery as useGraphQLQuery } from '@apollo/client/react/index.js'
import { GET_POSTS, GET_POSTS_BY_AUTHOR } from '../api/graphql/posts.js'
import { Helmet } from 'react-helmet-async'
export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  /* const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  }) 
  const posts = postsQuery.data ?? [] */

  const postsQuery = useGraphQLQuery(author ? GET_POSTS_BY_AUTHOR : GET_POSTS, {
    variables: { author, options: { sortBy, sortOrder } },
  })

  const posts = postsQuery.data?.postsByAuthor ?? postsQuery.data?.posts ?? []

  return (
    <main className='blog-page'>
      <header className='blog-header'>
        <Helmet>
          <title>Crave Recipe Blog</title>
          <meta name='description' content='Recipes listed on Crave.' />
        </Helmet>

        <link rel='stylesheet' href='/src/App.css' />
        <br />
        <Header />
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
