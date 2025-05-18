import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Post, Media } from '@/payload-types'
import { CalendarDays, ArrowRight, Clock } from 'lucide-react'
import { formatDate } from '@/utilities/formatDate'

type RelatedPostCardProps = {
  post: Post
}

const RelatedPostCard: React.FC<RelatedPostCardProps> = ({ post }) => {
  const { title, slug, featuredImage, shortDescription, publishedAt } = post
  const imageData = featuredImage && typeof featuredImage === 'object' ? featuredImage : null

  // Calculate estimated reading time (about 200 words per minute)
  const estimatedReadingTime = () => {
    if (!post.content || !post.content.root || !post.content.root.children) return '3 min'

    // Extract text from content (simplified approach)
    let textContent = ''
    const extractText = (node: any) => {
      if (node.text) {
        textContent += node.text + ' '
      } else if (node.children) {
        node.children.forEach(extractText)
      }
    }

    post.content.root.children.forEach(extractText)

    const words = textContent.trim().split(/\s+/).length
    const minutes = Math.max(1, Math.ceil(words / 200))
    return `${minutes} min`
  }

  return (
    <Link
      href={`/posts/${slug}`}
      className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1"
    >
      {/* Post featured image with gradient overlay */}
      <div className="relative h-56 w-full overflow-hidden">
        {imageData?.url ? (
          <>
            <Image
              src={imageData.url}
              alt={imageData.alt || title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
          </>
        ) : (
          <div className="h-full w-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary/50">No image</span>
          </div>
        )}

        {/* Categories overlay - if we have categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-primary/80 backdrop-blur-sm text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
              {typeof post.categories[0] === 'object' ? post.categories[0].title : 'Category'}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Post metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          {/* Date */}
          {publishedAt && (
            <div className="flex items-center">
              <CalendarDays size={14} className="mr-1" />
              <span>{formatDate(publishedAt, { format: 'medium' })}</span>
            </div>
          )}

          {/* Reading time */}
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{estimatedReadingTime()} read</span>
          </div>
        </div>

        {/* Post title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Post description */}
        {shortDescription && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-5">{shortDescription}</p>
        )}

        {/* Read more link with animated arrow */}
        <div className="mt-auto">
          <span className="inline-flex items-center text-primary text-sm font-medium group-hover:underline">
            Read article
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}

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
          <RelatedPostCard key={post.id} post={post} />
        ))}
    </div>
  )
}

export default RelatedPosts
