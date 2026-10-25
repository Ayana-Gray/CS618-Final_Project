import { Post } from '../db/models/post.js'
export async function createPost({
  title,
  author,
  ingredients,
  contents,
  image,
  tags,
}) {
  const post = new Post({ title, author, ingredients, contents, image, tags })
  return await post.save()
}
