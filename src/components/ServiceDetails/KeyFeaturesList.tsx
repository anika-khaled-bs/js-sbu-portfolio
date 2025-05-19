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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <div
          key={feature.id || index}
          className="bg-card text-card-foreground p-5 rounded-lg border border-border hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start gap-3 mb-2">
            <div className="rounded-full bg-primary/10 dark:bg-primary/20 p-2 mt-1">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
            </div>
            <h4 className="text-lg font-medium">{feature.title}</h4>
          </div>
          {feature.description && (
            <p className="text-muted-foreground mt-2 ml-10 text-sm">{feature.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}
