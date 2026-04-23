import { useRef, useState, useEffect } from 'react'
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react'
import type { TimelineEvent, UserProfile } from '../types'
import { buildTimeline, getCurrentAge } from '../utils/timeline'

interface Props {
  profile: UserProfile
}

const SYSTEM_COLORS = {
  hd: { bg: 'bg-hd', text: 'text-hd', border: 'border-hd/40', track: '#8b5cf6' },
  natal: { bg: 'bg-natal', text: 'text-natal', border: 'border-natal/40', track: '#f59e0b' },
  ennea: { bg: 'bg-ennea', text: 'text-ennea', border: 'border-ennea/40', track: '#06b6d4' },
  combined: { bg: 'bg-white', text: 'text-white', border: 'border-white/40', track: '#e2e8f0' },
  custom: { bg: 'bg-extra', text: 'text-extra', border: 'border-extra/40', track: '#10b981' },
}

const KIND_SHAPES: Record<string, string> = {
  return: '★',
  opposition: '◆',
  square: '■',
  half: '◐',
  cycle: '○',
  milestone: '●',
}

export default function Timeline({ profile }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [selected, setSelected] = useState<TimelineEvent | null>(null)
  const [events] = useState(() => buildTimeline(profile))

  const birthYear = new Date(profile.birthDate).getFullYear()
  const currentAge = getCurrentAge(profile.birthDate)
  const maxAge = Math.max(90, currentAge + 15)
  const minAge = 0

  const AGE_RANGE = maxAge - minAge
  const BASE_WIDTH = 2400
  const totalWidth = BASE_WIDTH * zoom

  const ageToX = (age: number) => ((age - minAge) / AGE_RANGE) * totalWidth

  const systems: Array<typeof events[0]['system']> = ['hd', 'natal', 'ennea', 'combined']
  const activeSystemsSet = new Set(events.map(e => e.system))
  const activeSystems = systems.filter(s => activeSystemsSet.has(s))

  useEffect(() => {
    if (scrollRef.current) {
      const currentX = ageToX(currentAge)
      scrollRef.current.scrollLeft = currentX - scrollRef.current.clientWidth / 2
    }
  }, [currentAge, zoom])

  const scrollBy = (dir: number) => {
    if (scrollRef.current) scrollRef.current.scrollLeft += dir * 300
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h2 className="text-lg font-medium text-white">Life Timeline</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Current age: <span className="text-slate-300">{currentAge}</span>
            {' · '}
            Born: <span className="text-slate-300">{birthYear}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-surface rounded-xl p-1 border border-white/5">
            <button
              onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-surface-raised transition-all"
            >
              <ZoomOut size={14} />
            </button>
            <span className="text-xs text-slate-500 px-2">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(z => Math.min(3, z + 0.25))}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-surface-raised transition-all"
            >
              <ZoomIn size={14} />
            </button>
          </div>
          <button onClick={() => scrollBy(-1)} className="w-8 h-8 rounded-xl bg-surface border border-white/5 flex items-center justify-center text-slate-400 hover:text-white">
            <ChevronLeft size={14} />
          </button>
          <button onClick={() => scrollBy(1)} className="w-8 h-8 rounded-xl bg-surface border border-white/5 flex items-center justify-center text-slate-400 hover:text-white">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 flex-shrink-0">
        {activeSystems.map(sys => (
          <div key={sys} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: SYSTEM_COLORS[sys].track }} />
            <span className="text-xs text-slate-400 capitalize">{sys === 'hd' ? 'Human Design' : sys === 'ennea' ? 'Enneagram' : sys === 'natal' ? 'Astrology' : 'Combined'}</span>
          </div>
        ))}
        <div className="flex items-center gap-3 ml-4 text-xs text-slate-600">
          {Object.entries(KIND_SHAPES).map(([kind, shape]) => (
            <span key={kind} title={kind}>{shape} {kind}</span>
          ))}
        </div>
      </div>

      {/* Timeline canvas */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-hidden relative timeline-scroll"
        style={{ cursor: 'grab' }}
      >
        <div style={{ width: totalWidth, minWidth: totalWidth, position: 'relative', height: '100%', minHeight: 400 }}>

          {/* Age ruler */}
          <div className="absolute top-0 left-0 right-0 h-10 flex items-end border-b border-white/5">
            {Array.from({ length: maxAge + 1 }, (_, i) => i).filter(a => a % 5 === 0).map(age => (
              <div key={age} className="absolute flex flex-col items-center" style={{ left: ageToX(age) }}>
                <div className="w-px h-3 bg-white/10" />
                <span className="text-[10px] text-slate-600 mt-0.5 -translate-x-1/2">{age}</span>
              </div>
            ))}
            {/* Year labels */}
            {Array.from({ length: maxAge + 1 }, (_, i) => i).filter(a => a % 10 === 0).map(age => (
              <div key={`yr-${age}`} className="absolute flex flex-col items-center" style={{ left: ageToX(age) }}>
                <span className="text-[9px] text-slate-700 mt-5 -translate-x-1/2">{birthYear + age}</span>
              </div>
            ))}
          </div>

          {/* Current age line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-white/40 z-10"
            style={{ left: ageToX(currentAge) }}
          >
            <div className="w-2 h-2 bg-white rounded-full absolute top-1 -translate-x-1/2" />
            <div className="absolute top-6 -translate-x-1/2 bg-white/90 text-cosmos-950 text-[9px] px-1.5 py-0.5 rounded font-medium whitespace-nowrap">
              Now · {currentAge}
            </div>
          </div>

          {/* Decade bands */}
          {Array.from({ length: Math.ceil(maxAge / 10) }, (_, i) => i * 10).map(decade => (
            <div
              key={decade}
              className={`absolute top-10 bottom-0 ${(decade / 10) % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
              style={{ left: ageToX(decade), width: ageToX(decade + 10) - ageToX(decade) }}
            />
          ))}

          {/* System tracks */}
          {activeSystems.map((sys, trackIdx) => {
            const trackY = 60 + trackIdx * 80
            const trackEvents = events.filter(e => e.system === sys)
            const color = SYSTEM_COLORS[sys]

            return (
              <div key={sys} className="absolute" style={{ top: trackY, left: 0, right: 0, height: 72 }}>
                {/* Track label */}
                <div className="absolute -left-2 top-3 text-[9px] uppercase tracking-widest whitespace-nowrap"
                  style={{ color: color.track, left: 8 }}>
                  {sys === 'hd' ? 'HD' : sys === 'natal' ? 'Natal' : sys === 'ennea' ? 'Ennea' : '∞'}
                </div>

                {/* Track line */}
                <div className="absolute top-8 left-0 right-0 h-px opacity-20" style={{ background: color.track }} />

                {/* Events */}
                {trackEvents.map(event => (
                  <button
                    key={event.id}
                    className={`absolute top-4 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all hover:scale-125 z-20
                      ${selected?.id === event.id ? 'scale-125 ring-2' : ''}`}
                    style={{
                      left: ageToX(event.age) - 12,
                      background: `${color.track}33`,
                      borderWidth: 1.5,
                      borderColor: color.track,
                      color: color.track,
                    }}
                    onClick={() => setSelected(selected?.id === event.id ? null : event)}
                    title={`Age ${event.age}: ${event.title}`}
                  >
                    <span style={{ fontSize: 10 }}>{KIND_SHAPES[event.kind]}</span>
                  </button>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* Event detail panel */}
      {selected && (
        <div className="flex-shrink-0 mt-4 glass-card p-5 border border-white/10 slide-up">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                style={{
                  background: `${SYSTEM_COLORS[selected.system].track}22`,
                  color: SYSTEM_COLORS[selected.system].track,
                  border: `1.5px solid ${SYSTEM_COLORS[selected.system].track}`,
                }}
              >
                {KIND_SHAPES[selected.kind]}
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest" style={{ color: SYSTEM_COLORS[selected.system].track }}>
                  Age {selected.age} · {selected.year} · {selected.system === 'hd' ? 'Human Design' : selected.system === 'ennea' ? 'Enneagram' : selected.system === 'natal' ? 'Astrology' : 'Cross-System'}
                </p>
                <h3 className="text-base font-medium text-white">{selected.title}</h3>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-slate-500 hover:text-slate-300 transition-colors ml-4"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mt-3">{selected.description}</p>
        </div>
      )}
    </div>
  )
}
