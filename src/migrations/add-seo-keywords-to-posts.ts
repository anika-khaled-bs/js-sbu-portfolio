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

    console.log(`Found ${existingPosts.docs.length} posts to update`)

    // Use direct database access to bypass hooks like revalidation
    // that require Next.js context which isn't available in migrations
    if (session) {
      const postsCollection = payload.db.collections.posts

      // Update each post to include an empty keywords array in the meta object
      for (const post of existingPosts.docs) {
        if (!post.meta) {
          // If meta doesn't exist, create it with empty keywords array
          await postsCollection?.collection.updateOne(
            { _id: post.id },
            { $set: { meta: { keywords: [] } } },
            { session },
          )
        } else if (!post.meta.keywords) {
          // If meta exists but doesn't have keywords, add empty keywords array
          await postsCollection?.collection.updateOne(
            { _id: post.id },
            { $set: { 'meta.keywords': [] } },
            { session },
          )
        }
      }
    } else {
      // Fallback to direct collection access without session if session is not available
      // This is a direct database operation that bypasses the afterChange hooks
      for (const post of existingPosts.docs) {
        const collection = payload.db?.collections?.posts?.collection
        if (collection) {
          if (!post.meta) {
            await collection.updateOne({ _id: post.id }, { $set: { meta: { keywords: [] } } })
          } else if (!post.meta.keywords) {
            await collection.updateOne({ _id: post.id }, { $set: { 'meta.keywords': [] } })
          }
        }
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
          req,
        })
      }
    }

    console.log('Successfully removed SEO keywords field from all posts.')
  } catch (error) {
    console.error('Rollback failed:', error)
    throw error
  }
}
