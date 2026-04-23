export type HDType = 'Generator' | 'Manifesting Generator' | 'Manifestor' | 'Projector' | 'Reflector'
export type HDAuthority =
  | 'Sacral' | 'Solar Plexus' | 'Splenic' | 'Ego/Heart'
  | 'G/Self' | 'Mental/Environmental' | 'Lunar'
export type HDCenter =
  | 'Head' | 'Ajna' | 'Throat' | 'G/Self' | 'Heart/Ego'
  | 'Solar Plexus' | 'Sacral' | 'Spleen' | 'Root'

export type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type EnneagramWing = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type InstinctualVariant = 'sp' | 'sx' | 'so'

export type ZodiacSign =
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo'
  | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces'
export type Planet =
  | 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars'
  | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto'
  | 'North Node' | 'Chiron' | 'Ascendant' | 'Midheaven'

export interface HumanDesignData {
  type: HDType
  profile: string
  authority: HDAuthority
  definedCenters: HDCenter[]
  incarnationCross: string
  channels?: string[]
}

export interface PlanetPlacement {
  planet: Planet
  sign: ZodiacSign
  house?: number
  retrograde?: boolean
}

export interface NatalChartData {
  birthDate: string
  birthTime?: string
  birthLocation?: string
  sunSign: ZodiacSign
  moonSign: ZodiacSign
  risingSign?: ZodiacSign
  placements?: PlanetPlacement[]
}

export interface EnneagramData {
  type: EnneagramType
  wing?: EnneagramWing
  variant?: InstinctualVariant
  tritype?: string
}

export type ElementKind = 'human-design' | 'natal' | 'enneagram' | 'custom'

export interface CustomElement {
  id: string
  kind: 'custom'
  name: string
  description: string
  color: string
  tags: string[]
}

export interface UserProfile {
  name: string
  birthDate: string
  humanDesign?: HumanDesignData
  natalChart?: NatalChartData
  enneagram?: EnneagramData
  customElements: CustomElement[]
}

export type View = 'dashboard' | 'timeline' | 'synthesis' | 'setup' | 'detail'
export type DetailSystem = 'hd' | 'natal' | 'ennea' | 'custom'

export interface TimelineEvent {
  id: string
  age: number
  year: number
  title: string
  description: string
  system: 'hd' | 'natal' | 'ennea' | 'combined' | 'custom'
  kind: 'return' | 'opposition' | 'square' | 'half' | 'cycle' | 'milestone'
}
