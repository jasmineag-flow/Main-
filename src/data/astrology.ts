import type { ZodiacSign, Planet } from '../types'

export const ZODIAC_DATA: Record<ZodiacSign, {
  element: 'Fire' | 'Earth' | 'Air' | 'Water'
  modality: 'Cardinal' | 'Fixed' | 'Mutable'
  ruler: string
  keywords: string[]
  description: string
  shadow: string
  dates: string
}> = {
  Aries: {
    element: 'Fire', modality: 'Cardinal', ruler: 'Mars',
    keywords: ['pioneering', 'courage', 'initiative', 'directness', 'independence'],
    description: 'The trailblazer — you lead with action, courage, and the pure desire to begin. Your fire ignites new cycles.',
    shadow: 'Impulsivity, self-centeredness, inability to follow through',
    dates: 'Mar 21 – Apr 19',
  },
  Taurus: {
    element: 'Earth', modality: 'Fixed', ruler: 'Venus',
    keywords: ['stability', 'sensuality', 'persistence', 'beauty', 'values'],
    description: 'The builder — you ground energy into form, value pleasure and beauty, and create with patient consistency.',
    shadow: 'Stubbornness, materialism, resistance to change',
    dates: 'Apr 20 – May 20',
  },
  Gemini: {
    element: 'Air', modality: 'Mutable', ruler: 'Mercury',
    keywords: ['curiosity', 'adaptability', 'communication', 'duality', 'learning'],
    description: 'The connector — your mind is a lightning rod for ideas, synthesis, and connection across disparate worlds.',
    shadow: 'Scattered focus, superficiality, inconsistency',
    dates: 'May 21 – Jun 20',
  },
  Cancer: {
    element: 'Water', modality: 'Cardinal', ruler: 'Moon',
    keywords: ['nurturing', 'intuition', 'home', 'emotional depth', 'memory'],
    description: 'The nurturer — you feel deeply, protect fiercely, and create sanctuary wherever you are.',
    shadow: 'Moodiness, over-attachment, emotional manipulation',
    dates: 'Jun 21 – Jul 22',
  },
  Leo: {
    element: 'Fire', modality: 'Fixed', ruler: 'Sun',
    keywords: ['creativity', 'leadership', 'generosity', 'self-expression', 'play'],
    description: 'The sovereign — you radiate warmth, lead from the heart, and invite everyone into your radiant presence.',
    shadow: 'Ego, need for validation, drama, pride',
    dates: 'Jul 23 – Aug 22',
  },
  Virgo: {
    element: 'Earth', modality: 'Mutable', ruler: 'Mercury',
    keywords: ['discernment', 'service', 'precision', 'analysis', 'improvement'],
    description: 'The craftsperson — you see what\'s imperfect and know how to make it better. Your gift is refinement and sacred service.',
    shadow: 'Self-criticism, worry, perfectionism, over-analysis',
    dates: 'Aug 23 – Sep 22',
  },
  Libra: {
    element: 'Air', modality: 'Cardinal', ruler: 'Venus',
    keywords: ['harmony', 'justice', 'beauty', 'partnership', 'balance'],
    description: 'The diplomat — you weigh all sides, seek beauty and fairness, and build bridges between opposites.',
    shadow: 'Indecision, people-pleasing, co-dependency, avoidance of conflict',
    dates: 'Sep 23 – Oct 22',
  },
  Scorpio: {
    element: 'Water', modality: 'Fixed', ruler: 'Pluto/Mars',
    keywords: ['transformation', 'depth', 'power', 'intensity', 'regeneration'],
    description: 'The transformer — you move through the underworld and emerge changed. Your gift is seeing what others hide.',
    shadow: 'Control, obsession, jealousy, resentment, manipulation',
    dates: 'Oct 23 – Nov 21',
  },
  Sagittarius: {
    element: 'Fire', modality: 'Mutable', ruler: 'Jupiter',
    keywords: ['philosophy', 'freedom', 'adventure', 'truth', 'expansion'],
    description: 'The philosopher-explorer — your arrow aims at truth and meaning, seeking the biggest possible horizon.',
    shadow: 'Restlessness, dogmatism, overextension, tactlessness',
    dates: 'Nov 22 – Dec 21',
  },
  Capricorn: {
    element: 'Earth', modality: 'Cardinal', ruler: 'Saturn',
    keywords: ['discipline', 'ambition', 'mastery', 'legacy', 'structure'],
    description: 'The mountain climber — you build lasting structures, earn your place through work, and lead by example.',
    shadow: 'Rigidity, workaholism, coldness, fear of failure',
    dates: 'Dec 22 – Jan 19',
  },
  Aquarius: {
    element: 'Air', modality: 'Fixed', ruler: 'Uranus/Saturn',
    keywords: ['innovation', 'humanity', 'rebellion', 'community', 'originality'],
    description: 'The visionary — you see the future and work to build it. You serve humanity by breaking what no longer works.',
    shadow: 'Detachment, eccentricity, rebel-without-cause, emotional coolness',
    dates: 'Jan 20 – Feb 18',
  },
  Pisces: {
    element: 'Water', modality: 'Mutable', ruler: 'Neptune/Jupiter',
    keywords: ['intuition', 'compassion', 'mysticism', 'dissolution', 'transcendence'],
    description: 'The mystic — you dissolve boundaries and feel everything. Your gift is boundless compassion and spiritual perception.',
    shadow: 'Escapism, martyrdom, confusion, lack of boundaries',
    dates: 'Feb 19 – Mar 20',
  },
}

export const PLANET_MEANINGS: Record<Planet, { role: string; themes: string[] }> = {
  Sun: { role: 'Core identity and life force', themes: ['ego', 'vitality', 'purpose', 'consciousness'] },
  Moon: { role: 'Emotional nature and instinctual self', themes: ['emotions', 'instincts', 'needs', 'mother', 'past'] },
  Mercury: { role: 'Mind and communication', themes: ['thinking', 'speaking', 'learning', 'connections'] },
  Venus: { role: 'Love, beauty, and values', themes: ['relationships', 'aesthetics', 'pleasure', 'money', 'self-worth'] },
  Mars: { role: 'Drive, desire, and action', themes: ['ambition', 'sexuality', 'anger', 'courage', 'assertion'] },
  Jupiter: { role: 'Growth and expansion', themes: ['abundance', 'philosophy', 'luck', 'wisdom', 'excess'] },
  Saturn: { role: 'Structure, discipline, and karma', themes: ['limits', 'responsibility', 'time', 'mastery', 'lessons'] },
  Uranus: { role: 'Revolution and awakening', themes: ['change', 'innovation', 'rebellion', 'freedom', 'electricity'] },
  Neptune: { role: 'Dreams and transcendence', themes: ['illusion', 'spirituality', 'compassion', 'dissolution', 'mysticism'] },
  Pluto: { role: 'Transformation and power', themes: ['death/rebirth', 'power', 'shadow', 'regeneration', 'depth'] },
  'North Node': { role: 'Soul\'s evolutionary direction', themes: ['destiny', 'growth edge', 'future self', 'soul purpose'] },
  Chiron: { role: 'Wounded healer', themes: ['core wound', 'healing gift', 'where you teach what you needed to learn'] },
  Ascendant: { role: 'The mask and how you meet the world', themes: ['first impressions', 'body', 'approach', 'dawn energy'] },
  Midheaven: { role: 'Public role and career', themes: ['vocation', 'reputation', 'public self', 'highest achievement'] },
}

export const BIRTH_DATE_TO_SIGN = (dateStr: string): ZodiacSign | null => {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return null
  const month = date.getMonth() + 1
  const day = date.getDate()
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius'
  return 'Pisces'
}
