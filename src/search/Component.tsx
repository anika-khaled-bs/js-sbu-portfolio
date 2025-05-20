'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search as SearchIcon } from 'lucide-react'

export const Search: React.FC = () => {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [value, setValue] = useState(initialQuery)
  const router = useRouter()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    // Only push to new URL if the debounced value changes
    if (debouncedValue !== initialQuery) {
      router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
    }
  }, [debouncedValue, router, initialQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search${value ? `?q=${value}` : ''}`)
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex w-full">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <div className="relative flex w-full">
          <Input
            id="search"
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
            }}
            placeholder="Search"
            className="rounded-r-none border-r-0 focus:outline-none focus:ring-0 focus-visible:ring-0 h-12"
          />
          <Button
            type="submit"
            className="rounded-l-none focus:outline-none focus:ring-0 focus-visible:ring-0 h-12 px-5 bg-primary"
          >
            <SearchIcon className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  )
}
