import React from 'react'
import { Post } from '@/payload-types'
import PostCard from './PostCard'

type RelatedPostsProps = {
  posts: Post[]
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts
        .filter((post): post is Post => typeof post === 'object')
        .map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
    </div>
  )
}

export default RelatedPosts
