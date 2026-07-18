import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_id == "about-page"][0]{
  hero,
  statsSection,
  missionVision,
  leadersSection,
  coreTeamSection,
  cta
}`

export function useAboutPage() {
  return useSanityQuery(QUERY)
}
