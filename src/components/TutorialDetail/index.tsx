import React from 'react'
import Image from 'next/image'
import { Tutorial, Media, Category, User, TechStack, Post } from '@/payload-types'
import TutorialHeader from './TutorialHeader'
import TutorialVideo from './TutorialVideo'
import TutorialSidebar from './TutorialSidebar'
import RichText from '../RichText'

interface TutorialDetailProps {
  tutorial: Tutorial
}

const TutorialDetail: React.FC<TutorialDetailProps> = ({ tutorial }) => {
  const {
    title,
    shortDescription,
    thumbnailImage,
    featuredImage,
    videoFile,
    externalVideoUrl,
    content,
    techStacks,
    difficultyLevel,
    duration,
    publishedAt,
    authors,
    categories,
    prerequisites,
    resources,
    codeRepository,
    demoURL,
    relatedTutorials,
    relatedPosts,
  } = tutorial

  return (
    <div className="container px-4 mx-auto">
      {/* Tutorial Header with title, meta info, etc. */}
      <TutorialHeader
        title={title}
        shortDescription={shortDescription}
        difficultyLevel={difficultyLevel as 'beginner' | 'intermediate' | 'advanced' | undefined}
        duration={duration ?? 0}
        publishedAt={publishedAt ?? ''}
        categories={categories as Category[]}
        authors={authors as User[]}
        featuredImage={featuredImage as Media}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Video Section */}
          <div className="bg-card rounded-xl overflow-hidden shadow-md">
            <TutorialVideo
              videoFile={videoFile}
              externalVideoUrl={externalVideoUrl as string}
              thumbnailImage={thumbnailImage}
              title={title}
            />
          </div>

          {/* Tutorial Content */}
          <div className="bg-card rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Tutorial</h2>
            <div className="prose prose-sm md:prose-base max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-primary">
              {content && <RichText data={content} />}
            </div>
          </div>

          {/* Prerequisites Section (if available) */}
          {prerequisites && (
            <div className="bg-card rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
              <div className="prose prose-sm md:prose-base max-w-none prose-headings:text-foreground prose-p:text-muted-foreground">
                <RichText data={prerequisites} />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1">
          <TutorialSidebar
            techStacks={techStacks as TechStack[]}
            resources={
              resources as { title: string; url: string; description?: string }[] | undefined
            }
            codeRepository={codeRepository ?? ''}
            demoURL={demoURL ?? ''}
            relatedTutorials={relatedTutorials as Tutorial[]}
            relatedPosts={relatedPosts as Post[]}
          />
        </div>
      </div>
    </div>
  )
}

export default TutorialDetail
