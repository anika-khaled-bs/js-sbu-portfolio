import type { Block } from 'payload'
import {
  AlignFeature,
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { Banner } from '../Banner/config'
import { Code } from '../Code/config'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
            BlocksFeature({ blocks: [Banner, Code] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
            AlignFeature(),
            LinkFeature(),
            UnderlineFeature(),
            BoldFeature(),
            ItalicFeature(),
            SubscriptFeature(),
            SuperscriptFeature(),
            UploadFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
  ],
}
