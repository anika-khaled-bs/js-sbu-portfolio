import type { CollectionBeforeChangeHook } from 'payload'

/**
 * This hook ensures consistent formatting of tech stack names
 * by normalizing spacing and common technology name formatting
 */
export const formatTechStackName: CollectionBeforeChangeHook = async ({ data, operation }) => {
  if ((operation === 'create' || operation === 'update') && data.name) {
    // Normalize whitespace
    let formattedName = data.name.trim().replace(/\s+/g, ' ')

    // Handle common tech names with specific case formatting
    const specialCases: Record<string, string> = {
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      react: 'React',
      'react.js': 'React',
      reactjs: 'React',
      'react js': 'React',
      'node.js': 'Node.js',
      nodejs: 'Node.js',
      'node js': 'Node.js',
      'vue.js': 'Vue.js',
      vuejs: 'Vue',
      'vue js': 'Vue',
      'angular.js': 'AngularJS',
      angularjs: 'AngularJS',
      'angular js': 'AngularJS',
      angular: 'Angular',
      'next.js': 'Next.js',
      nextjs: 'Next.js',
      'next js': 'Next.js',
      mongodb: 'MongoDB',
      postgresql: 'PostgreSQL',
      mysql: 'MySQL',
      graphql: 'GraphQL',
      github: 'GitHub',
      gitlab: 'GitLab',
      'amazon web services': 'AWS',
      aws: 'AWS',
      css: 'CSS',
      html: 'HTML',
      php: 'PHP',
      laravel: 'Laravel',
      django: 'Django',
      docker: 'Docker',
      kubernetes: 'Kubernetes',
      'express.js': 'Express.js',
      expressjs: 'Express.js',
      'express js': 'Express.js',
      express: 'Express',
      redux: 'Redux',
    }

    // Check if the name matches any special case (case insensitive)
    const nameLower = formattedName.toLowerCase()
    if (specialCases[nameLower]) {
      formattedName = specialCases[nameLower]
    } else {
      // If not a special case, ensure first letter is capitalized
      formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1)
    }

    data.name = formattedName
  }

  return data
}
