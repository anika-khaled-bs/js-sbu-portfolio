import React from 'react'

type ServiceHeaderProps = {
  title: string
  shortDescription?: string
}

export const ServiceHeader: React.FC<ServiceHeaderProps> = ({ title, shortDescription }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
      {shortDescription && (
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
          {shortDescription}
        </p>
      )}
    </div>
  )
}
