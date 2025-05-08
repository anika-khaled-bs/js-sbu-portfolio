import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

interface RelatedBlogCardProps {
  title: string
  description: string
  date?: string
  link: string
}

const RelatedBlogCard = ({ title, description, date, link }: RelatedBlogCardProps) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        {date && <CardDescription>{date}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-slate-700 line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="group">
          <Link href={link}>
            Read More{' '}
            <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RelatedBlogCard
