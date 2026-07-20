import { useSanityQuery } from './useSanityQuery'

// order asc keeps Bharanidharan/Gokulnath/Hareeni pinned to the front;
// _createdAt asc as the tiebreaker means any new leader (all defaulting to
// the same order value) appends in the order they were actually added,
// not alphabetically.
const QUERY = `*[_type == "leader" && isVisible == true] | order(order asc, _createdAt asc){
  name,
  role,
  email,
  linkedin,
  image
}`

export function useLeaders() {
  return useSanityQuery(QUERY)
}
