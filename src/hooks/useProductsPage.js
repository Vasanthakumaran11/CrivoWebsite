import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_type == "productsPage"][0]{
  hero,
  productsList,
  cta
}`

export function useProductsPage() {
  return useSanityQuery(QUERY)
}
