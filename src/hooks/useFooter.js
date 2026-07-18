import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_id == "site-footer"][0]{
  bannerTitle, email, phone, instagramLink, youtubeLink, xLink, linkedinLink, copyrightText, madeByText
}`

export function useFooter() {
  return useSanityQuery(QUERY)
}
