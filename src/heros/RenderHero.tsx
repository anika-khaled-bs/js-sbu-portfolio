import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

type HeroItemType = {
  hero?: {
    type?: 'highImpact' | 'mediumImpact' | 'lowImpact' | 'none'
    [key: string]: any
  }
  heading?: string
  subHeading?: string
}

type RenderHeroProps = {
  heroItems?: HeroItemType[]
}

export const RenderHero: React.FC<RenderHeroProps> = ({ heroItems }) => {
  if (!heroItems || heroItems.length === 0) return null

  return (
    <>
      {heroItems.map((item, index) => {
        const { hero, heading, subHeading } = item
        const { type } = hero || {}

        if (!type || type === 'none') return null

        const HeroToRender = heroes[type]

        if (!HeroToRender) return null

        return <HeroToRender key={index} {...hero} heading={heading} subHeading={subHeading} />
      })}
    </>
  )
}
