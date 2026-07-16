import { useState, useEffect, useCallback } from 'react'
import { client } from '../lib/sanityClient'

export function useSanityQuery(query) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = useCallback(() => {
    client
      .fetch(query)
      .then((res) => {
        setData(res)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching Sanity data:', err)
        setIsLoading(false)
      })
  }, [query])

  useEffect(() => {
    fetchData()

    const handleFocus = () => fetchData()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [fetchData])

  return { data, isLoading }
}
