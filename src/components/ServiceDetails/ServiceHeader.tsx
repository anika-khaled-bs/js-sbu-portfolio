import React from 'react'

type ServiceHeaderProps = {
  title: string
  shortDescription?: string
}

export const ServiceHeader: React.FC<ServiceHeaderProps> = ({ title, shortDescription }) => {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
      {shortDescription && (
        <p className="text-lg md:text-xl text-primary-foreground/90">{shortDescription}</p>
      )}
    </div>
  )
}
