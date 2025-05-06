import Image from 'next/image'

interface ClientLogoProps {
  name: string
  logo: string
}

export const ClientLogo = ({ name, logo }: ClientLogoProps) => {
  return (
    <div className="bg-white p-4 h-28 flex items-center justify-center rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
      {logo ? (
        <Image
          src={logo}
          alt={`${name} logo`}
          width={150}
          height={80}
          className="object-contain w-full h-full max-h-16"
        />
      ) : (
        <span className="text-lg font-medium text-center text-gray-600">{name}</span>
      )}
    </div>
  )
}
