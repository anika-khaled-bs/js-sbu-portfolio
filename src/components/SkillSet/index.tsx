import { RequiredDataFromCollectionSlug } from 'payload'
import SkillSetHero from './SkillSetHero'
import SkillSetOverview from './SkillSetOverview'
import RichText from '../RichText'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface SkillSetProps {
  skillSet: RequiredDataFromCollectionSlug<'pages'> | null
}

const SkillSetPage = ({ skillSet }: SkillSetProps) => {
  const heroItems = skillSet?.heroItems || []

  return (
    <div className="min-h-screen pb-16">
      {heroItems.length > 0 &&
        heroItems.map((item, index) => {
          return (
            <SkillSetHero title={skillSet?.title!} subtitle={item?.subHeading!} key={item.id} />
          )
        })}

      <SkillSetOverview content={<RichText data={skillSet?.pageContent!} />} />

      <section className="container py-12 bg-slate-50">
        <div className="mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-900">Related Links</h2>

          <ul className="space-y-4">
            {heroItems.flatMap(
              (item) =>
                item?.hero?.links?.map((resource, linkIndex) => (
                  <li
                    key={`${resource.id || linkIndex}`}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Link
                      href={resource.link.url!}
                      className="flex items-center justify-between text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      <span className="font-medium">{resource.link.label}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </li>
                )) || [],
            )}
          </ul>
        </div>
      </section>

      {/* <section className="py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-900">Explore Other Skill Sets</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(skillSets)
          .filter(([key]) => key !== slug)
          .slice(0, 3)
          .map(([key, value]) => (
            <a 
              key={key} 
              href={`/skill-set/${key}`}
              className="block p-6 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200"
            >
              <h3 className="text-xl font-semibold mb-2 text-slate-900">{value.title}</h3>
              <p className="text-slate-600 line-clamp-2">{value.subtitle}</p>
            </a>
          ))}
      </div>
    </div>
  </section> */}
    </div>
  )
}

export default SkillSetPage
