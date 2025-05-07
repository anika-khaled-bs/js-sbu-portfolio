import Link from 'next/link'
import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Media } from '@/payload-types'
import Image from 'next/image'

export interface ServiceCardProps {
  title: string

  description: string | React.ReactNode

  icon: string | Media | null

  slug: string
}

export function ServiceCard({ title, description, icon, slug }: ServiceCardProps) {
  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="text-primary mb-4 text-4xl">
          {(icon as Media).url ? (
            <Image
              src={(icon as Media).url!}
              alt={title}
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
          ) : typeof icon === 'string' && icon ? (
            icon
          ) : null}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="pt-2 text-muted-foreground line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="bg-muted/50 h-1 w-16 rounded-full mb-4"></div>
        <p className="text-sm text-muted-foreground">
          Discover how our {title.toLowerCase()} services can transform your business and drive
          growth.
        </p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/services/${slug}`}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
