import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  title: string
  subtitle: string
  accentClass: string
  glowClass: string
  borderClass: string
  icon: ReactNode
  tags: string[]
  summary: string
  onClick: () => void
  isEmpty?: boolean
  onSetup?: () => void
}

export default function SystemCard({
  title, subtitle, accentClass, glowClass, borderClass, icon, tags, summary, onClick, isEmpty, onSetup
}: Props) {
  if (isEmpty) {
    return (
      <button
        onClick={onSetup}
        className={`glass-card p-6 border ${borderClass}/20 hover:border-opacity-50 transition-all duration-300 text-left group w-full`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl ${accentClass}/10 flex items-center justify-center ${accentClass}`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <p className="text-xs text-slate-600">Not configured</p>
          </div>
        </div>
        <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
          Click to add your {title.toLowerCase()} data →
        </p>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`glass-card ${glowClass} p-6 border ${borderClass}/20 hover:${borderClass}/40 transition-all duration-300 text-left group w-full hover:scale-[1.01]`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-opacity-10 flex items-center justify-center ${accentClass}`}
            style={{ background: 'rgba(255,255,255,0.06)' }}>
            {icon}
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest">{title}</p>
            <p className="text-base font-semibold text-slate-100">{subtitle}</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors mt-1" />
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">{summary}</p>

      <div className="flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full border ${borderClass}/30 ${accentClass}/80`}>
            {tag}
          </span>
        ))}
      </div>
    </button>
  )
}
