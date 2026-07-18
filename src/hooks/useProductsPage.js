import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_id == "products-page"][0]{
  hero,
  productsList[]{
    ...,
    image
  },
  cta
}`

export function useProductsPage() {
  return useSanityQuery(QUERY)
}
