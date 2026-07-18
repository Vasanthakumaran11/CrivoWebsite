import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_id == "apply-page"][0]{
  hero,
  formIntro,
  ctaStrip
}`

export function useApplyPage() {
  return useSanityQuery(QUERY)
}
