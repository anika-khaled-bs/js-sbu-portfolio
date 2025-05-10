import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Media, Portfolio } from '@/payload-types'

interface ProjectCardProps {
  project: Portfolio
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex flex-col h-full overflow-hidden rounded-lg bg-muted shadow-sm hover:shadow-md transition-all"
    >
      {/* Logo or Brand Section */}
      <div className="p-6 flex items-center justify-center h-24">
        <Image
          src={(project.logo as Media).url!}
          alt={`${project.title} logo`}
          width={120}
          height={40}
          className="max-h-12 object-contain"
        />
      </div>

      <div className="px-6 py-6 flex-grow flex flex-col">
        {/* Screenshot/Image Section */}
        <div className="relative aspect-[16/9] overflow-hidden mb-6">
          <Image
            src={(project.featuredImage as Media).url!}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {project.shortDescription}
        </p>

        {/* Services Tags (Uncomment if you want to use them) */}
        {/* {project.relatedServices && project.relatedServices.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.relatedServices
              .filter((service): service is any => typeof service !== 'string')
              .slice(0, 3)
              .map((service, index) => (
                <span key={index} className="text-xs px-2 py-1 bg-muted rounded-full">
                  {service.title}
                </span>
              ))}
          </div>
        )} */}
      </div>
    </Link>
  )
}
