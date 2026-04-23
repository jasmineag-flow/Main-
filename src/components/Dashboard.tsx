import { Hexagon, Star, Circle } from 'lucide-react'
import type { UserProfile, DetailSystem } from '../types'
import SystemCard from './SystemCard'
import { HD_TYPE_DATA, HD_PROFILES } from '../data/humanDesign'
import { ENNEAGRAM_TYPES } from '../data/enneagram'
import { ZODIAC_DATA } from '../data/astrology'
import { getCurrentAge } from '../utils/timeline'

interface Props {
  profile: UserProfile
  onDetail: (s: DetailSystem) => void
  onSetup: () => void
}

export default function Dashboard({ profile, onDetail, onSetup }: Props) {
  const age = getCurrentAge(profile.birthDate)
  const birthYear = new Date(profile.birthDate).getFullYear()

  const hdSummary = profile.humanDesign
    ? HD_TYPE_DATA[profile.humanDesign.type].description
    : ''

  const natalSummary = profile.natalChart
    ? ZODIAC_DATA[profile.natalChart.sunSign].description
    : ''

  const enneaSummary = profile.enneagram
    ? `${ENNEAGRAM_TYPES[profile.enneagram.type].coreDesire}. Core gift: ${ENNEAGRAM_TYPES[profile.enneagram.type].gift.split(',')[0]}.`
    : ''

  const hdTags = profile.humanDesign
    ? [
        profile.humanDesign.type,
        `${profile.humanDesign.profile} ${HD_PROFILES[profile.humanDesign.profile]?.name.split(' / ')[0] ?? ''}`,
        profile.humanDesign.authority,
      ]
    : []

  const natalTags = profile.natalChart
    ? [
        `${profile.natalChart.sunSign} Sun`,
        profile.natalChart.moonSign ? `${profile.natalChart.moonSign} Moon` : '',
        profile.natalChart.risingSign ? `${profile.natalChart.risingSign} Rising` : '',
      ].filter(Boolean)
    : []

  const enneaTags = profile.enneagram
    ? [
        `Type ${profile.enneagram.type}`,
        profile.enneagram.wing ? `w${profile.enneagram.wing}` : '',
        profile.enneagram.variant ?? '',
        ENNEAGRAM_TYPES[profile.enneagram.type].bodyCenter + ' center',
      ].filter(Boolean)
    : []

  return (
    <div className="fade-in">
      {/* Hero greeting */}
      <div className="mb-8">
        <p className="text-xs text-slate-600 uppercase tracking-widest mb-1">Inner Atlas</p>
        <h1 className="text-2xl font-light text-white">
          {profile.name ? `Hello, ${profile.name}` : 'Your Inner Atlas'}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Age {age} · Born {birthYear} ·{' '}
          {[profile.humanDesign, profile.natalChart, profile.enneagram].filter(Boolean).length} systems active
        </p>
      </div>

      {/* System cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <SystemCard
          title="Human Design"
          subtitle={profile.humanDesign ? `${profile.humanDesign.type} · ${profile.humanDesign.profile}` : ''}
          accentClass="text-hd"
          glowClass="glow-hd"
          borderClass="border-hd"
          icon={<Hexagon size={18} />}
          tags={hdTags}
          summary={hdSummary}
          onClick={() => onDetail('hd')}
          isEmpty={!profile.humanDesign}
          onSetup={onSetup}
        />
        <SystemCard
          title="Natal Chart"
          subtitle={profile.natalChart ? `${profile.natalChart.sunSign} Sun` : ''}
          accentClass="text-natal"
          glowClass="glow-natal"
          borderClass="border-natal"
          icon={<Star size={18} />}
          tags={natalTags}
          summary={natalSummary}
          onClick={() => onDetail('natal')}
          isEmpty={!profile.natalChart}
          onSetup={onSetup}
        />
        <SystemCard
          title="Enneagram"
          subtitle={profile.enneagram ? `Type ${profile.enneagram.type}${profile.enneagram.wing ? `w${profile.enneagram.wing}` : ''} — ${ENNEAGRAM_TYPES[profile.enneagram.type].name}` : ''}
          accentClass="text-ennea"
          glowClass="glow-ennea"
          borderClass="border-ennea"
          icon={<Circle size={18} />}
          tags={enneaTags}
          summary={enneaSummary}
          onClick={() => onDetail('ennea')}
          isEmpty={!profile.enneagram}
          onSetup={onSetup}
        />
      </div>

      {/* Custom elements */}
      {profile.customElements.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-3">Additional Elements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.customElements.map(el => (
              <div key={el.id} className="glass-card glow-extra p-4 border border-extra/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-extra" />
                  <p className="text-sm font-medium text-extra">{el.name}</p>
                </div>
                <p className="text-xs text-slate-400">{el.description}</p>
                {el.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {el.tags.map(t => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-extra/10 text-extra/80">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Next Saturn Return', value: profile.humanDesign || profile.natalChart ? `Age ${Math.ceil(age / 29.5) * 29 + (age % 29 < 5 ? 0 : 29)} (${birthYear + Math.ceil(age / 29.5) * 29 + (age % 29 < 5 ? 0 : 29)})` : '—', color: 'text-natal' },
          { label: 'Next Jupiter Return', value: profile.natalChart ? `Age ${Math.ceil((age + 1) / 12) * 12} (${birthYear + Math.ceil((age + 1) / 12) * 12})` : '—', color: 'text-natal' },
          { label: 'Active Strategy', value: profile.humanDesign ? HD_TYPE_DATA[profile.humanDesign.type].strategy : '—', color: 'text-hd' },
          { label: 'Growth Direction', value: profile.enneagram ? `→ Type ${ENNEAGRAM_TYPES[profile.enneagram.type].growth}` : '—', color: 'text-ennea' },
        ].map(stat => (
          <div key={stat.label} className="glass-card p-4 border border-white/5">
            <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-1">{stat.label}</p>
            <p className={`text-sm font-medium ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
