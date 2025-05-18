import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Code, ExternalLink } from 'lucide-react'
import { Tutorial, TechStack, Post } from '@/payload-types'

interface Resource {
  title: string
  url: string
  description?: string
}

interface TutorialSidebarProps {
  techStacks?: TechStack[] | string[]
  resources?: Resource[]
  codeRepository?: string
  demoURL?: string
  relatedTutorials?: Tutorial[] | string[]
  relatedPosts?: Post[] | string[]
}

const TutorialSidebar: React.FC<TutorialSidebarProps> = ({
  techStacks,
  resources,
  codeRepository,
  demoURL,
  relatedTutorials,
  relatedPosts,
}) => {
  return (
    <div className="space-y-6">
      {/* Tech Stacks Section */}
      {techStacks && techStacks.length > 0 && (
        <div className="bg-card rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Code className="h-5 w-5" />
            Technologies Used
          </h3>
          <div className="flex flex-wrap">
            {techStacks.map((tech: any, index: number) => (
              <span key={index} className="block bg-muted rounded-md px-4 py-2 mb-2 mr-2 text-sm">
                {typeof tech === 'object' ? tech.name : tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Resources Section */}
      {resources && resources.length > 0 && (
        <div className="bg-card rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            Additional Resources
          </h3>
          <ul className="space-y-3">
            {resources.map((resource, index) => (
              <li key={index}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex gap-1 items-center"
                >
                  {resource.title}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Links Section */}
      {(codeRepository || demoURL) && (
        <div className="bg-card rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Important Links</h3>
          <div className="space-y-3">
            {codeRepository && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  <span>View Source Code</span>
                </div>
                <a
                  href={codeRepository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            )}
            {demoURL && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  <span>Live Demo</span>
                </div>
                <a
                  href={demoURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Related Articles Section */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="bg-card rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
          <ul className="space-y-4">
            {relatedPosts.map((post: any, index: number) => {
              // Handle both string IDs and full objects
              if (typeof post === 'string') return null
              const title = post.title
              const slug = post.slug

              return (
                <li key={index}>
                  <Link href={`/post/${slug}`} className="text-primary hover:underline">
                    {title}
                  </Link>
                  {post.shortDescription && (
                    <p className="text-xs text-muted-foreground mt-1">{post.shortDescription}</p>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TutorialSidebar
