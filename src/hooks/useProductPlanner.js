import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_id == "product-ev-planner"][0]{
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
