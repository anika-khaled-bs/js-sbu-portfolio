import React from 'react'
import RichText from '../RichText'

interface TutorialContentProps {
  content: any
}

const TutorialContent: React.FC<TutorialContentProps> = ({ content }) => {
  return (
    <div className="tutorial-content">
      <h2 className="text-2xl font-semibold mb-6">Tutorial</h2>

      {/* Rich Text Content */}
      <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-primary">
        <RichText data={content} />
      </div>
    </div>
  )
}

export default TutorialContent
