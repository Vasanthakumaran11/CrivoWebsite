import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_type == "bookMeetPage"][0]{
  leftSideContent
}`

export function useBookMeetPage() {
  return useSanityQuery(QUERY)
}
