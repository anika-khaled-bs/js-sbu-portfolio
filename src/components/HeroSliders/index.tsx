'use client'

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { HeroSlider as HeroSliderType } from '@/payload-types'

// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/effect-fade'

interface HeroSliderProps {
  sliders: HeroSliderType[]
  className?: string
}

const HeroSlider: React.FC<HeroSliderProps> = ({ sliders, className }) => {
  const [activeSliders, setActiveSliders] = useState<HeroSliderType[]>([])

  useEffect(() => {
    // Filter active sliders and sort by sortOrder
    const filteredSliders = sliders
      .filter((slider) => slider.active)
      .sort((a, b) => {
        // Handle null/undefined sortOrder values by providing default values
        const orderA = a.sortOrder ?? 0 // Use nullish coalescing operator
        const orderB = b.sortOrder ?? 0
        return orderA - orderB
      })

    setActiveSliders(filteredSliders)
  }, [sliders])

  // Exit early if no active sliders
  if (activeSliders.length === 0) {
    return null
  }

  return (
    <div className={cn('relative w-full', className)}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        effect="fade"
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          bulletClass:
            'w-2.5 h-2.5 inline-block mx-1.5 rounded-full bg-white/40 cursor-pointer transition-all duration-300',
          bulletActiveClass: '!bg-white scale-125',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-[600px] md:h-[700px] lg:h-[800px]"
      >
        {activeSliders.map((slider) => (
          <SwiperSlide key={slider.id}>
            <div
              className="relative w-full h-full flex items-center justify-start px-6 md:px-16 lg:px-24 bg-cover bg-center before:absolute before:inset-0 before:bg-black/40 before:z-0"
              style={{ backgroundImage: `url(${slider.backgroundImage.url})` }}
            >
              <div className="container relative z-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 animate-fade-in">
                  {slider.title}
                </h1>

                {slider.subtitle && (
                  <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 animate-slide-up">
                    {slider.subtitle}
                  </p>
                )}

                {slider.buttonText && slider.buttonUrl && (
                  <Button
                    asChild
                    size="lg"
                    className="text-base md:text-lg px-6 py-3 md:px-8 md:py-4 bg-white text-black hover:bg-white/90 hover:text-black/90 transition-all duration-300 rounded-md"
                  >
                    <a href={slider.buttonUrl}>{slider.buttonText}</a>
                  </Button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev absolute left-5 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full cursor-pointer transition-all duration-300">
          <ChevronLeft className="text-white" size={24} />
        </div>
        <div className="swiper-button-next absolute right-5 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full cursor-pointer transition-all duration-300">
          <ChevronRight className="text-white" size={24} />
        </div>

        <div className="swiper-pagination absolute bottom-8 left-0 right-0 z-20 flex justify-center"></div>
      </Swiper>
    </div>
  )
}

export default HeroSlider
