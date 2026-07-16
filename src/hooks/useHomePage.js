import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_type == "homePage"][0]{
  header,
  whyChooseUs,
  process,
  trustedTechnologies,
  ourClients
}`

export function useHomePage() {
  return useSanityQuery(QUERY)
}
