import { Media } from '@/payload-types'
import Image from 'next/image'
import { Media as MediaComponent } from '../Media'
import { cn } from '@/utilities/ui'

interface ClientLogoProps {
  name: string
  logo: Media | string
}

export const ClientLogo = ({ name, logo }: ClientLogoProps) => {
  return (
    <div className="bg-white p-4 h-28 flex items-center justify-center rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
      {logo ? (
        <MediaComponent
          imgClassName={cn('object-contain w-full h-full min-h-44')}
          resource={logo}
        />
      ) : (
        <span className="text-lg font-medium text-center text-gray-600">{name}</span>
      )}
    </div>
  )
}
