import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_id == "product-csms"][0]{
  hero,
  indicators,
  architecture,
  bentoFeatures,
  standards,
  specifications,
  cta
}`

export function useProductCsms() {
  return useSanityQuery(QUERY)
}
