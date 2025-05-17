import { useState, useEffect, useCallback, useRef } from 'react'

interface PaginatedResponse<T = any> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

interface UseInfinitePaginationOptions<T = any> {
  initialData?: PaginatedResponse<T>
  fetchFunction: (page: number) => Promise<PaginatedResponse<T>>
  initialPage?: number
}

export function useInfinitePagination<T = any>({
  initialData,
  fetchFunction,
  initialPage = 1,
}: UseInfinitePaginationOptions<T>) {
  const [items, setItems] = useState<T[]>(initialData?.docs || [])
  const [currentPage, setCurrentPage] = useState<number>(initialData?.page || initialPage)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(initialData?.hasNextPage || false)
  const [error, setError] = useState<Error | null>(null)
  const [meta, setMeta] = useState<Omit<PaginatedResponse<T>, 'docs'>>({
    totalDocs: initialData?.totalDocs || 0,
    limit: initialData?.limit || 10,
    totalPages: initialData?.totalPages || 0,
    page: initialData?.page || initialPage,
    pagingCounter: initialData?.pagingCounter || 0,
    hasPrevPage: initialData?.hasPrevPage || false,
    hasNextPage: initialData?.hasNextPage || false,
    prevPage: initialData?.prevPage || null,
    nextPage: initialData?.nextPage || null,
  })

  // Reference to track if component is mounted
  const isMounted = useRef(true)

  // Clean up on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) {
      return
    }

    try {
      setIsLoading(true)
      const nextPage = currentPage + 1
      const response = await fetchFunction(nextPage)

      if (isMounted.current) {
        if (response.docs && Array.isArray(response.docs)) {
          setItems((prevItems) => [...prevItems, ...response.docs])
          setCurrentPage(nextPage)
          setHasMore(response.hasNextPage)
          setMeta({
            totalDocs: response.totalDocs,
            limit: response.limit,
            totalPages: response.totalPages,
            page: response.page,
            pagingCounter: response.pagingCounter,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
          })
        } else {
          console.error('Invalid response format:', response)
          setError(new Error('Invalid response format'))
        }
      }
    } catch (err) {
      console.error('Error loading more items:', err)
      if (isMounted.current) {
        setError(err as Error)
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false)
      }
    }
  }, [currentPage, fetchFunction, hasMore, isLoading])

  // Function to reset the pagination
  const reset = useCallback(async () => {
    if (isLoading) return

    try {
      setIsLoading(true)
      const response = await fetchFunction(initialPage)

      if (isMounted.current) {
        setItems(response.docs)
        setCurrentPage(initialPage)
        setHasMore(response.hasNextPage)
        setError(null)
        setMeta({
          totalDocs: response.totalDocs,
          limit: response.limit,
          totalPages: response.totalPages,
          page: response.page,
          pagingCounter: response.pagingCounter,
          hasPrevPage: response.hasPrevPage,
          hasNextPage: response.hasNextPage,
          prevPage: response.prevPage,
          nextPage: response.nextPage,
        })
      }
    } catch (err) {
      console.error('Error resetting pagination:', err)
      if (isMounted.current) {
        setError(err as Error)
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false)
      }
    }
  }, [fetchFunction, initialPage, isLoading])

  return {
    items,
    isLoading,
    hasMore,
    error,
    loadMore,
    reset,
    meta,
    currentPage,
  }
}

export default useInfinitePagination
