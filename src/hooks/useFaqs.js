import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_type == "faq"]{ question, answer }`

export function useFaqs() {
  return useSanityQuery(QUERY)
}
