import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/payload-types'
import { CalendarDays, ArrowRight, Clock, User } from 'lucide-react'
import { formatDate } from '@/utilities/formatDate'
import { cn } from '@/utilities/ui'

type PostCardProps = {
  post: Post
  className?: string
}

const PostCard: React.FC<PostCardProps> = ({ post, className }) => {
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
      className={cn(
        'group relative h-[460px] rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 flex flex-col transform hover:-translate-y-1',
        className,
      )}
    >
      {/* Full height background image with gradient overlay */}
      <div className="absolute inset-0">
        {imageData?.url ? (
          <>
            <Image
              src={imageData.url}
              alt={imageData.alt || title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30 opacity-80 group-hover:opacity-90 transition-opacity"></div>
          </>
        ) : (
          <div className="h-full w-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary/50">No image</span>
          </div>
        )}
      </div>

      {/* Content overlay positioned over the image */}
      <div className="relative h-full z-10 p-6 flex flex-col text-white">
        {/* Categories tag at the top */}
        {post.categories && post.categories.length > 0 && (
          <div className="mb-auto">
            <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
              {typeof post.categories[0] === 'object' ? post.categories[0].title : 'Category'}
            </span>
          </div>
        )}

        {/* Main content positioned at the bottom */}
        <div className="mt-auto">
          {/* Post title with enhanced typography */}
          <h3 className="text-2xl font-bold mb-3 group-hover:text-primary/90 transition-colors tracking-tight">
            {title}
          </h3>

          {/* Post description with better spacing, only show on hover */}
          {shortDescription && (
            <p className="text-sm text-white/80 line-clamp-3 mb-5 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {shortDescription}
            </p>
          )}

          {/* Post metadata */}
          <div className="flex items-center justify-between text-xs text-white/80 mb-4">
            {/* Date */}
            {publishedAt && (
              <div className="flex items-center">
                <CalendarDays size={14} className="mr-1.5 text-white/70" />
                <span>{formatDate(publishedAt, { format: 'medium' })}</span>
              </div>
            )}

            {/* Reading time */}
            <div className="flex items-center">
              <Clock size={14} className="mr-1.5 text-white/70" />
              <span>{estimatedReadingTime()} read</span>
            </div>
          </div>

          {/* Author section with improved styling */}
          {post.populatedAuthors && post.populatedAuthors.length > 0 && (
            <div className="flex items-center text-xs text-white/80 mb-4 border-t border-white/20 pt-4">
              <User size={14} className="mr-2 text-white/70" />
              <span>
                by{' '}
                <span className="font-medium text-white/90">
                  {post.populatedAuthors.map((author) => author.name).join(', ')}
                </span>
              </span>
            </div>
          )}

          {/* Read more link with enhanced animated arrow */}
          <div className="pt-1">
            <span className="inline-flex items-center text-primary/90 text-sm font-medium group-hover:underline">
              Read article
              <ArrowRight
                size={16}
                className="ml-1.5 transition-all duration-300 transform group-hover:translate-x-1.5"
              />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
