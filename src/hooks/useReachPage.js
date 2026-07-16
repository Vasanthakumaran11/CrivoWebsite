import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_type == "reachPage"][0]{
  hero,
  contactDetails,
  partnerSection,
  customerAssistance,
  directory
}`

export function useReachPage() {
  return useSanityQuery(QUERY)
}
