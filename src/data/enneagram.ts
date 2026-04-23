import type { EnneagramType, InstinctualVariant } from '../types'

export const ENNEAGRAM_TYPES: Record<EnneagramType, {
  name: string
  essence: string
  coreDesire: string
  coreFear: string
  coreWound: string
  gift: string
  shadow: string
  growth: number
  stress: number
  keywords: string[]
  bodyCenter: 'head' | 'heart' | 'body'
}> = {
  1: {
    name: 'The Reformer',
    essence: 'Integrity & Perfection',
    coreDesire: 'To be good, to have integrity, to be balanced',
    coreFear: 'Being corrupt, evil, or defective',
    coreWound: 'The feeling that you are fundamentally flawed or imperfect',
    gift: 'Discernment, principled action, righteous improvement',
    shadow: 'Resentment, rigidity, inner critic, black-and-white thinking',
    growth: 7,
    stress: 4,
    keywords: ['integrity', 'reform', 'principles', 'improvement', 'standards', 'justice'],
    bodyCenter: 'body',
  },
  2: {
    name: 'The Helper',
    essence: 'Love & Service',
    coreDesire: 'To feel loved and needed, to express love',
    coreFear: 'Being unloved, unwanted, or dispensable',
    coreWound: 'Believing you must earn love through giving and serving',
    gift: 'Empathy, warmth, generosity, attunement to others',
    shadow: 'People-pleasing, boundary issues, hidden pride, martyrdom',
    growth: 4,
    stress: 8,
    keywords: ['love', 'service', 'empathy', 'connection', 'giving', 'relationships'],
    bodyCenter: 'heart',
  },
  3: {
    name: 'The Achiever',
    essence: 'Hope & Authenticity',
    coreDesire: 'To feel valuable and worthwhile',
    coreFear: 'Being worthless or without value apart from achievements',
    coreWound: 'Believing you are only loved for what you do, not who you are',
    gift: 'Adaptability, ambition, inspiring others, manifesting goals',
    shadow: 'Image management, deceit, workaholism, shapeshifting',
    growth: 6,
    stress: 9,
    keywords: ['achievement', 'adaptability', 'ambition', 'image', 'success', 'productivity'],
    bodyCenter: 'heart',
  },
  4: {
    name: 'The Individualist',
    essence: 'Originality & Depth',
    coreDesire: 'To find themselves, to be authentic and significant',
    coreFear: 'Having no identity, being ordinary or defective',
    coreWound: 'Feeling fundamentally flawed and unlike others — abandoned',
    gift: 'Depth, creativity, emotional honesty, beauty, authenticity',
    shadow: 'Envy, self-absorption, melancholy, longing over living',
    growth: 1,
    stress: 2,
    keywords: ['authenticity', 'depth', 'creativity', 'uniqueness', 'emotion', 'beauty'],
    bodyCenter: 'heart',
  },
  5: {
    name: 'The Investigator',
    essence: 'Wisdom & Omniscience',
    coreDesire: 'To be competent and capable, to understand the world',
    coreFear: 'Being overwhelmed, helpless, or incapable',
    coreWound: 'Feeling that existence costs too much — learning to minimize needs',
    gift: 'Perception, insight, innovation, focused expertise, objectivity',
    shadow: 'Detachment, withholding, hoarding resources, isolation',
    growth: 8,
    stress: 7,
    keywords: ['knowledge', 'competence', 'insight', 'privacy', 'systems', 'observation'],
    bodyCenter: 'head',
  },
  6: {
    name: 'The Loyalist',
    essence: 'Courage & Faith',
    coreDesire: 'To feel supported and secure, to have certainty',
    coreFear: 'Being without guidance, support, or security',
    coreWound: 'Difficulty trusting your own inner guidance and the world',
    gift: 'Loyalty, courage, troubleshooting, community-building, perseverance',
    shadow: 'Anxiety, suspicion, reactivity, self-doubt, seeking authority',
    growth: 9,
    stress: 3,
    keywords: ['loyalty', 'security', 'courage', 'community', 'trust', 'perseverance'],
    bodyCenter: 'head',
  },
  7: {
    name: 'The Enthusiast',
    essence: 'Sobriety & Joy',
    coreDesire: 'To be satisfied and content, to have your needs fulfilled',
    coreFear: 'Being deprived, trapped in pain, or missing out',
    coreWound: 'The early realization that the world cannot always give you what you need',
    gift: 'Joy, visionary thinking, synthesizing ideas, enthusiasm, possibility',
    shadow: 'Escapism, scattered focus, avoidance of pain, gluttony',
    growth: 5,
    stress: 1,
    keywords: ['joy', 'enthusiasm', 'adventure', 'possibility', 'synthesis', 'freedom'],
    bodyCenter: 'head',
  },
  8: {
    name: 'The Challenger',
    essence: 'Innocence & Strength',
    coreDesire: 'To protect themselves and be in control of their own destiny',
    coreFear: 'Being controlled, violated, or harmed by others',
    coreWound: 'Learning to hide vulnerability and lead with strength to survive',
    gift: 'Strength, directness, protection of others, decisiveness, vitality',
    shadow: 'Domination, intimidation, excess, denying vulnerability',
    growth: 2,
    stress: 5,
    keywords: ['strength', 'power', 'protection', 'truth', 'intensity', 'justice'],
    bodyCenter: 'body',
  },
  9: {
    name: 'The Peacemaker',
    essence: 'Love & Right Action',
    coreDesire: 'To have inner stability and peace of mind',
    coreFear: 'Loss of connection, fragmentation, conflict',
    coreWound: 'Feeling that your presence and needs don\'t matter — self-erasure',
    gift: 'Mediation, seeing all sides, unconditional presence, calming energy',
    shadow: 'Sloth, self-forgetting, passive aggression, merger with others',
    growth: 3,
    stress: 6,
    keywords: ['peace', 'harmony', 'acceptance', 'mediation', 'presence', 'steadiness'],
    bodyCenter: 'body',
  },
}

export const INSTINCTUAL_VARIANTS: Record<InstinctualVariant, {
  name: string
  focus: string
  description: string
}> = {
  sp: {
    name: 'Self-Preservation',
    focus: 'Physical security and comfort — resources, health, home, routines',
    description: 'Your instinct is first toward physical safety and material security. You attend to the fundamentals — health, money, comfort, and routines — before other concerns.',
  },
  sx: {
    name: 'Sexual / One-to-One',
    focus: 'Intensity and depth in close connections',
    description: 'Your instinct drives toward intensity and deep one-on-one connection. You seek merger, aliveness, and full engagement with what and who you love.',
  },
  so: {
    name: 'Social',
    focus: 'Belonging, status, and contribution to the group',
    description: 'Your instinct orients you toward the group — belonging, social navigation, contribution, and your place in the larger collective.',
  },
}

export const TRITYPE_DESCRIPTIONS: Record<string, string> = {
  '147': 'The Visionary — perfectionist dreamer, idealistic and creative',
  '148': 'The Scholar — driven truth-seeker, intense and idealistic',
  '149': 'The Dreamer — peaceful idealist, imaginative and introspective',
  '125': 'The Mentor — helpful knower, caring and wise',
  '126': 'The Supporter — caring helper with strong loyalty',
  '127': 'The Good Samaritan — joyful helper, optimistic and caring',
  '135': 'The Technical Expert — analytical achiever, competent and withdrawn',
  '136': 'The Taskmaster — responsible achiever, duty-driven and loyal',
  '137': 'The Systems Builder — efficient achiever, strategic and optimistic',
  '145': 'The Researcher — creative investigator, original and introspective',
  '146': 'The Philosopher — deep thinker, thoughtful and loyal',
  '259': 'The Contemplative — wise, peaceful helper',
  '469': 'The Seeker — melancholic, loyal, peaceful dreamer',
  '478': 'The Messenger — intense, original challenger',
  '358': 'The Solution Master — competent, achieving challenger',
}
