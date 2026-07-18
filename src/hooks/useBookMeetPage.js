import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_id == "book-meet-page"][0]{
  leftSideContent
}`

export function useBookMeetPage() {
  return useSanityQuery(QUERY)
}
