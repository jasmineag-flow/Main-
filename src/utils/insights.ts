import type { UserProfile } from '../types'
import { HD_TYPE_DATA } from '../data/humanDesign'
import { ENNEAGRAM_TYPES } from '../data/enneagram'
import { ZODIAC_DATA } from '../data/astrology'

interface SynthesisInsight {
  title: string
  body: string
  tags: string[]
}

export const getSynthesisInsights = (profile: UserProfile): SynthesisInsight[] => {
  const insights: SynthesisInsight[] = []
  const { humanDesign: hd, natalChart: natal, enneagram: ennea } = profile

  if (hd && ennea) {
    const hdData = HD_TYPE_DATA[hd.type]
    const enneaData = ENNEAGRAM_TYPES[ennea.type]
    const conflictOrHarmony = isHarmony(hd.type, ennea.type)

    insights.push({
      title: `${hd.type} meets ${enneaData.name}`,
      body: `Your Human Design ${hd.type} strategy (${hdData.strategy}) and your Enneagram ${ennea.type} pattern (${enneaData.name}) ${conflictOrHarmony.text}. The HD call to ${hdData.theme.toLowerCase()} aligns with the Enneagram invitation toward ${enneaData.essence.split(' & ')[0].toLowerCase()}. Watch for how your ${ennea.type === 1 || ennea.type === 3 ? 'drive toward perfection/achievement' : ennea.type === 2 || ennea.type === 9 ? 'orientation toward others' : 'inner world orientation'} can ${conflictOrHarmony.advice}.`,
      tags: [...hdData.keywords.slice(0, 2), ...enneaData.keywords.slice(0, 2)],
    })
  }

  if (natal && ennea) {
    const sunData = ZODIAC_DATA[natal.sunSign]
    const enneaData = ENNEAGRAM_TYPES[ennea.type]
    insights.push({
      title: `${natal.sunSign} Sun illuminates ${enneaData.name}`,
      body: `Your ${natal.sunSign} solar energy (${sunData.element} / ${sunData.modality}) channels through the ${enneaData.name} pattern. The ${natal.sunSign} gift of ${sunData.keywords[0]} combines with the Enneagram ${ennea.type}'s ${enneaData.gift.split(',')[0].toLowerCase()}, creating a distinctive way of showing up in the world. The shadow work involves your ${natal.sunSign} tendency toward ${sunData.shadow.split(',')[0].toLowerCase()} meeting your Enneagram ${ennea.type}'s ${enneaData.shadow.split(',')[0].toLowerCase()}.`,
      tags: [sunData.element, sunData.modality, ...enneaData.keywords.slice(0, 2)],
    })
  }

  if (hd && natal) {
    const hdData = HD_TYPE_DATA[hd.type]
    const sunData = ZODIAC_DATA[natal.sunSign]
    insights.push({
      title: `${hd.type} with ${natal.sunSign} Solar Energy`,
      body: `As a ${hd.type}, your strategy is to ${hdData.strategy.toLowerCase()}. Your ${natal.sunSign} Sun (${sunData.element}) colors your energy field with ${sunData.keywords.slice(0, 3).join(', ')}. ${getHDNatalSynergy(hd.type, natal.sunSign)} The not-self theme of ${hdData.notSelf.toLowerCase()} may be amplified when your ${natal.sunSign} shadow (${sunData.shadow.split(',')[0].toLowerCase()}) is active.`,
      tags: [hd.type, natal.sunSign, sunData.element],
    })
  }

  if (hd && natal && ennea) {
    insights.push({
      title: 'Your Integrated Field',
      body: `At the intersection of ${hd.type} design, ${natal.sunSign} solar energy, and Enneagram ${ennea.type} patterning, a unique soul signature emerges. ${getTripleSynthesis(profile)} The thread running through all three systems points toward ${getCoreTheme(profile)}.`,
      tags: ['synthesis', 'integration', 'soul-signature'],
    })
  }

  return insights
}

const isHarmony = (hdType: string, enneaType: number): { text: string; advice: string } => {
  const generators = ['Generator', 'Manifesting Generator']
  const doers = [1, 3, 8]
  const guides = ['Projector']
  const helpers = [2, 9]
  if (generators.includes(hdType) && doers.includes(enneaType)) {
    return { text: 'create a powerful doer-achiever synergy', advice: 'amplify your manifestation when channeled through authentic response rather than fear-driven doing' }
  }
  if (guides.includes(hdType) && helpers.includes(enneaType)) {
    return { text: 'blend beautifully in a service-and-guidance orientation', advice: 'deepen your impact when you receive recognition before offering your gifts' }
  }
  return { text: 'create an interesting tension worth exploring', advice: 'work together most powerfully when you allow each system\'s wisdom to inform the other' }
}

const getHDNatalSynergy = (hdType: string, sunSign: string): string => {
  const fireSign = ['Aries', 'Leo', 'Sagittarius'].includes(sunSign)
  const earthSign = ['Taurus', 'Virgo', 'Capricorn'].includes(sunSign)
  const airSign = ['Gemini', 'Libra', 'Aquarius'].includes(sunSign)
  const waterSign = ['Cancer', 'Scorpio', 'Pisces'].includes(sunSign)

  if (hdType === 'Generator' && fireSign) return 'Your sacral fire is amplified by solar fire — enormous creative capacity when you respond to what truly lights you up.'
  if (hdType === 'Projector' && waterSign) return 'Your penetrating Projector aura is deepened by water\'s emotional intelligence — you read people and systems with rare precision.'
  if (hdType === 'Manifestor' && fireSign) return 'The rarest combination of initiating types — your impact potential is immense. Informing is everything.'
  if ((hdType === 'Generator' || hdType === 'Manifesting Generator') && earthSign) return 'Earth grounds your sacral energy into patient, consistent creation — you build things that last.'
  if (hdType === 'Reflector' && waterSign) return 'Your reflective, sampling nature is heightened by water\'s psychic sensitivity — a profound mirror for the world.'
  if (airSign) return 'Air brings intellectual perspective to your design — ideas, connections, and communication are central to your expression.'
  return 'This combination brings a unique quality to how you embody your design.'
}

const getTripleSynthesis = (profile: UserProfile): string => {
  const type = profile.humanDesign?.type
  const sign = profile.natalChart?.sunSign
  const ennea = profile.enneagram?.type
  if (!type || !sign || !ennea) return ''
  const themes = [
    HD_TYPE_DATA[type].keywords[0],
    ZODIAC_DATA[sign].keywords[0],
    ENNEAGRAM_TYPES[ennea].keywords[0],
  ]
  return `The convergence of ${themes.join(', ')} points to a life oriented around these qualities as both gifts and growth edges.`
}

const getCoreTheme = (profile: UserProfile): string => {
  const themes: string[] = []
  if (profile.humanDesign) themes.push(...HD_TYPE_DATA[profile.humanDesign.type].keywords.slice(0, 2))
  if (profile.natalChart) themes.push(...ZODIAC_DATA[profile.natalChart.sunSign].keywords.slice(0, 1))
  if (profile.enneagram) themes.push(ENNEAGRAM_TYPES[profile.enneagram.type].essence.split(' & ')[0].toLowerCase())
  const unique = [...new Set(themes)]
  return unique.slice(0, 3).join(', ')
}
