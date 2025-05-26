import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'

export async function up({ payload, req, session }: MigrateUpArgs): Promise<void> {
  // Log the start of the migration
  console.log('Starting migration to add SEO keywords to posts...')

  try {
    // Get all existing posts
    const existingPosts = await payload.find({
      collection: 'posts',
      limit: 1000, // Adjust based on your expected number of posts
      depth: 0, // Minimal depth to speed up the query
      req,
    })

    console.log(`Found ${existingPosts.docs.length} posts to update`) // We'll use payload.update with a special context to indicate this is a migration
    // The revalidatePost hook has been modified to check for this context
    for (const post of existingPosts.docs) {
      if (!post.meta) {
        // If meta doesn't exist, create it with empty keywords array
        await payload.update({
          collection: 'posts',
          id: post.id,
          data: {
            meta: {
              keywords: [],
            },
          },
          context: {
            fromMigration: true, // This flag tells hooks to skip revalidation
          },
          req,
        })
      } else {
        // If meta exists but doesn't have keywords, add empty keywords array
        await payload.update({
          collection: 'posts',
          id: post.id,
          data: {
            meta: {
              ...post.meta,
              keywords: [],
            },
          },
          context: {
            fromMigration: true, // This flag tells hooks to skip revalidation
          },
          req,
        })
      }
    }

    console.log('Successfully added SEO keywords field to all posts.')
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Log the start of the rollback
  console.log('Rolling back the SEO keywords migration...')

  try {
    // Get all posts
    const existingPosts = await payload.find({
      collection: 'posts',
      limit: 1000,
      depth: 0,
      req,
    })

    console.log(`Found ${existingPosts.docs.length} posts to rollback`)

    // For each post, remove the keywords field from the meta object
    for (const post of existingPosts.docs) {
      if (post.meta && post.meta.keywords) {
        // Create a copy of the meta object without the keywords field
        const { keywords, ...metaWithoutKeywords } = post.meta

        // Update the post with the modified meta object
        await payload.update({
          collection: 'posts',
          id: post.id,
          data: {
            meta: metaWithoutKeywords,
          },
          context: {
            fromMigration: true, // This flag tells hooks to skip revalidation
          },
          req,
        })
      }
    }
  } catch (error) {
    console.error('Rollback failed:', error)
    throw error
  }
}
