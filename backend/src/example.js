import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'
await initDatabase()
const post = new Post({
  title: 'Reggies Steakhouse Burger',
  author: 'Journey Jetson',
  ingredients:
    'Lettuce, Tomatoes, Sauteed onions, Bacon, Smoked cheddar, 1/2 pound seasoned angus minced meat, Sesame seed bun, House sauce',
  contents:
    'Grill Seasoned meat. Place on toasted sesame seed bun, and add toppings.',
  image:
    'https://pub-aaa82e9851064d22b954c3ebbafc9ae6.r2.dev/legacy/thumbnails/burger-with-melted-cheese-m-Y1i3jpYYJZYfOEfX5dX.webp',
  tags: ['Meal'],
})
const createdPost = await post.save()
await Post.findByIdAndUpdate(createdPost._id, {
  $set: { title: 'Reggies Steakhouse Burger Revisited!' },
})
const posts = await Post.find()
console.log(posts)
