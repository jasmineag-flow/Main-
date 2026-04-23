import type { HDType, HDAuthority, HDCenter } from '../types'

export const HD_PROFILES: Record<string, { name: string; keywords: string[] }> = {
  '1/3': { name: 'Investigator / Martyr', keywords: ['research', 'trial-and-error', 'foundation-building', 'resilience'] },
  '1/4': { name: 'Investigator / Opportunist', keywords: ['deep study', 'networking', 'stability', 'influence'] },
  '2/4': { name: 'Hermit / Opportunist', keywords: ['natural talent', 'solitude', 'opportunistic connections', 'being called out'] },
  '2/5': { name: 'Hermit / Heretic', keywords: ['natural gifts', 'practical solutions', 'projection field', 'savior archetype'] },
  '3/5': { name: 'Martyr / Heretic', keywords: ['experimentation', 'resilience', 'universal solutions', 'trial-and-error'] },
  '3/6': { name: 'Martyr / Role Model', keywords: ['learning through experience', 'three phases of life', 'wisdom', 'objectivity'] },
  '4/6': { name: 'Opportunist / Role Model', keywords: ['foundation', 'network', 'trust', 'role model over time'] },
  '4/1': { name: 'Opportunist / Investigator', keywords: ['external authority', 'friendship', 'security', 'research'] },
  '5/1': { name: 'Heretic / Investigator', keywords: ['practical solutions', 'universal love', 'projection', 'research foundation'] },
  '5/2': { name: 'Heretic / Hermit', keywords: ['field of projection', 'natural talent', 'practical wisdom', 'being called'] },
  '6/2': { name: 'Role Model / Hermit', keywords: ['three phases', 'natural gifts', 'objectivity', 'retreat-emerge cycles'] },
  '6/3': { name: 'Role Model / Martyr', keywords: ['life experience', 'resilience', 'embodied wisdom', 'three-phase journey'] },
}

export const HD_TYPE_DATA: Record<HDType, {
  strategy: string
  notSelf: string
  theme: string
  description: string
  keywords: string[]
  lifeForce: string
}> = {
  Generator: {
    strategy: 'Respond',
    notSelf: 'Frustration',
    theme: 'Satisfaction',
    description: 'You are the life force of the planet. Your sacral center is defined, giving you sustainable energy for work you love. You thrive when you respond to life rather than initiate, letting your gut guide you toward what truly lights you up.',
    keywords: ['life force', 'response', 'mastery', 'satisfaction', 'building', 'sacral power'],
    lifeForce: 'Sacral — pure life force energy, the engine of the world',
  },
  'Manifesting Generator': {
    strategy: 'Respond, then Inform',
    notSelf: 'Frustration / Anger',
    theme: 'Satisfaction / Peace',
    description: 'You are a multi-passionate powerhouse — built for speed and efficiency. You skip steps others can\'t, move fast, and pursue multiple tracks simultaneously. Respond first, then inform those around you of your direction.',
    keywords: ['multi-passionate', 'efficiency', 'speed', 'response', 'versatility', 'momentum'],
    lifeForce: 'Sacral + Throat connection — action-oriented creative force',
  },
  Manifestor: {
    strategy: 'Inform',
    notSelf: 'Anger',
    theme: 'Peace',
    description: 'You are one of the rare initiating energies — you can make things happen from nothing. Your power lies in initiating and informing others before you act, creating the peace that comes from moving without resistance.',
    keywords: ['initiation', 'independence', 'informing', 'impact', 'peace', 'sovereignty'],
    lifeForce: 'Closed and repelling aura — here to impact and initiate',
  },
  Projector: {
    strategy: 'Wait for the Invitation',
    notSelf: 'Bitterness',
    theme: 'Success',
    description: 'You are here to guide and direct the energy of others. You see people deeply and can guide them to their highest potential. Your access to success comes through recognition and invitation — when you\'re truly seen for your gifts.',
    keywords: ['guidance', 'recognition', 'invitation', 'efficiency', 'mastery of others', 'systems'],
    lifeForce: 'Focused and penetrating aura — here to guide and be recognized',
  },
  Reflector: {
    strategy: 'Wait a Lunar Cycle',
    notSelf: 'Disappointment',
    theme: 'Surprise',
    description: 'You are the rarest type — a mirror of the community around you. With all centers undefined, you sample and reflect the energies around you. Your wisdom comes from your ability to see the health of your environment clearly.',
    keywords: ['reflection', 'community health', 'lunar wisdom', 'sampling', 'surprise', 'openness'],
    lifeForce: 'Teflon and sampling aura — here to reflect and illuminate',
  },
}

export const HD_AUTHORITY_DATA: Record<HDAuthority, {
  description: string
  howToDecide: string
}> = {
  Sacral: {
    description: 'Your gut response is your truth. Yes/no sounds and bodily responses guide you.',
    howToDecide: 'Listen for the gut "uh-huh" (yes) or "uhn-uhn" (no) response in real time.',
  },
  'Solar Plexus': {
    description: 'You are built for emotional clarity. Your truth emerges over time, through waves.',
    howToDecide: 'Never decide in the moment. Sleep on it, feel multiple waves of emotion, then decide.',
  },
  Splenic: {
    description: 'You have in-the-moment intuitive knowing. It speaks once, quietly.',
    howToDecide: 'Trust that quiet first hit — it won\'t repeat itself. Act on it in the moment.',
  },
  'Ego/Heart': {
    description: 'Your willpower and what you truly want guides your decisions.',
    howToDecide: 'Ask "Do I really want this?" and "What\'s in it for me?" Your heart knows.',
  },
  'G/Self': {
    description: 'Your sense of direction and identity guides you. The right people and places speak to you.',
    howToDecide: 'Talk through decisions with trusted people. The words that come out reveal your truth.',
  },
  'Mental/Environmental': {
    description: 'You need to be in the right environment and talk with trusted people to find clarity.',
    howToDecide: 'Move between environments and talk. Notice where you feel clarity — that\'s your answer.',
  },
  Lunar: {
    description: 'You need a full lunar cycle (28 days) to make major decisions.',
    howToDecide: 'Track how you feel about a decision across 28 days, through all lunar phases.',
  },
}

export const HD_CENTERS: HDCenter[] = [
  'Head', 'Ajna', 'Throat', 'G/Self', 'Heart/Ego',
  'Solar Plexus', 'Sacral', 'Spleen', 'Root',
]

export const HD_CENTER_MEANINGS: Record<HDCenter, { defined: string; undefined: string }> = {
  Head: {
    defined: 'Fixed source of mental pressure and inspiration. You have consistent questions driving you.',
    undefined: 'Open to others\' ideas and questions. Not here to answer every question that comes in.',
  },
  Ajna: {
    defined: 'Fixed way of processing and conceptualizing. Consistent mental perspective.',
    undefined: 'Mental flexibility — can see from many angles. Not meant to be certain about what you think.',
  },
  Throat: {
    defined: 'Fixed way of expressing yourself. Consistent voice and manifestation capacity.',
    undefined: 'Adaptive communicator — speaks differently in different contexts. Variable expression.',
  },
  'G/Self': {
    defined: 'Fixed sense of direction and identity. Consistent sense of self and love.',
    undefined: 'Identity shaped by environment and who you\'re with. Chameleon-like self.',
  },
  'Heart/Ego': {
    defined: 'Consistent willpower and access to the material world. Can make and keep promises.',
    undefined: 'Willpower not consistent — not here to prove yourself. Rest is productive.',
  },
  'Solar Plexus': {
    defined: 'Emotional authority. Defined feeling nature — rides emotional waves.',
    undefined: 'Absorbs and amplifies others\' emotions. Highly empathic — feelings may not be yours.',
  },
  Sacral: {
    defined: 'Life force energy center — sustainable work energy. Generator/MG types.',
    undefined: 'No consistent access to sacral energy. Must honor when energy runs out.',
  },
  Spleen: {
    defined: 'Consistent intuition, immune system, and in-the-moment awareness.',
    undefined: 'Amplifies others\' fears and instincts. More sensitive to health and timing.',
  },
  Root: {
    defined: 'Fixed source of adrenaline and drive. Consistent pressure toward completion.',
    undefined: 'Amplifies pressure from others. Not here to work under constant pressure.',
  },
}

export const INCARNATION_CROSSES = [
  'Right Angle Cross of the Sphinx', 'Right Angle Cross of the Four Ways',
  'Right Angle Cross of Planning', 'Right Angle Cross of the Vessel of Love',
  'Right Angle Cross of the Unexpected', 'Right Angle Cross of Consciousness',
  'Right Angle Cross of Eden', 'Right Angle Cross of the Maya',
  'Juxtaposition Cross of the Sphinx', 'Juxtaposition Cross of Limitation',
  'Juxtaposition Cross of Shock', 'Juxtaposition Cross of the Mind',
  'Left Angle Cross of Refinement', 'Left Angle Cross of the Clarion',
  'Left Angle Cross of Confrontation', 'Left Angle Cross of Identification',
  'Left Angle Cross of the Dormant Phoenix', 'Left Angle Cross of Revolution',
]
