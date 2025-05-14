import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type BreadcrumbItem = {
  label: string
  href: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumbs" className="mb-6">
      <ol className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400">
        <li className="flex items-center">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-200">
            Home
          </Link>
          <ChevronRight className="mx-2 h-4 w-4" />
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.href} className="flex items-center">
              {isLast ? (
                <span className="text-gray-900 dark:text-gray-200 font-medium">{item.label}</span>
              ) : (
                <>
                  <Link href={item.href} className="hover:text-gray-900 dark:hover:text-gray-200">
                    {item.label}
                  </Link>
                  <ChevronRight className="mx-2 h-4 w-4" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
