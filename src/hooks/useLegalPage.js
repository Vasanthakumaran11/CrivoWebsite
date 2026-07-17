import { useSanityQuery } from './useSanityQuery'

const QUERY_BY_TYPE = {
  privacyPolicy: `*[_type == "privacyPolicy"][0]{ hero, intro, sections }`,
  termsConditions: `*[_type == "termsConditions"][0]{ hero, intro, sections }`,
  accessibilityStatement: `*[_type == "accessibilityStatement"][0]{ hero, intro, sections }`,
}

export function useLegalPage(type) {
  return useSanityQuery(QUERY_BY_TYPE[type])
}
