import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_type == "siteFooter"][0]{
  bannerTitle, email, phone, instagramLink, youtubeLink, xLink, linkedinLink
}`

export function useFooter() {
  return useSanityQuery(QUERY)
}
