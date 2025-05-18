import React from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { Media } from '@/payload-types'
import { Media as RenderMedia } from '@/components/Media'

interface TutorialVideoProps {
  videoFile?: Media | string
  externalVideoUrl?: string
  thumbnailImage?: Media | string
  title: string
}

const TutorialVideo: React.FC<TutorialVideoProps> = ({
  videoFile,
  externalVideoUrl,
  thumbnailImage,
  title,
}) => {
  // Simple video player that matches the screenshot design
  return (
    <div className="aspect-video bg-black relative">
      {videoFile && typeof videoFile !== 'string' ? (
        <RenderMedia resource={videoFile} />
      ) : externalVideoUrl ? (
        <iframe src={externalVideoUrl} title={title} className="w-full h-full" allowFullScreen />
      ) : thumbnailImage && typeof thumbnailImage !== 'string' ? (
        <div className="w-full h-full relative">
          <Image src={thumbnailImage.url!} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
              <Play className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-white">No video available</p>
        </div>
      )}
    </div>
  )
}

export default TutorialVideo
