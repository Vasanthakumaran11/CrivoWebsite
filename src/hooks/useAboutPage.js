import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_type == "aboutPage"][0]{
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
