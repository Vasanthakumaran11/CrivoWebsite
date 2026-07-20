// One-time migration for the leader/coreTeamMember visibility toggle.
//
// 1. If no 'leader' or 'coreTeamMember' documents exist yet, migrates the
//    legacy leaders/team members that are still embedded inside the
//    aboutPage document (leadersSection.leaders / coreTeamSection.members)
//    into standalone documents, each with isVisible: true.
// 2. Backfills isVisible: true on any leader/coreTeamMember document that
//    predates the field, so nothing silently disappears once the frontend
//    queries start filtering on isVisible == true.
//
// Run from the repo root with:
//   npx sanity exec scripts/migrate-team-visibility.js --with-user-token
//
// --with-user-token uses your local `sanity login` session, so no write
// token needs to live in .env for this.

import { getCliClient } from 'sanity/cli'

const client = getCliClient()

function slugify(str = '') {
  return (
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'unnamed'
  )
}

async function backfillIsVisible(type) {
  const missing = await client.fetch(`*[_type == $type && !defined(isVisible)]{_id}`, { type })
  if (!missing.length) {
    console.log(`[${type}] nothing to backfill`)
    return
  }
  const tx = client.transaction()
  missing.forEach(({ _id }) => tx.patch(_id, { set: { isVisible: true } }))
  await tx.commit()
  console.log(`[${type}] set isVisible: true on ${missing.length} document(s)`)
}

async function migrateEmbeddedTeam() {
  const [existingLeaders, existingCoreTeam] = await Promise.all([
    client.fetch(`count(*[_type == "leader"])`),
    client.fetch(`count(*[_type == "coreTeamMember"])`),
  ])

  if (existingLeaders > 0 || existingCoreTeam > 0) {
    console.log('leader/coreTeamMember documents already exist, skipping embedded-data migration')
    return
  }

  const aboutPage = await client.fetch(
    `*[_id == "about-page"][0]{ "leaders": leadersSection.leaders, "members": coreTeamSection.members }`
  )
  if (!aboutPage || (!aboutPage.leaders?.length && !aboutPage.members?.length)) {
    console.log('no embedded leaders/team members found on aboutPage, nothing to migrate')
    return
  }

  const tx = client.transaction()

  ;(aboutPage.leaders || []).forEach((l, i) => {
    tx.createIfNotExists({
      _id: `leader-${slugify(l.name)}`,
      _type: 'leader',
      name: l.name,
      role: l.role,
      email: l.email,
      linkedin: l.linkedin,
      image: l.image,
      order: i,
      isVisible: true,
    })
  })

  ;(aboutPage.members || []).forEach((m, i) => {
    tx.createIfNotExists({
      _id: `core-team-${slugify(m.name)}`,
      _type: 'coreTeamMember',
      name: m.name,
      role: m.role,
      email: m.email,
      linkedin: m.linkedin,
      github: m.github,
      initial: m.initial,
      image: m.image,
      order: i,
      isVisible: true,
    })
  })

  await tx.commit()
  console.log(
    `migrated ${aboutPage.leaders?.length || 0} leader(s) and ${aboutPage.members?.length || 0} core team member(s) into standalone documents`
  )
}

async function run() {
  await migrateEmbeddedTeam()
  await backfillIsVisible('leader')
  await backfillIsVisible('coreTeamMember')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
