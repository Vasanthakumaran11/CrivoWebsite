import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_id == "reach-page"][0]{
  hero,
  contactDetails,
  partnerSection,
  customerAssistance,
  directory
}`

export function useReachPage() {
  return useSanityQuery(QUERY)
}
