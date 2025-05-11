import React from 'react'
import { Card } from '@/components/ui/card'
import { Media, Testimonial } from '@/payload-types'
import RichText from '@/components/RichText'
import { Star } from 'lucide-react'

interface ClientTestimonialProps {
  testimonialContent: Testimonial
}

const ClientTestimonial = ({ testimonialContent }: ClientTestimonialProps) => {
  const { clientName, clientCompany, clientImage, clientLogo, clientTitle, rating, testimonial } =
    testimonialContent

  // Render stars based on rating
  const renderRating = () => {
    const stars = []
    const ratingValue = parseInt(rating, 10)

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          className={`w-5 h-5 ${i < ratingValue ? 'fill-yellow-400 stroke-yellow-400' : 'fill-muted-foreground stroke-muted-foreground'}`}
        />,
      )
    }

    return stars
  }

  return (
    <div>
      <p className="text-xl font-semibold mb-6">Client Testimonial</p>

      <Card className="p-6 bg-white shadow-md rounded-xl">
        <div className="flex flex-col md:flex-row gap-6">
          {clientImage && (
            <div className="md:w-1/3">
              <img
                src={(clientImage as Media)?.url!}
                alt={(clientImage as Media)?.alt!}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <div className={`${clientImage ? 'md:w-2/3' : 'w-full'} flex flex-col`}>
            {clientLogo && (
              <div className="mb-4 h-12">
                <img
                  src={(clientLogo as Media)?.url!}
                  alt={(clientLogo as Media)?.alt!}
                  className="h-full w-auto object-contain"
                />
              </div>
            )}

            <div className="mb-4 flex">{renderRating()}</div>

            {/* Decorative quote mark */}
            <div className="flex items-center gap-2">
              <div className="text-5xl text-muted-foreground leading-none mb-2 select-none">“</div>

              {testimonial && <RichText data={testimonial} />}
            </div>

            <div className="mt-6">
              <p className="font-medium">{clientName}</p>
              <p className="text-muted-foreground">{clientCompany}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ClientTestimonial
