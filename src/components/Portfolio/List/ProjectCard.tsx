import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Media, Portfolio } from '@/payload-types'
import { Calendar } from 'lucide-react'
import { formatDate } from '@/utilities/formatDate'

interface ProjectCardProps {
  project: Portfolio
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex flex-col h-full overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-md transition-all"
    >
      {/* Logo or Brand Section */}
      {/* <div className="flex items-center justify-center h-24">
        <Image
          src={(project.logo as Media).url!}
          alt={`${project.title} logo`}
          width={120}
          height={40}
          className="max-h-12 object-contain"
        />
      </div> */}

      <div className="px-6 py-4 flex-grow flex flex-col">
        {/* Screenshot/Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden mb-6 rounded-md">
          <Image
            src={(project.featuredImage as Media).url!}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="flex md:justify-around items-center mb-2 flex-wrap md:flex-nowrap gap-2">
          <p className="text-xl font-semibold min-w-max">{project.title}</p>
          {/* Completion Date - display if present */}
          {project.completionDate && (
            <div className="text-xs text-muted-foreground mt-auto mb-2 flex items-center md:justify-end w-full">
              <span className="mx-1">
                <Calendar size={12} />
              </span>
              {formatDate(project.completionDate, { format: 'medium' })}
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {project.shortDescription}
        </p>

        {/* Services Tags (Uncomment if you want to use them) */}
        {project.relatedServices && project.relatedServices.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.relatedServices
              .filter((service): service is any => typeof service !== 'string')
              .slice(0, 3)
              .map((service, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 text-xs bg-muted-foreground/10 rounded-full text-muted-foreground before:content-['•'] before:mr-1.5 before:text-sm"
                >
                  {service.title}
                </span>
              ))}
          </div>
        )}
      </div>
    </Link>
  )
}
