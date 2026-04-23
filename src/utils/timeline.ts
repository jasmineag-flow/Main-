import type { TimelineEvent, UserProfile } from '../types'

export const getAstrologicalEvents = (birthYear: number): TimelineEvent[] => {
  const events: TimelineEvent[] = [
    { id: 'saturn-1', age: 29, year: birthYear + 29, title: 'Saturn Return I', description: 'The great reckoning — Saturn returns to its natal position for the first time. Structures that aren\'t authentic fall away. The beginning of true adulthood.', system: 'natal', kind: 'return' },
    { id: 'saturn-2', age: 59, year: birthYear + 59, title: 'Saturn Return II', description: 'The second Saturn return invites deep wisdom, legacy-building, and a reckoning with how you\'ve used your life\'s energy.', system: 'natal', kind: 'return' },
    { id: 'saturn-3', age: 88, year: birthYear + 88, title: 'Saturn Return III', description: 'The elder\'s return — a rare threshold of embodied wisdom and soul completion.', system: 'natal', kind: 'return' },
    { id: 'jupiter-1', age: 12, year: birthYear + 12, title: 'Jupiter Return I', description: 'First Jupiter return — a year of growth, expansion, and new possibility. The world opens up.', system: 'natal', kind: 'return' },
    { id: 'jupiter-2', age: 24, year: birthYear + 24, title: 'Jupiter Return II', description: 'Second Jupiter return — identity expands again. New opportunities in purpose and philosophy emerge.', system: 'natal', kind: 'return' },
    { id: 'jupiter-3', age: 36, year: birthYear + 36, title: 'Jupiter Return III', description: 'Third Jupiter return — midpoint of full adulthood. Abundance and wisdom open new doors.', system: 'natal', kind: 'return' },
    { id: 'jupiter-4', age: 48, year: birthYear + 48, title: 'Jupiter Return IV', description: 'Fourth Jupiter return — harvest time. What you\'ve built begins to yield its full fruit.', system: 'natal', kind: 'return' },
    { id: 'jupiter-5', age: 60, year: birthYear + 60, title: 'Jupiter Return V', description: 'Fifth Jupiter return — elder wisdom. A new chapter of teaching, giving, and receiving abundance.', system: 'natal', kind: 'return' },
    { id: 'chiron-half', age: 25, year: birthYear + 25, title: 'Chiron Half-Return', description: 'Chiron squares its natal position — the first major encounter with your core wound. What needs healing surfaces.', system: 'natal', kind: 'half' },
    { id: 'chiron-return', age: 50, year: birthYear + 50, title: 'Chiron Return', description: 'The wounded healer completes its cycle. A profound passage of healing and transformation of your deepest wound into your greatest gift.', system: 'natal', kind: 'return' },
    { id: 'uranus-opp', age: 42, year: birthYear + 42, title: 'Uranus Opposition', description: 'Uranus opposes its natal position — the midlife awakening. The soul demands authenticity, freedom, and a truer version of your life.', system: 'natal', kind: 'opposition' },
    { id: 'uranus-return', age: 84, year: birthYear + 84, title: 'Uranus Return', description: 'Uranus returns to its birth position — a complete revolution of awakening. Liberation and radical authenticity.', system: 'natal', kind: 'return' },
    { id: 'nodal-return-1', age: 19, year: birthYear + 19, title: 'Nodal Return I', description: 'The north and south nodes return to their natal positions. A resetting of your soul\'s evolutionary direction.', system: 'natal', kind: 'return' },
    { id: 'nodal-return-2', age: 37, year: birthYear + 37, title: 'Nodal Return II', description: 'Second nodal return — a second invitation to align with your soul\'s path.', system: 'natal', kind: 'return' },
    { id: 'nodal-return-3', age: 56, year: birthYear + 56, title: 'Nodal Return III', description: 'Third nodal return — deep soul wisdom and realignment with life purpose.', system: 'natal', kind: 'return' },
    { id: 'saturn-square-1', age: 7, year: birthYear + 7, title: 'Saturn Square I', description: 'First Saturn square — early lessons in discipline, responsibility, and the nature of limits.', system: 'natal', kind: 'square' },
    { id: 'saturn-opp', age: 44, year: birthYear + 44, title: 'Saturn Opposition', description: 'Saturn opposes its natal position — an external reckoning with the structures and commitments you\'ve built.', system: 'natal', kind: 'opposition' },
    { id: 'neptune-sq', age: 41, year: birthYear + 41, title: 'Neptune Square', description: 'Neptune squares its natal position — a dissolution of illusions and a deeper call to spiritual reality.', system: 'natal', kind: 'square' },
  ]
  return events
}

export const getHumanDesignEvents = (birthYear: number): TimelineEvent[] => {
  return [
    { id: 'hd-kiron-7', age: 7, year: birthYear + 7, title: 'HD: End of Imprinting I', description: 'The first imprinting phase completes at age 7. The conditioning from your environment begins to solidify. Who are you outside of what was projected onto you?', system: 'hd', kind: 'milestone' },
    { id: 'hd-kiron-14', age: 14, year: birthYear + 14, title: 'HD: End of Imprinting II', description: 'Second imprinting phase — puberty and the second conditioning field. Your design is being tested by the world.', system: 'hd', kind: 'milestone' },
    { id: 'hd-kiron-21', age: 21, year: birthYear + 21, title: 'HD: End of Imprinting III', description: 'Third imprinting cycle completes. Your design is fully layered with conditioning. The journey back to yourself begins.', system: 'hd', kind: 'milestone' },
    { id: 'hd-kiron-half', age: 26, year: birthYear + 26, title: 'Kiron Half-Return (HD)', description: 'In Human Design, this marks a pivotal shift in your relationship to your own design. Awareness of your conditioning deepens.', system: 'hd', kind: 'half' },
    { id: 'hd-saturn-1', age: 29, year: birthYear + 29, title: 'HD: Saturn Cycle', description: 'Aligning with your natal Saturn return, this marks a key restructuring in how you embody your Human Design type and strategy.', system: 'hd', kind: 'milestone' },
    { id: 'hd-kiron-return', age: 50, year: birthYear + 50, title: 'Kiron Return (HD)', description: 'The Kiron Return in Human Design marks the completion of the conditioning cycle. You return to your truest self. For 3/6 profiles, this is the beginning of the third line\'s role model phase.', system: 'hd', kind: 'return' },
    { id: 'hd-uranus-opp', age: 42, year: birthYear + 42, title: 'HD: Uranus Opposition', description: 'The Uranus opposition in your Human Design signals a radical restructuring. The not-self patterns you\'ve been running become impossible to ignore.', system: 'hd', kind: 'opposition' },
  ]
}

export const getEnneagramEvents = (birthYear: number): TimelineEvent[] => {
  return [
    { id: 'ennea-7', age: 7, year: birthYear + 7, title: 'Core Type Solidifies', description: 'By around age 7, the core Enneagram fixation has typically solidified as a survival strategy. The essence begins to be covered by ego structure.', system: 'ennea', kind: 'milestone' },
    { id: 'ennea-growth-1', age: 22, year: birthYear + 22, title: 'First Integration Wave', description: 'Early adulthood often marks the first conscious encounter with your type\'s patterns. The invitation to grow begins.', system: 'ennea', kind: 'cycle' },
    { id: 'ennea-crisis', age: 35, year: birthYear + 35, title: 'Mid-Cycle Integration Invitation', description: 'Mid-thirties often bring a crisis that serves as an invitation to move toward your integration point and shed old survival strategies.', system: 'ennea', kind: 'cycle' },
    { id: 'ennea-midlife', age: 45, year: birthYear + 45, title: 'Deep Transformation Window', description: 'Midlife often accelerates Enneagram work. The cost of staying in the fixation becomes clear. Integration deepens.', system: 'ennea', kind: 'cycle' },
    { id: 'ennea-elder', age: 60, year: birthYear + 60, title: 'Essence Reclamation', description: 'At its best, the elder years bring a return to the true essence beneath the type. Spaciousness, compassion, and groundedness deepen.', system: 'ennea', kind: 'milestone' },
  ]
}

export const getCombinedEvents = (birthYear: number): TimelineEvent[] => {
  return [
    { id: 'combo-29', age: 29, year: birthYear + 29, title: 'The Great Threshold', description: 'Saturn Return + HD Saturn Cycle + first major Enneagram crisis converge here. An initiation into authentic selfhood across all systems.', system: 'combined', kind: 'milestone' },
    { id: 'combo-42', age: 42, year: birthYear + 42, title: 'The Midlife Crucible', description: 'Uranus Opposition + Neptune Square + HD Uranus Opposition all occur within 1-3 years of each other. A profound invitation to live your truest life.', system: 'combined', kind: 'milestone' },
    { id: 'combo-50', age: 50, year: birthYear + 50, title: 'The Return to Self', description: 'Chiron Return + Kiron Return (HD) mark a profound healing and return to essence. Who you were before the conditioning becomes visible again.', system: 'combined', kind: 'milestone' },
  ]
}

export const buildTimeline = (profile: UserProfile): TimelineEvent[] => {
  const birthYear = new Date(profile.birthDate).getFullYear()
  const allEvents: TimelineEvent[] = []
  if (profile.natalChart) allEvents.push(...getAstrologicalEvents(birthYear))
  if (profile.humanDesign) allEvents.push(...getHumanDesignEvents(birthYear))
  if (profile.enneagram) allEvents.push(...getEnneagramEvents(birthYear))
  if (profile.natalChart && profile.humanDesign) allEvents.push(...getCombinedEvents(birthYear))
  return allEvents.sort((a, b) => a.age - b.age)
}

export const getCurrentAge = (birthDate: string): number => {
  const birth = new Date(birthDate)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const m = now.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--
  return age
}
