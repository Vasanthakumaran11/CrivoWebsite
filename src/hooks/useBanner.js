import { useState, useEffect, useCallback } from 'react'
import { client } from '../lib/sanityClient'

export function useBanner() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchBanner = useCallback(() => {
    client
      .fetch(
        `*[_type == "banner"][0] {
          title,
          subtitle,
          ctaText,
          ctaLink
        }`
      )
      .then((res) => {
        setData(res)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching banner:", err)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    // 1. Fetch on mount (refetchOnMount: true, staleTime: 0, cacheTime: 0)
    fetchBanner()

    // 2. Fetch on window focus (refetchOnWindowFocus: true)
    const handleFocus = () => {
      fetchBanner()
    }

    window.addEventListener('focus', handleFocus)
    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [fetchBanner])

  return { data, isLoading }
}