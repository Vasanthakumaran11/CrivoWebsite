import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_type == "productPlanner"][0]{
  hero,
  intro,
  simulator,
  wallet,
  capabilities,
  aiEngine,
  specifications,
  cta
}`

export function useProductPlanner() {
  return useSanityQuery(QUERY)
}
