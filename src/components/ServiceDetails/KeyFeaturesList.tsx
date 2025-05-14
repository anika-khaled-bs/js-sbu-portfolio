import React from 'react'
import { Media } from '@/payload-types'
import { CheckCircle2 } from 'lucide-react'

type KeyFeature = {
  title: string
  description: string
  icon?: string | Media | null
  id?: string | null
}

type KeyFeaturesListProps = {
  features: KeyFeature[]
}

export const KeyFeaturesList: React.FC<KeyFeaturesListProps> = ({ features }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Key Features</h3>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="last:border-b-">
            <div className="grid grid-cols-2 mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <div className="font-semibold">{feature.title}: </div>
              </div>
              <div className="text-muted-foreground pl-8">{feature.description}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
