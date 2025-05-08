import React from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, className = '' }) => {
  return (
    <div
      className={`bg-muted h-[150px] md:h-[300px] ${className} mt-16 flex flex-col justify-center text-center`}
    >
      <p className="mb-4 text-3xl md:text-5xl font-bold">{title}</p>
      {description && <p className="text-muted-foreground text-lg mb-0">{description}</p>}
    </div>
  )
}

export default PageHeader
