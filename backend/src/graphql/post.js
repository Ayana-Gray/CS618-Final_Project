import { getUserInfoById } from '../services/users.js'
export const postSchema = `#graphql
type Post {
id: ID!
title: String!
author: User
contents: String
ingredients: String
image: String
likes: [ID!]
tags: [String!]
createdAt: Float
updatedAt: Float
}
`
export const postResolver = {
  Post: {
    likes: (post) => (post.likes ?? []).map((id) => id.toString()),
    author: async (post) => {
      return await getUserInfoById(post.author)
    },
  },
}
