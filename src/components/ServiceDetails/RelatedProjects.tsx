import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Media, Portfolio } from '@/payload-types'

type ProjectCardProps = {
  project: Portfolio
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, slug, featuredImage, shortDescription, meta } = project
  const imageData = featuredImage && typeof featuredImage === 'object' ? featuredImage : null
  // Get description from shortDescription or meta.description
  const description = shortDescription || (meta?.description ? meta.description : '')

  return (
    <Link
      href={`/portfolio/${slug}`}
      className="block bg-card text-card-foreground rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-border"
    >
      {imageData?.url && (
        <div className="relative h-48 w-full">
          <Image
            src={imageData.url}
            alt={imageData.alt || title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        {description && <p className="text-muted-foreground line-clamp-3 text-sm">{description}</p>}
        <div className="mt-4 flex justify-end">
          <span className="text-primary font-medium text-sm flex items-center">
            View Project
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

type RelatedProjectsProps = {
  currentServiceId: string
  projects: Portfolio[]
}

export const RelatedProjects: React.FC<RelatedProjectsProps> = ({ projects }) => {
  // No need to filter projects as they're already coming filtered from the service response
  if (!projects || !Array.isArray(projects) || projects.length === 0) {
    return null
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
