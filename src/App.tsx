import { useState, useEffect } from 'react'
import type { UserProfile, View, DetailSystem } from './types'
import { loadProfile, saveProfile } from './utils/storage'
import Navigation from './components/Navigation'
import SetupWizard from './components/SetupWizard'
import Dashboard from './components/Dashboard'
import DetailView from './components/DetailView'
import Timeline from './components/Timeline'
import SynthesisView from './components/SynthesisView'

const EMPTY_PROFILE: UserProfile = {
  name: '',
  birthDate: '',
  customElements: [],
}

export default function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [view, setView] = useState<View>('dashboard')
  const [detailSystem, setDetailSystem] = useState<DetailSystem | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const saved = loadProfile()
    if (saved && saved.birthDate) {
      setProfile(saved)
      setView('dashboard')
    } else {
      setView('setup')
    }
    setLoaded(true)
  }, [])

  const handleSave = (p: UserProfile) => {
    saveProfile(p)
    setProfile(p)
    setView('dashboard')
  }

  const handleDetail = (s: DetailSystem) => {
    setDetailSystem(s)
    setView('detail')
  }

  const handleCloseDetail = () => {
    setDetailSystem(null)
    setView('dashboard')
  }

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-hd border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen star-field relative">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-hd/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-natal/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-ennea/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <Navigation view={view} setView={setView} hasProfile={!!profile} />

      {/* Main content */}
      <main className={`relative z-10 min-h-screen ${profile ? 'md:pl-16' : ''}`}>
        {view === 'setup' && (
          <SetupWizard
            initial={profile ?? EMPTY_PROFILE}
            onSave={handleSave}
            onCancel={() => setView('dashboard')}
            isNew={!profile}
          />
        )}

        {view === 'detail' && detailSystem && profile && (detailSystem === 'hd' || detailSystem === 'natal' || detailSystem === 'ennea') && (
          <DetailView
            system={detailSystem}
            profile={profile}
            onClose={handleCloseDetail}
          />
        )}

        {view !== 'setup' && view !== 'detail' && profile && (
          <div className={`px-4 md:px-8 py-8 max-w-5xl mx-auto ${view === 'timeline' ? 'h-screen flex flex-col' : ''}`}>
            {view === 'dashboard' && (
              <Dashboard
                profile={profile}
                onDetail={handleDetail}
                onSetup={() => setView('setup')}
              />
            )}
            {view === 'timeline' && (
              <Timeline profile={profile} />
            )}
            {view === 'synthesis' && (
              <SynthesisView
                profile={profile}
                onSetup={() => setView('setup')}
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}
