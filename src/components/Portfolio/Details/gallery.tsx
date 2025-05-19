'use client'

import { Media } from '@/payload-types'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

const ProjectGallery = ({ gallery }: { gallery: { image: Media; id: string }[] }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [selectedImage, setSelectedImage] = useState<Media | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Reset to first page when gallery changes
  useEffect(() => {
    setActiveIndex(0)
  }, [gallery.length])
  const nextSlide = () => {
    const totalPages = Math.ceil(gallery.length / 5)
    setActiveIndex((prev) => (prev >= totalPages - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    const totalPages = Math.ceil(gallery.length / 5)
    setActiveIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }
  // No auto-play functionality - removed as requested
  if (!gallery || gallery.length === 0) return null
  // Calculate total pages needed
  const imagesPerPage = 5
  const totalPages = Math.ceil(gallery.length / imagesPerPage)

  // Get current page of images (5 images per page)
  const startIndex = activeIndex * imagesPerPage
  const currentPageImages = gallery.slice(startIndex, startIndex + imagesPerPage)

  // Just use the available images without filling in gaps
  const displayGallery = [...currentPageImages]
  // Function to open the modal with the selected image
  const openImageModal = (image: Media) => {
    setSelectedImage(image)
    setIsModalOpen(true)
    // Prevent body scrolling when modal is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }

  // Function to close the modal
  const closeImageModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    // Re-enable scrolling when modal is closed
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }

  // Handle keyboard events for the modal (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeImageModal()
      }
    }

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      // Make sure to re-enable scrolling when component unmounts
      if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
      }
    }
  }, [isModalOpen])

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-semibold">Gallery</h3>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/80 hover:bg-white shadow-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/80 hover:bg-white shadow-sm"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="grid grid-cols-12 gap-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {displayGallery.length === 1 ? (
          /* Single image layout - full width */
          <div className="col-span-12">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
              {' '}
              <Image
                src={displayGallery[0]?.image.url!}
                alt={displayGallery[0]?.image.alt || 'Project image'}
                fill
                priority
                sizes="100vw"
                className="object-cover transition-all duration-500 hover:scale-105 cursor-pointer"
                onClick={() => openImageModal(displayGallery[0]?.image!)}
              />
            </div>
          </div>
        ) : displayGallery.length === 2 ? (
          /* Two image layout - side by side */
          <>
            <div className="col-span-12 sm:col-span-6">
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                {' '}
                <Image
                  src={displayGallery[0]?.image.url!}
                  alt={displayGallery[0]?.image.alt || 'Project image'}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-all duration-500 hover:scale-105 cursor-pointer"
                  onClick={() => openImageModal(displayGallery[0]?.image!)}
                />
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6">
              {' '}
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                <Image
                  src={displayGallery[1]?.image.url!}
                  alt={displayGallery[1]?.image.alt || 'Project image'}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-all duration-500 hover:scale-105 cursor-pointer"
                  onClick={() => openImageModal(displayGallery[1]?.image!)}
                />
              </div>
            </div>
          </>
        ) : displayGallery.length === 3 ? (
          /* Three image layout */
          <>
            <div className="col-span-12 sm:col-span-6">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-md">
                {' '}
                <Image
                  src={displayGallery[0]?.image.url!}
                  alt={displayGallery[0]?.image.alt || 'Project image'}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-all duration-500 hover:scale-105 cursor-pointer"
                  onClick={() => openImageModal(displayGallery[0]?.image!)}
                />
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6">
              <div className="grid grid-rows-2 gap-4 h-full">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={displayGallery[1]?.image.url!}
                    alt={displayGallery[1]?.image.alt || 'Project image'}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition-all duration-500 hover:scale-105 cursor-pointer"
                    onClick={() => openImageModal(displayGallery[1]?.image!)}
                  />
                </div>{' '}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={displayGallery[2]?.image.url!}
                    alt={displayGallery[2]?.image.alt || 'Project image'}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition-all duration-500 hover:scale-105 cursor-pointer"
                    onClick={() => openImageModal(displayGallery[2]?.image!)}
                  />
                </div>
              </div>
            </div>
          </>
        ) : displayGallery.length === 4 ? (
          /* Four image layout - 2x2 grid */
          <>
            <div className="col-span-12 sm:col-span-6 md:col-span-6">
              <div className="grid grid-rows-2 gap-4 h-full">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                  {' '}
                  <Image
                    src={displayGallery[0]?.image.url!}
                    alt={displayGallery[0]?.image.alt || 'Project image'}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-all duration-500 hover:scale-105 cursor-pointer"
                    onClick={() => openImageModal(displayGallery[0]?.image!)}
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={displayGallery[1]?.image.url!}
                    alt={displayGallery[1]?.image.alt || 'Project image'}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-all duration-500 hover:scale-105 cursor-pointer"
                    onClick={() => openImageModal(displayGallery[1]?.image!)}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-6">
              <div className="grid grid-rows-2 gap-4 h-full">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={displayGallery[2]?.image.url!}
                    alt={displayGallery[2]?.image.alt || 'Project image'}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-all duration-500 hover:scale-105 cursor-pointer"
                    onClick={() => openImageModal(displayGallery[2]?.image!)}
                  />
                </div>{' '}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={displayGallery[3]?.image.url!}
                    alt={displayGallery[3]?.image.alt || 'Project image'}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-all duration-500 hover:scale-105 cursor-pointer"
                    onClick={() => openImageModal(displayGallery[3]?.image!)}
                  />
                </div>
              </div>
            </div>
          </>
        ) : displayGallery.length >= 5 ? (
          /* Five image layout - standard layout */
          <>
            {/* First column - large image */}
            <div className="col-span-12 sm:col-span-5 md:col-span-4">
              {' '}
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                <Image
                  src={displayGallery[0]?.image.url!}
                  alt={displayGallery[0]?.image.alt || 'Project image'}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 30vw"
                  className="object-cover transition-all duration-500 hover:scale-105 cursor-pointer"
                  onClick={() => openImageModal(displayGallery[0]?.image!)}
                />
              </div>
            </div>

            {/* Middle section - 2 stacked images */}
            <div className="col-span-6 sm:col-span-3 md:col-span-4">
              <div className="grid grid-rows-2 gap-4 h-full">
                {' '}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={displayGallery[1]?.image.url!}
                    alt={displayGallery[1]?.image.alt || 'Project image'}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover transition-all duration-500 hover:scale-105 cursor-pointer"
                    onClick={() => openImageModal(displayGallery[1]?.image!)}
                  />
                </div>{' '}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={displayGallery[2]?.image.url!}
                    alt={displayGallery[2]?.image.alt || 'Project image'}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover transition-all duration-500 hover:scale-105 cursor-pointer"
                    onClick={() => openImageModal(displayGallery[2]?.image!)}
                  />
                </div>
              </div>
            </div>

            {/* Last column - 2 stacked images */}
            <div className="col-span-6 sm:col-span-4 md:col-span-4">
              <div className="grid grid-rows-2 gap-4 h-full">
                {' '}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={displayGallery[3]?.image.url!}
                    alt={displayGallery[3]?.image.alt || 'Project image'}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover transition-all duration-500 hover:scale-105 cursor-pointer"
                    onClick={() => openImageModal(displayGallery[3]?.image!)}
                  />
                </div>{' '}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={displayGallery[4]?.image.url!}
                    alt={displayGallery[4]?.image.alt || 'Project image'}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover transition-all duration-500 hover:scale-105 cursor-pointer"
                    onClick={() => openImageModal(displayGallery[4]?.image!)}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Fallback - should never happen */
          <div className="col-span-12">No images available</div>
        )}{' '}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center items-center mt-4">
        {totalPages > 1 && (
          <>
            {/* Previous button */}
            <button
              onClick={prevSlide}
              className="mx-2 text-gray-600 hover:text-gray-900"
              aria-label="Previous page"
              disabled={activeIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Page indicators */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`w-2 h-2 mx-1 rounded-full transition-all ${
                  activeIndex === i ? 'bg-slate-800 w-3 h-3' : 'bg-slate-300'
                }`}
                onClick={() => setActiveIndex(i)}
                aria-label={`View page ${i + 1} of gallery`}
              />
            ))}

            {/* Next button */}
            <button
              onClick={nextSlide}
              className="mx-2 text-gray-600 hover:text-gray-900"
              aria-label="Next page"
              disabled={activeIndex === totalPages - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={closeImageModal}
        >
          {' '}
          <div
            className="relative max-w-7xl w-full h-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute -top-12 right-0 p-2 bg-white rounded-full shadow-lg text-black hover:bg-gray-100 z-50"
              onClick={closeImageModal}
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal navigation */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                className="p-2 bg-black/50 rounded-full hover:bg-black/70 text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  // Find current image index in the gallery
                  const currentIndex = gallery.findIndex(
                    (item) => item.image.id === selectedImage.id,
                  )
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : gallery.length - 1
                  setSelectedImage(gallery[prevIndex]?.image!)
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                className="p-2 bg-black/50 rounded-full hover:bg-black/70 text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  // Find current image index in the gallery
                  const currentIndex = gallery.findIndex(
                    (item) => item.image.id === selectedImage.id,
                  )
                  const nextIndex = currentIndex < gallery.length - 1 ? currentIndex + 1 : 0
                  setSelectedImage(gallery[nextIndex]?.image!)
                }}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Modal content */}
            <div className="relative h-full max-h-[80vh] flex items-center justify-center">
              <Image
                src={selectedImage.url!}
                alt={selectedImage.alt || 'Gallery image'}
                className="object-contain max-h-full max-w-full rounded-lg"
                width={selectedImage.width || 1200}
                height={selectedImage.height || 800}
              />
            </div>

            {/* Caption */}
            {selectedImage.alt && (
              <div className="mt-2 text-center text-white">
                <p>{selectedImage.alt}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectGallery
