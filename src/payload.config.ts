// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb' // database-adapter-import

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories/index'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Services } from './collections/Services'
import { TechStacks } from './collections/TechStacks'
import { Team } from './collections/Team'
import { Testimonials } from './collections/Testimonials'
import { Portfolio } from './collections/Portfolio'
import { HeroSliders } from './collections/HeroSliders'
import { ContactDetails } from './collections/ContactDetails'

import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { Values } from './collections/Values'

import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { v2 as cloudinary } from 'cloudinary'
import type { HandleUpload, HandleDelete } from '@payloadcms/plugin-cloud-storage/types'
import type { UploadApiResponse } from 'cloudinary'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const cloudinaryAdapter = () => ({
  name: 'cloudinary-adapter',
  async handleUpload({
    file,
    collection,
    data,
    req,
    clientUploadContext,
  }: Parameters<HandleUpload>[0]) {
    try {
      // creating a function that will upload your file in cloudinary
      // Uploading the file to Cloudinary using upload_stream.
      // Since Cloudinary's upload_stream is callback-based, we wrap it in a Promise
      // so we can use async/await syntax for cleaner, easier handling.
      // It uploads the file with a specific public_id under "media/", without overwriting existing files.

      // Log file info for debugging
      console.log('Uploading file to Cloudinary:', {
        filename: file.filename,
        filesize: file.filesize,
        mimetype: file.mimeType,
      })

      const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto', // auto-detect file type (image, video, etc.)
            public_id: `media/${file.filename.replace(/\.[^/.]+$/, '')}`, // Set custom file name without extension, and it also prefixed the cleaned filename with media/
            overwrite: false, // Do not overwrite if a file with the same name exists
            use_filename: true, // Use original filename
            chunk_size: 6000000, // Use chunked uploading for larger files (6MB chunks)
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error)
              return reject(error)
            }
            if (!result) return reject(new Error('No result returned from Cloudinary'))
            resolve(result) // handle result
          },
        )
        uploadStream.end(file.buffer) // this line send the file to cloudinary it means entire file is already in memory and will be send whole thing at once not in chunk
      })
      file.filename = uploadResult.public_id // Use Cloudinary's public_id as the file's unique name
      file.mimeType = `${uploadResult.format}` // Set MIME type based on Cloudinary's format (e.g., image/png)
      file.filesize = uploadResult.bytes // Set the actual file size in bytes, for admin display and validations
      // data.url = uploadResult.secure_url // This saves the URL to DB but it's not needed since the generateFileURL function is used to get the URL
    } catch (err) {
      console.error('Upload Error:', err)
      throw err // Re-throw to let Payload handle the error
    }
  },

  async handleDelete({ collection, doc, filename, req }: Parameters<HandleDelete>[0]) {
    console.log('handleDelete has been called')

    // if filename is present then we will look for that file
    try {
      // We remove the file extension from the filename and then target the file
      // inside the "media/" folder on Cloudinary (which we used as the upload path)
      await cloudinary.uploader.destroy(`media/${filename.replace(/\.[^/.]+$/, '')}`)
    } catch (error) {
      // if something error occured we will catch the error and respond the error in console
      console.error('Cloudinary Delete Error:', error)
    }
  },
  staticHandler() {
    return new Response('Not implemented', { status: 501 })
  },
})

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  // database-adapter-config-start
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  // database-adapter-config-end
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    Services,
    TechStacks,
    Team,
    Testimonials,
    Portfolio,
    HeroSliders,
    Values,
    ContactDetails,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter,

          disableLocalStorage: true, // Prevent Payload from saving files to disk

          generateFileURL: async ({ filename }) => {
            return cloudinary.url(`media/${filename}`, {
              secure: true,
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            })
          },
        },
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
