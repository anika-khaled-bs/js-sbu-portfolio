'use client'

import React from 'react'
import { Button } from './Button'
import { ArrowRight, Download, ExternalLink, Mail, Send } from 'lucide-react'

/**
 * This component serves as documentation for the various button styles and usages
 * You can use it for reference or in a documentation/styleguide page
 */
export const ButtonExamples: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-xl font-bold mb-3">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link Style</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Button Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Buttons with Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button icon={ArrowRight}>Icon Right</Button>
          <Button icon={ArrowRight} iconPosition="right">
            Icon Right
          </Button>
          <Button variant="outline" icon={Download}>
            Download
          </Button>
          <Button variant="secondary" icon={Send} iconPosition="right">
            Send Message
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Link Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button href="/contact">Internal Link</Button>
          <Button href="https://example.com" isExternal icon={ExternalLink} iconPosition="right">
            External Link
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Button States</h2>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled Button</Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
          <Button fullWidth>Full Width Button</Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Common Usage Examples</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Button variant="secondary" icon={Mail}>
              Contact Us
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>

          <div className="flex gap-4">
            <Button icon={Download} variant="outline">
              Download PDF
            </Button>
            <Button variant="ghost">Cancel</Button>
          </div>

          <form className="flex max-w-md">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-l-md border border-border"
            />
            <Button className="rounded-l-none">Subscribe</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
