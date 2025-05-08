import React from 'react'

interface SkillSetOverviewProps {
  content: string | React.ReactNode
}

const SkillSetOverview = ({ content }: SkillSetOverviewProps) => {
  return (
    <section className="container py-12 md:py-16 bg-white">
      <div className="mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900">Overview</h2>
        <div className="prose prose-slate prose-lg max-w-none">
          {typeof content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            content
          )}
        </div>
      </div>
    </section>
  )
}

export default SkillSetOverview
