'use client'
// PostDetails.tsx
import React, { useState } from 'react'
import Image from 'next/image'
import { Post, Category } from '@/payload-types'
import { formatDate } from '@/utilities/formatDate'
import RichText from '../RichText'
import { CalendarDays, Clock, Share2, User, Tag, ChevronLeft } from 'lucide-react'
import RelatedPosts from './RelatedPosts'

type PostDetailsProps = {
  post: Post
}

const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  if (!post) return null

  const {
    title,
    content,
    shortDescription,
    publishedAt,
    heroImage,
    featuredImage,
    populatedAuthors,
    categories,
    relatedPosts,
  } = post

  // Handle featuredImage which can be a string or Media object
  const mainImage =
    heroImage && typeof heroImage === 'object'
      ? heroImage
      : featuredImage && typeof featuredImage === 'object'
        ? featuredImage
        : null

  const hasRelatedPosts = relatedPosts && Array.isArray(relatedPosts) && relatedPosts.length > 0

  // Format categories for display
  const categoryList =
    categories?.filter((category): category is Category => typeof category === 'object') || []

  // Calculate estimated reading time (about 200 words per minute)
  const estimatedReadingTime = () => {
    if (!content || !content.root || !content.root.children) return '3 min read'

    // Extract text from content
    let textContent = ''
    const extractText = (node: any) => {
      if (node.text) {
        textContent += node.text + ' '
      } else if (node.children) {
        node.children.forEach(extractText)
      }
    }

    content.root.children.forEach(extractText)

    // Calculate reading time
    const words = textContent.trim().split(/\s+/).length
    const minutes = Math.max(1, Math.ceil(words / 200))
    return `${minutes} min read`
  }

  // Copy to clipboard function
  const [copied, setCopied] = useState(false)
  const handleCopyURL = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
  }

  return (
    <div className="bg-background text-foreground w-full">
      {/* Hero section with header information */}
      <div className="relative w-full bg-gradient-to-r from-primary/10 to-accent/10 py-16 md:py-24">
        <div className="container max-w-5xl">
          {/* Post categories */}
          {categoryList.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {categoryList.map((category) => (
                <span
                  key={category.id}
                  className="bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium flex items-center"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {category.title}
                </span>
              ))}
            </div>
          )}

          {/* Post title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">{title}</h1>

          {/* Post description */}
          {shortDescription && (
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl">
              {shortDescription}
            </p>
          )}

          {/* Post metadata */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {/* Publication date */}
            {publishedAt && (
              <div className="flex items-center gap-1">
                <CalendarDays size={16} className="text-primary" />
                <span>{formatDate(publishedAt, { format: 'medium' })}</span>
              </div>
            )}

            {/* Reading time */}
            <div className="flex items-center gap-1">
              <Clock size={16} className="text-primary" />
              <span>{estimatedReadingTime()}</span>
            </div>

            {/* Authors */}
            {populatedAuthors && populatedAuthors.length > 0 && (
              <div className="flex items-center gap-1">
                <User size={16} className="text-primary" />
                <span>By {populatedAuthors.map((author) => author.name).join(', ')}</span>
              </div>
            )}
            {/* Share buttons */}
            <div className="flex gap-3 items-center cursor-pointer">
              <p
                className="rounded-full bg-muted hover:bg-muted/70 transition-colors"
                onClick={handleCopyURL}
                title="Copy link"
              >
                <Share2 size={18} className="text-primary" />
              </p>
              {copied && (
                <span className="text-sm text-primary bg-primary-foreground px-2 py-1 rounded-md animate-in fade-in">
                  URL copied!
                </span>
              )}
              {/* Add more social share icons here */}
            </div>
          </div>
        </div>
      </div>

      {/* Featured image */}
      {mainImage?.url && (
        <div className="container max-w-5xl -mt-8 md:-mt-16 relative z-10">
          <div className="aspect-[16/9] w-full relative overflow-hidden rounded-xl shadow-xl">
            <Image
              src={mainImage.url}
              alt={mainImage.alt || title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
            />
          </div>
        </div>
      )}

      <div className="container py-10 md:py-16">
        <div className="w-full">
          {/* Main content section */}

          <div className="prose prose-lg dark:prose-invert">
            {content && <RichText data={content} />}
          </div>

          {/* Author section - Enhanced */}
          {populatedAuthors && populatedAuthors.length > 0 && (
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="text-xl font-bold mb-6">Written by:</h3>
              <div className="flex flex-wrap gap-6 items-center">
                {populatedAuthors.map((author) => (
                  <div
                    key={author.id}
                    className="bg-card rounded-xl px-4 py-3 border border-border mb-4 flex flex-col md:flex-row md:items-center gap-4 min-w-max"
                  >
                    <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg">{author.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related posts section with enhanced design */}
      {hasRelatedPosts && (
        <div className="bg-muted py-16">
          <div className="container max-w-7xl">
            <h2 className="text-3xl font-bold mb-2">Related Articles</h2>
            <p className="text-muted-foreground mb-8">
              You might also be interested in these posts
            </p>
            <RelatedPosts posts={relatedPosts as Post[]} />
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails
