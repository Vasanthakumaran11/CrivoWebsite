import { useSanityQuery } from './useSanityQuery'

const QUERY = `*[_type == "coreTeamMember" && isVisible == true] | order(order asc, name asc){
  name,
  role,
  email,
  linkedin,
  github,
  initial,
  image
}`

export function useCoreTeam() {
  return useSanityQuery(QUERY)
}
