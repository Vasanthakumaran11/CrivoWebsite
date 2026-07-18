import { useSanityQuery } from './useSanityQuery'

const QUERY_BY_TYPE = {
  privacyPolicy: `*[_id == "privacy-policy"][0]{ hero, intro, sections }`,
  termsConditions: `*[_id == "terms-conditions"][0]{ hero, intro, sections }`,
  accessibilityStatement: `*[_id == "accessibility-statement"][0]{ hero, intro, sections }`,
}

export function useLegalPage(type) {
  return useSanityQuery(QUERY_BY_TYPE[type])
}
