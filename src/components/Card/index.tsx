import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export interface CardProps {
  title: string
  imageUrl: string
  link: string
  otherInfo?: React.ReactNode | string | number
}

export function Card({ title, imageUrl, link, otherInfo }: CardProps) {
  return (
    <Link
      href={link}
      className="group flex flex-col h-full overflow-hidden rounded-lg shadow-sm card-hover"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 w-full p-4 text-white">
            <p className="text-xl font-semibold ">{title}</p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-card flex-grow">
        <h3 className="text-2xl mt-4 mb-2 font-semibold text-black dark:text-white group-hover:text-primary">
          {title}
        </h3>
        {otherInfo}
      </div>
    </Link>
  )
}
