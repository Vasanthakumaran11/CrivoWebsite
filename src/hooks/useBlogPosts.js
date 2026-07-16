import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_type == "blog"] | order(publishedAt desc){
  title, "slug": slug.current, readTime, category, excerpt, publishedAt
}`

export function useBlogPosts() {
  return useSanityQuery(QUERY)
}
