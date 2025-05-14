import React from 'react'
import RichText from '../RichText'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type ServiceContentProps = {
  content: SerializedEditorState
}

export const ServiceContent: React.FC<ServiceContentProps> = ({ content }) => {
  return (
    <div className="prose prose-lg dark:prose-invert w-full">
      <RichText data={content} />
    </div>
  )
}
