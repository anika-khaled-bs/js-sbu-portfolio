import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PageHeaderBlock } from '@/blocks/PageHeaderBlock/Component'
import { SliderBlockComponent } from '@/blocks/SliderBlock/Component'
import { cn } from '@/utilities/ui'

const blockComponents = {
  archive: ArchiveBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  pageHeaderBlock: PageHeaderBlock,
  slider: SliderBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  hero?: React.ReactNode
  type?: string
}> = (props) => {
  const { blocks, hero, type } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {hero}
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className={cn(blockType !== 'pageHeaderBlock' && 'my-16')} key={index}>
                  <Block {...block} disableInnerContainer index={index} type={type} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
