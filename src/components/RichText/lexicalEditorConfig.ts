import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'

import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'

// Default blocks used across the application
const defaultBlocks = [Banner, Code, MediaBlock]

/**
 * Creates a standardized Lexical editor configuration with consistent features
 * @param customBlocks - Additional blocks to include beyond the default ones
 * @returns Lexical editor configuration
 */
export const createLexicalEditorConfig = (customBlocks: any[] = []) => {
  return lexicalEditor({
    features: ({ rootFeatures }) => {
      return [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
        BlocksFeature({ blocks: [...defaultBlocks, ...customBlocks] }),
        OrderedListFeature(),
        UnorderedListFeature(),
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
        StrikethroughFeature(),
        ParagraphFeature(),
        ChecklistFeature(),
        BlockquoteFeature(),
      ]
    },
  })
}

/**
 * Preconfigured lexical editor with default settings
 * Ready to use without additional configuration
 */
export const defaultLexicalEditor = createLexicalEditorConfig()
