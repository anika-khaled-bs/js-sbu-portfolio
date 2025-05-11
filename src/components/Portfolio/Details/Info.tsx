import { Button } from '@/components/Button'
import { Portfolio, Service, TechStack, Testimonial } from '@/payload-types'
import { formatDate } from '@/utilities/formatDate'
import { Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface PortfolioDetailsProps {
  portfolio: Portfolio
}

const Info = ({ portfolio }: PortfolioDetailsProps) => {
  return (
    <div className="lg:col-span-1 order-2 lg:order-1">
      <div className="bg-muted p-6 rounded-lg sticky top-24">
        <div className="flex justify-between items-center gap-2 mb-4">
          <p className="text-xl font-semibold">Project Information</p>
          <Button size="sm">
            <Link
              href={portfolio.projectURL!}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs flex items-center"
            >
              Visit Project <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground mb-1">Client</p>
            <p className="font-medium">{(portfolio.client as Testimonial).clientCompany!}</p>
          </div>

          <div>
            <p className="text-muted-foreground mb-1">Completion Date</p>
            <div className="mt-auto mb-2 flex items-center w-full">
              <span className="mx-1">
                <Calendar size={14} />
              </span>
              {formatDate(portfolio.completionDate!, { format: 'medium' })}
            </div>
          </div>

          <div>
            <p className="text-muted-foreground mb-1">Services</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {portfolio.relatedServices
                ?.filter((service): service is Service => typeof service !== 'string')
                .map((service, index) => (
                  <span
                    key={service.id}
                    className="bg-background border text-sm px-3 py-1 rounded-full"
                  >
                    {service.title!}
                  </span>
                ))}
            </div>
          </div>

          <div>
            <p className="text-muted-foreground mb-1">Technologies</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {(portfolio.techStacks as TechStack[]).map((tech: TechStack, index) => (
                <span key={tech.id} className="bg-background border text-sm px-3 py-1 rounded-full">
                  {tech.name!}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
