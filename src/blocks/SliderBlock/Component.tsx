'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { Media as MediaBlock } from '@/components/Media'
import Link from 'next/link'
import styles from './styles.module.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Media, SliderBlock } from '@/payload-types'

type Props = SliderBlock & {
  className?: string
}

export const SliderBlockComponent: React.FC<Props> = (props) => {
  const { slides, settings, className } = props

  // Extract settings with defaults
  const autoplay = settings?.autoplay !== false
  const showNavigation = settings?.showNavigation !== false
  const showPagination = settings?.showPagination !== false
  const speed = settings?.speed || 500
  const delay = settings?.delay || 3000
  const contentAlignment = settings?.contentAlignment || 'center'
  const loop = settings?.loop !== false

  if (!slides || slides.length === 0) {
    return null
  }

  // Map alignment values to Tailwind classes
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }

  const alignmentClass =
    alignmentClasses[contentAlignment as keyof typeof alignmentClasses] || alignmentClasses.center

  return (
    <div className={cn(styles.sliderContainer, className)}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={
          showNavigation
            ? {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }
            : false
        }
        pagination={showPagination ? { clickable: true } : false}
        autoplay={autoplay ? { delay, disableOnInteraction: false } : false}
        speed={speed}
        loop={loop}
        className="w-full"
      >
        {slides.map((slide, index) => {
          const { image, header, shortDescription, links } = slide
          // Get the first link if available
          const linkData = links && links[0]?.link

          return (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[50vh] md:h-[70vh]">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <MediaBlock resource={image as Media} imgClassName={styles.slideImage} fill />
                  {/* Overlay for better text visibility */}
                  <div className={styles.slideOverlay}></div>
                </div>

                {/* Content */}
                <div
                  className={`container relative flex flex-col justify-center ${alignmentClass} h-full text-white`}
                >
                  <div className={styles.slideContent}>
                    {header && <h2 className="text-xl md:text-5xl font-bold mb-4">{header}</h2>}
                    {shortDescription && (
                      <p className="text-sm md:text-xl mb-6 max-w-2xl mx-auto">
                        {shortDescription}
                      </p>
                    )}
                    {linkData && linkData.url && (
                      <Link href={linkData.url} className="inline-block">
                        <Button
                          size="lg"
                          variant={linkData.appearance === 'outline' ? 'outline' : 'default'}
                        >
                          {linkData.label}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}

        {showNavigation && (
          <>
            <div className="swiper-button-prev flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 text-white rounded-full cursor-pointer transition-all duration-300 shadow-md">
              <ChevronLeft className="text-white w-5 h-5" />
            </div>
            <div className="swiper-button-next flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 text-white rounded-full cursor-pointer transition-all duration-300 shadow-md">
              <ChevronRight className="text-white w-5 h-5" />
            </div>
          </>
        )}
      </Swiper>
    </div>
  )
}
