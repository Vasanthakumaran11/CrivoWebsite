import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_type == "clientLogo"] | order(coalesce(order, 999) asc, name asc){
  name, logo, website
}`

export function useClientLogos() {
  return useSanityQuery(QUERY)
}
