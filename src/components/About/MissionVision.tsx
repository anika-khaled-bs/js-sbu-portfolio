import { About, Media } from '@/payload-types'
import RichText from '../RichText'

interface AboutUsProps {
  aboutUs: Partial<About>
  className?: string
}

const MissionVisionComponent = ({ aboutUs }: AboutUsProps) => {
  return (
    <section className="bg-white py-16 px-4 md:px-10 container">
      <div className="mx-auto space-y-20">
        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-primary mb-2">Our Mission</h3>
            <RichText data={aboutUs?.mission!} />
          </div>
          <img
            src={(aboutUs?.missionImage as Media)?.url!}
            alt="Mission Illustration"
            className="rounded-xl shadow-md"
          />
        </div>

        {/* Vision Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
          <img
            src={(aboutUs?.visionImage as Media)?.url!}
            alt="Vision Illustration"
            className="rounded-xl shadow-md"
          />
          <div>
            <h3 className="text-primary mb-2">Our Vision</h3>
            <RichText data={aboutUs?.vision!} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MissionVisionComponent
