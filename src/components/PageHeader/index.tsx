import Image from 'next/image'
import React from 'react'
import RichText from '../RichText'

interface PageHeaderProps {
  title?: string
  description?: string
  className?: string
  image?: string
  richText?: any
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  className = '',
  image,
  richText,
}) => {
  return (
    <div
      className={`relative ${image ? '' : 'bg-muted'}  h-[130px] md:h-[300px] ${className} mt-16 flex flex-col justify-center text-center overflow-hidden`}
    >
      {image && (
        <>
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <Image src={image} alt={title!} fill className="object-cover" priority />
        </>
      )}
      <div className={`relative md:max-w-[40%] mx-auto ${image ? 'z-20 text-white' : ''}`}>
        {richText ? (
          <RichText data={richText} />
        ) : (
          <>
            {title && <p className="mb-4 text-lg md:text-5xl font-bold">{title}</p>}
            {description && (
              <p
                className={`text-xs md:text-lg mb-0 px-8 md:px-0 ${image ? 'text-white/80' : 'text-muted-foreground'}`}
              >
                {description}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PageHeader
