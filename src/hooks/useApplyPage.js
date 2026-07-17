import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_type == "applyPage"][0]{
  hero,
  formIntro,
  ctaStrip
}`

export function useApplyPage() {
  return useSanityQuery(QUERY)
}
