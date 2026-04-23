import { LayoutDashboard, GitBranch, Sparkles, Plus, Settings } from 'lucide-react'
import type { View } from '../types'

interface Props {
  view: View
  setView: (v: View) => void
  hasProfile: boolean
}

const NAV_ITEMS = [
  { id: 'dashboard' as View, icon: LayoutDashboard, label: 'Overview' },
  { id: 'timeline' as View, icon: GitBranch, label: 'Timeline' },
  { id: 'synthesis' as View, icon: Sparkles, label: 'Synthesis' },
]

export default function Navigation({ view, setView, hasProfile }: Props) {
  if (!hasProfile) return null

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-16 flex-col items-center py-8 gap-6 bg-cosmos-900/80 backdrop-blur border-r border-white/5 z-50">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-hd via-ennea to-natal flex items-center justify-center mb-4">
          <span className="text-xs font-bold text-white">IA</span>
        </div>
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            title={label}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group relative
              ${view === id
                ? 'bg-surface-overlay text-white shadow-lg'
                : 'text-slate-500 hover:text-slate-300 hover:bg-surface/50'
              }`}
          >
            <Icon size={18} />
            <span className="absolute left-14 bg-cosmos-800 text-xs text-slate-200 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-white/10 transition-opacity">
              {label}
            </span>
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={() => setView('setup')}
          title="Settings"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-surface/50 transition-all group relative"
        >
          <Settings size={18} />
          <span className="absolute left-14 bg-cosmos-800 text-xs text-slate-200 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-white/10 transition-opacity">
            Edit Profile
          </span>
        </button>
      </nav>

      {/* Mobile bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 flex items-center justify-around bg-cosmos-900/90 backdrop-blur border-t border-white/5 z-50 px-4">
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all
              ${view === id ? 'text-white' : 'text-slate-500'}`}
          >
            <Icon size={18} />
            <span className="text-[10px]">{label}</span>
          </button>
        ))}
        <button
          onClick={() => setView('setup')}
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-slate-500"
        >
          <Plus size={18} />
          <span className="text-[10px]">Edit</span>
        </button>
      </nav>
    </>
  )
}
