import { X, ArrowLeft } from 'lucide-react'
import type { UserProfile } from '../types'
import { HD_TYPE_DATA, HD_AUTHORITY_DATA, HD_PROFILES, HD_CENTER_MEANINGS } from '../data/humanDesign'
import { ENNEAGRAM_TYPES, INSTINCTUAL_VARIANTS } from '../data/enneagram'
import { ZODIAC_DATA, PLANET_MEANINGS } from '../data/astrology'

interface Props {
  system: 'hd' | 'natal' | 'ennea'
  profile: UserProfile
  onClose: () => void
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-3">{title}</h3>
      {children}
    </div>
  )
}

function InfoRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-white/5">
      <span className="text-sm text-slate-500">{label}</span>
      <div className="text-right max-w-[60%]">
        <span className="text-sm text-slate-200">{value}</span>
        {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

function HDView({ profile }: { profile: UserProfile }) {
  const hd = profile.humanDesign!
  const typeData = HD_TYPE_DATA[hd.type]
  const authData = HD_AUTHORITY_DATA[hd.authority]
  const profileData = HD_PROFILES[hd.profile]

  return (
    <div className="fade-in">
      <div className="glass-card glow-hd p-6 mb-6 border border-hd/20">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase tracking-widest text-hd">Human Design</span>
        </div>
        <h2 className="text-2xl font-light text-white mb-1">{hd.type}</h2>
        <p className="text-sm text-slate-400">{typeData.lifeForce}</p>
      </div>

      <Section title="Core Design">
        <div className="glass-card p-4 border border-white/5">
          <InfoRow label="Type" value={hd.type} sub={`Strategy: ${typeData.strategy}`} />
          <InfoRow label="Profile" value={`${hd.profile} — ${profileData?.name ?? hd.profile}`} />
          <InfoRow label="Authority" value={hd.authority} sub={authData.howToDecide} />
          {hd.incarnationCross && <InfoRow label="Incarnation Cross" value={hd.incarnationCross} />}
          <InfoRow label="Not-Self Theme" value={typeData.notSelf} />
          <InfoRow label="Life Theme" value={typeData.theme} />
        </div>
      </Section>

      <Section title="Type Description">
        <div className="glass-card p-5 border border-hd/10">
          <p className="text-sm text-slate-300 leading-relaxed">{typeData.description}</p>
        </div>
      </Section>

      <Section title="Authority Guidance">
        <div className="glass-card p-5 border border-hd/10">
          <p className="text-sm text-slate-400 leading-relaxed mb-3">{authData.description}</p>
          <div className="bg-hd/10 rounded-lg p-3">
            <p className="text-xs text-hd uppercase tracking-wide mb-1">How to decide</p>
            <p className="text-sm text-slate-300">{authData.howToDecide}</p>
          </div>
        </div>
      </Section>

      {hd.definedCenters.length > 0 && (
        <Section title="Defined Centers">
          <div className="grid grid-cols-1 gap-2">
            {hd.definedCenters.map(center => (
              <div key={center} className="glass-card p-4 border border-hd/10">
                <p className="text-sm font-medium text-hd mb-1">{center}</p>
                <p className="text-xs text-slate-400">{HD_CENTER_MEANINGS[center].defined}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {hd.profile && profileData && (
        <Section title="Profile Deep Dive">
          <div className="glass-card p-5 border border-hd/10">
            <h4 className="text-sm font-medium text-white mb-2">{hd.profile} — {profileData.name}</h4>
            <div className="flex flex-wrap gap-2">
              {profileData.keywords.map(kw => (
                <span key={kw} className="text-xs px-2 py-1 rounded-full bg-hd/10 text-hd border border-hd/20">{kw}</span>
              ))}
            </div>
          </div>
        </Section>
      )}
    </div>
  )
}

function NatalView({ profile }: { profile: UserProfile }) {
  const natal = profile.natalChart!
  const sunData = ZODIAC_DATA[natal.sunSign]
  const moonData = natal.moonSign ? ZODIAC_DATA[natal.moonSign] : null
  const risingData = natal.risingSign ? ZODIAC_DATA[natal.risingSign] : null

  return (
    <div className="fade-in">
      <div className="glass-card glow-natal p-6 mb-6 border border-natal/20">
        <span className="text-[10px] uppercase tracking-widest text-natal">Natal Chart</span>
        <h2 className="text-2xl font-light text-white mb-1">{natal.sunSign} Sun</h2>
        <p className="text-sm text-slate-400">{sunData.element} · {sunData.modality} · Ruled by {sunData.ruler}</p>
      </div>

      <Section title="The Big Three">
        <div className="glass-card p-4 border border-white/5">
          <InfoRow label="Sun Sign" value={`${natal.sunSign} (${sunData.dates})`} sub={sunData.keywords.slice(0,3).join(', ')} />
          {natal.moonSign && moonData && (
            <InfoRow label="Moon Sign" value={`${natal.moonSign}`} sub={moonData.keywords.slice(0,3).join(', ')} />
          )}
          {natal.risingSign && risingData && (
            <InfoRow label="Rising / Ascendant" value={`${natal.risingSign}`} sub={risingData.keywords.slice(0,3).join(', ')} />
          )}
          {natal.birthLocation && <InfoRow label="Birth Location" value={natal.birthLocation} />}
          {natal.birthTime && <InfoRow label="Birth Time" value={natal.birthTime} />}
        </div>
      </Section>

      <Section title="Solar Description">
        <div className="glass-card p-5 border border-natal/10">
          <p className="text-sm text-slate-300 leading-relaxed mb-3">{sunData.description}</p>
          <div className="bg-natal/10 rounded-lg p-3">
            <p className="text-xs text-natal uppercase tracking-wide mb-1">Shadow to integrate</p>
            <p className="text-sm text-slate-300">{sunData.shadow}</p>
          </div>
        </div>
      </Section>

      {natal.moonSign && moonData && (
        <Section title="Moon Sign — Emotional Nature">
          <div className="glass-card p-5 border border-natal/10">
            <p className="text-sm text-slate-300 leading-relaxed mb-2">{moonData.description}</p>
            <p className="text-xs text-slate-500">Shadow: {moonData.shadow}</p>
          </div>
        </Section>
      )}

      {natal.placements && natal.placements.length > 0 && (
        <Section title="Planetary Placements">
          <div className="grid gap-2">
            {natal.placements.map((p, i) => {
              const pm = PLANET_MEANINGS[p.planet]
              return (
                <div key={i} className="glass-card p-4 border border-natal/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm font-medium text-natal">{p.planet}</span>
                      {p.retrograde && <span className="text-xs text-slate-500 ml-2">℞</span>}
                      <p className="text-xs text-slate-500 mt-0.5">{pm.role}</p>
                    </div>
                    <span className="text-sm text-slate-300">{p.sign}{p.house ? ` · House ${p.house}` : ''}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </Section>
      )}
    </div>
  )
}

function EnneaView({ profile }: { profile: UserProfile }) {
  const ennea = profile.enneagram!
  const typeData = ENNEAGRAM_TYPES[ennea.type]
  const variantData = ennea.variant ? INSTINCTUAL_VARIANTS[ennea.variant] : null
  const growthData = ENNEAGRAM_TYPES[typeData.growth as keyof typeof ENNEAGRAM_TYPES]
  const stressData = ENNEAGRAM_TYPES[typeData.stress as keyof typeof ENNEAGRAM_TYPES]

  return (
    <div className="fade-in">
      <div className="glass-card glow-ennea p-6 mb-6 border border-ennea/20">
        <span className="text-[10px] uppercase tracking-widest text-ennea">Enneagram</span>
        <h2 className="text-2xl font-light text-white mb-1">Type {ennea.type} — {typeData.name}</h2>
        <p className="text-sm text-slate-400">{typeData.essence} · {typeData.bodyCenter} center</p>
      </div>

      <Section title="Core Pattern">
        <div className="glass-card p-4 border border-white/5">
          <InfoRow label="Core Desire" value={typeData.coreDesire} />
          <InfoRow label="Core Fear" value={typeData.coreFear} />
          <InfoRow label="Body Center" value={`${typeData.bodyCenter.charAt(0).toUpperCase() + typeData.bodyCenter.slice(1)} Center`} />
          {ennea.wing && <InfoRow label="Wing" value={`${ennea.type}w${ennea.wing}`} sub={`${typeData.name} with ${ENNEAGRAM_TYPES[ennea.wing as keyof typeof ENNEAGRAM_TYPES].name} flavor`} />}
          {ennea.variant && variantData && <InfoRow label="Instinctual Variant" value={variantData.name} sub={variantData.focus} />}
          {ennea.tritype && <InfoRow label="Tritype" value={ennea.tritype} />}
        </div>
      </Section>

      <Section title="Core Wound & Gift">
        <div className="grid gap-3">
          <div className="glass-card p-5 border border-ennea/10">
            <p className="text-xs text-ennea uppercase tracking-wide mb-2">Core Wound</p>
            <p className="text-sm text-slate-300 leading-relaxed">{typeData.coreWound}</p>
          </div>
          <div className="glass-card p-5 border border-ennea/10">
            <p className="text-xs text-ennea uppercase tracking-wide mb-2">Highest Gift</p>
            <p className="text-sm text-slate-300 leading-relaxed">{typeData.gift}</p>
          </div>
          <div className="glass-card p-5 border border-red-500/10">
            <p className="text-xs text-red-400 uppercase tracking-wide mb-2">Shadow Patterns</p>
            <p className="text-sm text-slate-400 leading-relaxed">{typeData.shadow}</p>
          </div>
        </div>
      </Section>

      <Section title="Integration & Disintegration">
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-4 border border-green-500/20">
            <p className="text-xs text-green-400 uppercase tracking-wide mb-2">Growth → Type {typeData.growth}</p>
            <p className="text-sm font-medium text-white">{growthData.name}</p>
            <p className="text-xs text-slate-500 mt-1">Adopt these qualities: {growthData.gift.split(',')[0]}</p>
          </div>
          <div className="glass-card p-4 border border-red-500/20">
            <p className="text-xs text-red-400 uppercase tracking-wide mb-2">Stress → Type {typeData.stress}</p>
            <p className="text-sm font-medium text-white">{stressData.name}</p>
            <p className="text-xs text-slate-500 mt-1">Watch for: {stressData.shadow.split(',')[0]}</p>
          </div>
        </div>
      </Section>

      {variantData && (
        <Section title="Instinctual Variant">
          <div className="glass-card p-5 border border-ennea/10">
            <h4 className="text-sm font-medium text-ennea mb-2">{variantData.name}</h4>
            <p className="text-sm text-slate-300 leading-relaxed">{variantData.description}</p>
          </div>
        </Section>
      )}
    </div>
  )
}

export default function DetailView({ system, profile, onClose }: Props) {
  const titleMap = { hd: 'Human Design', natal: 'Natal Chart', ennea: 'Enneagram' }
  const colorMap = { hd: 'text-hd', natal: 'text-natal', ennea: 'text-ennea' }

  return (
    <div className="fixed inset-0 z-40 bg-cosmos-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-full flex items-start justify-center py-8 px-4">
        <div className="w-full max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-slate-400 hover:text-white hover:bg-surface-raised transition-all border border-white/5"
            >
              <ArrowLeft size={16} />
            </button>
            <h1 className={`text-lg font-medium ${colorMap[system]}`}>{titleMap[system]}</h1>
          </div>

          {system === 'hd' && profile.humanDesign && <HDView profile={profile} />}
          {system === 'natal' && profile.natalChart && <NatalView profile={profile} />}
          {system === 'ennea' && profile.enneagram && <EnneaView profile={profile} />}
        </div>
      </div>
    </div>
  )
}
