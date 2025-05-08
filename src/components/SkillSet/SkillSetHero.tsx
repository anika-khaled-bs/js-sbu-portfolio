import React from 'react'

interface SkillSetHeroProps {
  title: string
  subtitle?: string
}

const SkillSetHero = ({ title, subtitle }: SkillSetHeroProps) => {
  return (
    <div className="relative bg-muted text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 opacity-90" />
      <div className="relative mx-auto py-24 md:py-32">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{title}</h1>
          {subtitle && <div className="text-xl md:text-2xl text-slate-300">{subtitle}</div>}
        </div>
      </div>
    </div>
  )
}

export default SkillSetHero
