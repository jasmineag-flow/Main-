import { Sparkles, Layers } from 'lucide-react'
import type { UserProfile } from '../types'
import { getSynthesisInsights } from '../utils/insights'
import { HD_TYPE_DATA } from '../data/humanDesign'
import { ENNEAGRAM_TYPES } from '../data/enneagram'
import { ZODIAC_DATA } from '../data/astrology'

interface Props {
  profile: UserProfile
  onSetup: () => void
}

function InsightCard({ title, body, tags, index }: { title: string; body: string; tags: string[]; index: number }) {
  const delays = ['0ms', '80ms', '160ms', '240ms']
  return (
    <div
      className="glass-card p-5 border border-white/5 hover:border-white/10 transition-all fade-in"
      style={{ animationDelay: delays[index] || '0ms' }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-hd/30 via-ennea/30 to-natal/30 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles size={10} className="text-white/80" />
        </div>
        <h3 className="text-sm font-medium text-white leading-snug">{title}</h3>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed mb-4">{body}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-500 border border-white/5">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function SystemPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={`flex items-center gap-2 glass-card px-4 py-3 border ${color}/20`}>
      <span className={`text-xs ${color} uppercase tracking-widest`}>{label}</span>
      <span className="text-sm text-slate-300">{value}</span>
    </div>
  )
}

export default function SynthesisView({ profile, onSetup }: Props) {
  const insights = getSynthesisInsights(profile)
  const systems = [profile.humanDesign, profile.natalChart, profile.enneagram].filter(Boolean).length

  return (
    <div className="fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Layers size={16} className="text-slate-500" />
          <h2 className="text-lg font-medium text-white">Cross-System Synthesis</h2>
        </div>
        <p className="text-sm text-slate-500">
          Insights that emerge from the intersection of your systems.
          {systems < 2 && (
            <button onClick={onSetup} className="text-hd hover:underline ml-1">
              Add more systems to unlock deeper synthesis →
            </button>
          )}
        </p>
      </div>

      {/* Active systems summary */}
      <div className="flex flex-wrap gap-2 mb-8">
        {profile.humanDesign && (
          <SystemPill label="HD" value={`${profile.humanDesign.type} · ${profile.humanDesign.profile}`} color="text-hd border-hd" />
        )}
        {profile.natalChart && (
          <SystemPill label="Natal" value={`${profile.natalChart.sunSign} Sun${profile.natalChart.moonSign ? ` · ${profile.natalChart.moonSign} Moon` : ''}${profile.natalChart.risingSign ? ` · ${profile.natalChart.risingSign} Rising` : ''}`} color="text-natal border-natal" />
        )}
        {profile.enneagram && (
          <SystemPill label="Ennea" value={`Type ${profile.enneagram.type}${profile.enneagram.wing ? `w${profile.enneagram.wing}` : ''}`} color="text-ennea border-ennea" />
        )}
      </div>

      {insights.length === 0 ? (
        <div className="glass-card p-8 text-center border border-white/5">
          <Sparkles size={32} className="text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 text-sm mb-4">Add at least two systems to generate synthesis insights.</p>
          <button
            onClick={onSetup}
            className="px-4 py-2 rounded-xl bg-surface-raised text-slate-300 text-sm hover:text-white border border-white/10 hover:border-white/20 transition-all"
          >
            Configure your profile
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {insights.map((insight, i) => (
            <InsightCard key={i} {...insight} index={i} />
          ))}
        </div>
      )}

      {/* Elemental / Center summary */}
      {profile.natalChart && (
        <div className="mt-8">
          <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-4">Elemental Profile</h3>
          <div className="glass-card p-5 border border-white/5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(['Fire', 'Earth', 'Air', 'Water'] as const).map(element => {
                const signData = ZODIAC_DATA[profile.natalChart!.sunSign]
                const isActive = signData.element === element
                return (
                  <div key={element} className={`text-center p-3 rounded-xl transition-all ${isActive ? 'bg-natal/10 border border-natal/20' : 'opacity-30'}`}>
                    <div className="text-2xl mb-1">
                      {element === 'Fire' ? '🔥' : element === 'Earth' ? '🌱' : element === 'Air' ? '💨' : '🌊'}
                    </div>
                    <p className={`text-xs font-medium ${isActive ? 'text-natal' : 'text-slate-500'}`}>{element}</p>
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">Sun sign elemental expression</p>
          </div>
        </div>
      )}

      {/* Body center triad for enneagram */}
      {profile.enneagram && (
        <div className="mt-6">
          <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-4">Intelligence Center</h3>
          <div className="glass-card p-5 border border-white/5">
            <div className="grid grid-cols-3 gap-4">
              {(['head', 'heart', 'body'] as const).map(center => {
                const enneaData = ENNEAGRAM_TYPES[profile.enneagram!.type]
                const isActive = enneaData.bodyCenter === center
                const types = { head: [5, 6, 7], heart: [2, 3, 4], body: [8, 9, 1] }
                return (
                  <div key={center} className={`text-center p-3 rounded-xl transition-all ${isActive ? 'bg-ennea/10 border border-ennea/20' : 'opacity-30'}`}>
                    <div className="text-2xl mb-1">
                      {center === 'head' ? '🧠' : center === 'heart' ? '❤️' : '⚡'}
                    </div>
                    <p className={`text-xs font-medium capitalize ${isActive ? 'text-ennea' : 'text-slate-500'}`}>{center}</p>
                    <p className="text-[9px] text-slate-600 mt-0.5">Types {types[center].join(', ')}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
