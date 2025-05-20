'use client'

import { useEffect, useRef, useState } from 'react'
import { fetchSearchResults } from '../action'
import { PaginatedDocs } from 'payload'
import { Search } from 'lucide-react'
import { SearchResultCard } from '../SearchResultCard'

interface SearchListProps {
  initialData?: PaginatedDocs<any>
}

export default function SearchList({ initialData }: SearchListProps) {
  // Start with empty results instead of initial data
  const [results, setResults] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const loaderRef = useRef(null)

  // Handle search input with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])
  // Reset results when search query changes
  useEffect(() => {
    // Only fetch results if there's a search query
    if (debouncedQuery.trim() === '') {
      setResults([])
      setHasNextPage(false)
      return
    }

    const fetchInitialResults = async () => {
      setLoading(true)
      const data = await fetchSearchResults(1, 3, debouncedQuery)
      setResults(data.docs)
      setHasNextPage(data.hasNextPage)
      setPage(2)
      setLoading(false)
    }

    fetchInitialResults()
  }, [debouncedQuery])

  const fetchMore = async () => {
    if (loading || !hasNextPage) return
    setLoading(true)

    const data = await fetchSearchResults(page, 3, debouncedQuery)

    setResults((prev) => [...prev, ...data.docs])
    setHasNextPage(data.hasNextPage)
    setPage((prev) => prev + 1)
    setLoading(false)
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
        className={`relative  bg-muted h-[130px] md:h-[300px] mt-16 flex flex-col justify-center text-center overflow-hidden`}
      >
        <div className={`md:max-w-[40%] mx-auto`}>
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="pl-12 pr-4 py-3 w-full text-lg rounded-lg border-2 border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-200"
            />
          </div>
          <div className="text-center mt-3 text-sm text-muted-foreground">
            Find projects and solutions by typing keywords in the search box.
          </div>
        </div>
      </div>
      <div className="container py-10">
        {debouncedQuery.trim() === '' ? (
          <div className="flex justify-center my-20">
            <p className="text-muted-foreground">Enter search terms to see results</p>
          </div>
        ) : loading && results.length === 0 ? (
          <div className="flex justify-center my-20">
            <p className="text-muted-foreground">Searching...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex justify-center my-20">
            <p className="text-muted-foreground">No results found. Try a different search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((result) => (
              <SearchResultCard key={result.id} result={result} />
            ))}
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
