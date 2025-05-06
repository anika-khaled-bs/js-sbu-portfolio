import React from 'react'
import Link from 'next/link'
import { Footer, TechStack } from '@/payload-types'
import { Gutter } from '@/components/Gutter'
import { CMSLink } from '@/components/Link'

export const FooterComponent: React.FC<{
  footer: Footer
}> = ({ footer }) => {
  const {
    quickLinks,
    serviceCategories,
    featuredTechStacks,
    showAllTechCategories,
    socialLinks,
    subscription,
  } = footer

  const groupedTechStacks = React.useMemo(() => {
    if (!featuredTechStacks || !Array.isArray(featuredTechStacks)) return {}

    return featuredTechStacks.reduce(
      (acc, tech) => {
        if (typeof tech === 'string') return acc
        const category = tech.category
        if (!category) return acc
        if (!acc[category]) acc[category] = []
        acc[category].push(tech)
        return acc
      },
      {} as Record<string, TechStack[]>,
    )
  }, [featuredTechStacks])

  return (
    <footer className="bg-secondary pt-12 pb-8">
      <Gutter className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* Logo and Description */}
          <div>
            <Link href="/" className="text-2xl font-bold  mb-2 inline-block text-text-primary">
              Aura Studio
            </Link>
            <p className="text-sm text-text-secondary mb-4">
              Creating innovative digital experiences for forward-thinking brands and businesses.
            </p>
            {socialLinks && (
              <div>
                <h5 className="font-semibold mb-2">Follow Us</h5>
                <div className="flex space-x-4">
                  {socialLinks.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="hover:text-blue-400 transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  )}
                  {socialLinks.github && (
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="hover:text-gray-400 transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold mb-3">Quick Links</h5>
            {quickLinks?.length! > 0 && (
              <ul className="space-y-2">
                {quickLinks?.map((link, i) => (
                  <li key={i}>
                    <CMSLink {...link.link} className="hover:underline" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Popular Services */}
          <div>
            <h5 className="font-semibold mb-3">Popular Services</h5>
            {serviceCategories?.length! > 0 && (
              <ul className="space-y-2">
                {serviceCategories?.map((category, i) => {
                  if (typeof category === 'string') return null
                  return (
                    <li key={category.id || i}>
                      <Link
                        href={`/services${category.slug ? `/${category.slug}` : ''}`}
                        className="hover:underline"
                      >
                        {category.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Technology Stacks */}
          <div>
            <h5 className="font-semibold mb-3">Technology Stacks</h5>
            {showAllTechCategories && (
              <div className="space-y-3 text-sm">
                {Object.entries(groupedTechStacks).map(([category, techs]) => (
                  <div key={category}>
                    <h6 className="font-medium capitalize">{category.replace('-', '/')}:</h6>
                    <p className="text-gray-300">{techs.map((t) => t.name).join(', ')}</p>
                  </div>
                ))}
              </div>
            )}
            {!showAllTechCategories && (
              <ul className="space-y-2 text-sm">
                {featuredTechStacks?.map((tech, i) => {
                  if (typeof tech === 'string') return null
                  return (
                    <li key={tech.id || i}>
                      <Link
                        href={`/tech-stacks${tech.slug ? `/${tech.slug}` : ''}`}
                        className="hover:underline"
                      >
                        {tech.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Subscription */}
          <div>
            {subscription && (
              <div>
                <h5 className="font-semibold mb-2">
                  {subscription.title || 'Subscribe to our newsletter'}
                </h5>
                <p className="text-sm text-gray-300 mb-4">
                  {subscription.description ||
                    'Get the latest updates and news delivered to your inbox'}
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    required
                    className="px-3 py-2 rounded bg-gray-800 text-white placeholder:text-gray-400 text-sm w-full"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} Aura Studio. All rights reserved.</p>
          <p>Built with React, Next.js, and Payload CMS</p>
        </div>
      </Gutter>
    </footer>
  )
}
