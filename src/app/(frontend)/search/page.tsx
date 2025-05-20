import PageHeader from '@/components/PageHeader'
import SearchList from '@/components/Search/List'
import { Suspense } from 'react'

export const revalidate = 60 // Revalidate every minute
// export const dynamic = 'force-dynamic'

const SearchResultPage = async () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center mt-8">
          <p className="text-muted-foreground">Loading details...</p>
        </div>
      }
    >
      <div className="mt-16">
        <SearchList />
      </div>
    </Suspense>
  )
}

export default SearchResultPage
