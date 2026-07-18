import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_id == "home-page"][0]{
  header,
  whyChooseUs,
  process,
  trustedTechnologies,
  ourClients
}`

export function useHomePage() {
  return useSanityQuery(QUERY)
}
