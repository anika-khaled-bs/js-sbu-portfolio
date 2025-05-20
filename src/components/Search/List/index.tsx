'use client'

import { useEffect, useRef, useState } from 'react'
import { fetchSearchResults } from '../action'
import { PaginatedDocs } from 'payload'
import { SearchResultCard } from '../SearchResultCard'
import { Search } from '@/search/Component'
import { useSearchParams } from 'next/navigation'

interface SearchListProps {
  initialData?: PaginatedDocs<any>
}

export default function SearchList({ initialData }: SearchListProps) {
  const searchParams = useSearchParams()
  // Get search query from URL parameters
  const searchQuery = searchParams.get('q') || ''

  // Start with empty results instead of initial data
  const [results, setResults] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const loaderRef = useRef(null)

  // Fetch results when search query changes from URL
  useEffect(() => {
    // Reset state when search query changes
    setPage(1)
    setError(null)

    // Only fetch results if there's a search query
    if (searchQuery.trim() === '') {
      setResults([])
      setHasNextPage(false)
      setLoading(false)
      return
    }

    const fetchInitialResults = async () => {
      try {
        setLoading(true)
        const data = await fetchSearchResults(1, 3, searchQuery)
        setResults(data.docs)
        setHasNextPage(data.hasNextPage)
        setPage(2)
      } catch (err) {
        setError('Failed to fetch search results')
        setResults([])
        setHasNextPage(false)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialResults()

    // Cleanup function to handle component unmount or search query change
    return () => {
      // This ensures we don't update state after the component unmounts
      // or before the new search query's results are ready
    }
  }, [searchQuery])

  const fetchMore = async () => {
    if (loading || !hasNextPage) return

    try {
      setLoading(true)
      const data = await fetchSearchResults(page, 3, searchQuery)
      setResults((prev) => [...prev, ...data.docs])
      setHasNextPage(data.hasNextPage)
      setPage((prev) => prev + 1)
    } catch (err) {
      setError('Failed to load more results')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) fetchMore()
      },
      { threshold: 1.0 },
    )

    const el = loaderRef.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [loaderRef, hasNextPage, loading])

  return (
    <>
      <div
        className={`relative bg-muted h-[130px] md:h-[300px] mt-16 flex flex-col justify-center text-center overflow-hidden`}
      >
        <div className={`container md:max-w-[40%] mx-auto`}>
          <div className="relative max-w-lg mx-auto">
            <Search />
          </div>
          <div className="text-center mt-3 text-sm text-muted-foreground">
            Find projects and solutions by typing keywords in the search box.
          </div>
        </div>
      </div>
      <div className="container py-10">
        {searchQuery.trim() === '' ? (
          <div className="flex justify-center my-20">
            <p className="text-muted-foreground">Enter search terms to see results</p>
          </div>
        ) : loading && results.length === 0 ? (
          <div className="flex justify-center my-20">
            <p className="text-muted-foreground">Searching...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center my-20">
            <p className="text-red-500">{error}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex justify-center my-20">
            <p className="text-muted-foreground">No results found. Try a different search term.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              {results.length} result{results.length > 1 ? 's' : ''} found for "{searchQuery}"
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((result) => (
                <SearchResultCard key={result.id} result={result} />
              ))}
            </div>
          </div>
        )}
        {hasNextPage && <div ref={loaderRef} className="h-10" />}
        {loading && results.length > 0 && (
          <div className="flex justify-center mt-8">
            <p className="text-muted-foreground">Loading more results...</p>
          </div>
        )}
      </div>
    </>
  )
}
