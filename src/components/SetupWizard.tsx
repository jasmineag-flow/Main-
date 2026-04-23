import { useState } from 'react'
import { ChevronRight, ChevronLeft, Check, Plus, Trash2 } from 'lucide-react'
import type {
  UserProfile, HDType, HDAuthority, HDCenter, EnneagramType, EnneagramWing,
  InstinctualVariant, ZodiacSign, Planet, PlanetPlacement
} from '../types'
import { HD_CENTERS, INCARNATION_CROSSES } from '../data/humanDesign'
import { BIRTH_DATE_TO_SIGN } from '../data/astrology'

interface Props {
  initial: UserProfile
  onSave: (p: UserProfile) => void
  onCancel: () => void
  isNew: boolean
}

const HD_TYPES: HDType[] = ['Generator', 'Manifesting Generator', 'Manifestor', 'Projector', 'Reflector']
const HD_AUTHORITIES: HDAuthority[] = ['Sacral', 'Solar Plexus', 'Splenic', 'Ego/Heart', 'G/Self', 'Mental/Environmental', 'Lunar']
const HD_PROFILE_OPTIONS = ['1/3','1/4','2/4','2/5','3/5','3/6','4/6','4/1','5/1','5/2','6/2','6/3']
const ENNEA_TYPES: EnneagramType[] = [1,2,3,4,5,6,7,8,9]
const ENNEA_WINGS: EnneagramWing[] = [1,2,3,4,5,6,7,8,9]
const VARIANTS: InstinctualVariant[] = ['sp','sx','so']
const ZODIAC_SIGNS: ZodiacSign[] = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces']
const PLANETS: Planet[] = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto','North Node','Chiron','Ascendant','Midheaven']

type Step = 'profile' | 'hd' | 'natal' | 'ennea' | 'custom' | 'done'
const STEPS: Step[] = ['profile', 'hd', 'natal', 'ennea', 'custom', 'done']

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs text-slate-500 uppercase tracking-wider mb-1.5">{children}</label>
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full bg-surface-raised border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-hd/50 focus:ring-1 focus:ring-hd/30 transition-all ${props.className ?? ''}`}
    />
  )
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full bg-surface-raised border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-hd/50 focus:ring-1 focus:ring-hd/30 transition-all appearance-none ${props.className ?? ''}`}
    >
      {children}
    </select>
  )
}

function ChipGroup<T extends string | number>({
  options, value, onChange, labelFn, colorClass
}: {
  options: T[]
  value: T | undefined
  onChange: (v: T) => void
  labelFn?: (v: T) => string
  colorClass?: string
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={String(opt)}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-3 py-1.5 rounded-xl text-xs border transition-all ${
            value === opt
              ? `${colorClass ?? 'bg-hd/20 border-hd/40 text-hd'}`
              : 'bg-surface-raised border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-300'
          }`}
        >
          {labelFn ? labelFn(opt) : String(opt)}
        </button>
      ))}
    </div>
  )
}

function ToggleChipGroup({ options, values, onChange }: {
  options: HDCenter[]
  values: HDCenter[]
  onChange: (v: HDCenter[]) => void
}) {
  const toggle = (c: HDCenter) => {
    if (values.includes(c)) onChange(values.filter(x => x !== c))
    else onChange([...values, c])
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(c => (
        <button
          key={c}
          type="button"
          onClick={() => toggle(c)}
          className={`px-3 py-1.5 rounded-xl text-xs border transition-all ${
            values.includes(c)
              ? 'bg-hd/20 border-hd/40 text-hd'
              : 'bg-surface-raised border-white/10 text-slate-400 hover:border-white/20'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}

export default function SetupWizard({ initial, onSave, onCancel, isNew }: Props) {
  const [step, setStep] = useState<Step>('profile')
  const [draft, setDraft] = useState<UserProfile>({
    ...initial,
    customElements: initial.customElements ?? [],
  })

  const stepIdx = STEPS.indexOf(step)
  const goNext = () => setStep(STEPS[Math.min(stepIdx + 1, STEPS.length - 1)])
  const goPrev = () => setStep(STEPS[Math.max(stepIdx - 1, 0)])

  const setHD = (key: string, val: unknown) =>
    setDraft(d => ({ ...d, humanDesign: { ...(d.humanDesign ?? { type: 'Generator', profile: '1/3', authority: 'Sacral', definedCenters: [], incarnationCross: '' }), [key]: val } as UserProfile['humanDesign'] }))

  const setNatal = (key: string, val: unknown) =>
    setDraft(d => ({ ...d, natalChart: { ...(d.natalChart ?? { birthDate: d.birthDate, sunSign: 'Aries', moonSign: 'Aries' }), [key]: val } as UserProfile['natalChart'] }))

  const setEnnea = (key: string, val: unknown) =>
    setDraft(d => ({ ...d, enneagram: { ...(d.enneagram ?? { type: 1 as EnneagramType }), [key]: val } as UserProfile['enneagram'] }))

  const addPlanet = () => {
    const current = draft.natalChart?.placements ?? []
    setNatal('placements', [...current, { planet: 'Moon' as Planet, sign: 'Aries' as ZodiacSign }])
  }
  const removePlanet = (i: number) => {
    const current = [...(draft.natalChart?.placements ?? [])]
    current.splice(i, 1)
    setNatal('placements', current)
  }
  const updatePlanet = (i: number, key: keyof PlanetPlacement, val: unknown) => {
    const current = [...(draft.natalChart?.placements ?? [])]
    current[i] = { ...current[i], [key]: val }
    setNatal('placements', current)
  }

  const addCustom = () => {
    setDraft(d => ({
      ...d,
      customElements: [...d.customElements, {
        id: crypto.randomUUID(),
        kind: 'custom',
        name: '',
        description: '',
        color: '#10b981',
        tags: [],
      }]
    }))
  }
  const updateCustom = (i: number, key: string, val: unknown) => {
    setDraft(d => {
      const els = [...d.customElements]
      els[i] = { ...els[i], [key]: val }
      return { ...d, customElements: els }
    })
  }
  const removeCustom = (i: number) => {
    setDraft(d => ({ ...d, customElements: d.customElements.filter((_, idx) => idx !== i) }))
  }

  const handleBirthDateChange = (val: string) => {
    const sign = BIRTH_DATE_TO_SIGN(val)
    setDraft(d => ({
      ...d,
      birthDate: val,
      natalChart: d.natalChart
        ? { ...d.natalChart, birthDate: val, sunSign: sign ?? d.natalChart.sunSign }
        : undefined,
    }))
  }

  const STEP_LABELS: Record<Step, string> = {
    profile: 'Your Profile',
    hd: 'Human Design',
    natal: 'Natal Chart',
    ennea: 'Enneagram',
    custom: 'Add More',
    done: 'All Done',
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Progress bar */}
        <div className="flex gap-1.5 mb-8">
          {STEPS.filter(s => s !== 'done').map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={`h-1 flex-1 rounded-full transition-all ${i <= stepIdx ? 'bg-hd' : 'bg-white/10'}`}
            />
          ))}
        </div>

        <div className="glass-card p-8 border border-white/5 fade-in" key={step}>
          <h2 className="text-lg font-medium text-white mb-1">{STEP_LABELS[step]}</h2>
          <p className="text-xs text-slate-500 mb-6">
            {step === 'profile' && 'Basic information about you'}
            {step === 'hd' && 'Your Human Design chart details'}
            {step === 'natal' && 'Your natal astrology placements'}
            {step === 'ennea' && 'Your Enneagram type and subtype'}
            {step === 'custom' && 'Add any other frameworks you work with'}
            {step === 'done' && 'Your profile is ready'}
          </p>

          {/* PROFILE STEP */}
          {step === 'profile' && (
            <div className="space-y-4">
              <div>
                <Label>Your name</Label>
                <Input
                  placeholder="How would you like to be called?"
                  value={draft.name}
                  onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
                />
              </div>
              <div>
                <Label>Date of birth</Label>
                <Input
                  type="date"
                  value={draft.birthDate}
                  onChange={e => handleBirthDateChange(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* HD STEP */}
          {step === 'hd' && (
            <div className="space-y-5">
              <div className="flex gap-3 mb-2">
                <button
                  type="button"
                  onClick={() => setDraft(d => ({ ...d, humanDesign: d.humanDesign ? undefined : { type: 'Generator', profile: '1/3', authority: 'Sacral', definedCenters: [], incarnationCross: '' } }))}
                  className={`px-3 py-1.5 rounded-xl text-xs border transition-all ${draft.humanDesign ? 'bg-hd/20 border-hd/40 text-hd' : 'bg-surface-raised border-white/10 text-slate-400 hover:border-white/20'}`}
                >
                  {draft.humanDesign ? '✓ Enabled' : '+ Enable Human Design'}
                </button>
              </div>

              {draft.humanDesign && (
                <>
                  <div>
                    <Label>Type</Label>
                    <ChipGroup
                      options={HD_TYPES}
                      value={draft.humanDesign.type}
                      onChange={v => setHD('type', v)}
                      colorClass="bg-hd/20 border-hd/40 text-hd"
                    />
                  </div>
                  <div>
                    <Label>Profile</Label>
                    <ChipGroup
                      options={HD_PROFILE_OPTIONS}
                      value={draft.humanDesign.profile}
                      onChange={v => setHD('profile', v)}
                      colorClass="bg-hd/20 border-hd/40 text-hd"
                    />
                  </div>
                  <div>
                    <Label>Inner Authority</Label>
                    <ChipGroup
                      options={HD_AUTHORITIES}
                      value={draft.humanDesign.authority}
                      onChange={v => setHD('authority', v)}
                      colorClass="bg-hd/20 border-hd/40 text-hd"
                    />
                  </div>
                  <div>
                    <Label>Defined Centers (select all that apply)</Label>
                    <ToggleChipGroup
                      options={HD_CENTERS}
                      values={draft.humanDesign.definedCenters}
                      onChange={v => setHD('definedCenters', v)}
                    />
                  </div>
                  <div>
                    <Label>Incarnation Cross (optional)</Label>
                    <Select value={draft.humanDesign.incarnationCross} onChange={e => setHD('incarnationCross', e.target.value)}>
                      <option value="">Select cross...</option>
                      {INCARNATION_CROSSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </Select>
                  </div>
                </>
              )}
            </div>
          )}

          {/* NATAL STEP */}
          {step === 'natal' && (
            <div className="space-y-5">
              <div className="flex gap-3 mb-2">
                <button
                  type="button"
                  onClick={() => setDraft(d => ({ ...d, natalChart: d.natalChart ? undefined : { birthDate: d.birthDate, sunSign: BIRTH_DATE_TO_SIGN(d.birthDate) ?? 'Aries', moonSign: 'Aries' } }))}
                  className={`px-3 py-1.5 rounded-xl text-xs border transition-all ${draft.natalChart ? 'bg-natal/20 border-natal/40 text-natal' : 'bg-surface-raised border-white/10 text-slate-400 hover:border-white/20'}`}
                >
                  {draft.natalChart ? '✓ Enabled' : '+ Enable Natal Chart'}
                </button>
              </div>

              {draft.natalChart && (
                <>
                  <div>
                    <Label>Sun Sign</Label>
                    <ChipGroup
                      options={ZODIAC_SIGNS}
                      value={draft.natalChart.sunSign}
                      onChange={v => setNatal('sunSign', v)}
                      colorClass="bg-natal/20 border-natal/40 text-natal"
                    />
                  </div>
                  <div>
                    <Label>Moon Sign</Label>
                    <ChipGroup
                      options={ZODIAC_SIGNS}
                      value={draft.natalChart.moonSign}
                      onChange={v => setNatal('moonSign', v)}
                      colorClass="bg-natal/20 border-natal/40 text-natal"
                    />
                  </div>
                  <div>
                    <Label>Rising / Ascendant (optional)</Label>
                    <ChipGroup
                      options={ZODIAC_SIGNS}
                      value={draft.natalChart.risingSign}
                      onChange={v => setNatal('risingSign', v)}
                      colorClass="bg-natal/20 border-natal/40 text-natal"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Birth time (optional)</Label>
                      <Input type="time" value={draft.natalChart.birthTime ?? ''} onChange={e => setNatal('birthTime', e.target.value)} />
                    </div>
                    <div>
                      <Label>Birth location (optional)</Label>
                      <Input placeholder="City, Country" value={draft.natalChart.birthLocation ?? ''} onChange={e => setNatal('birthLocation', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Additional planets (optional)</Label>
                      <button type="button" onClick={addPlanet} className="text-xs text-natal hover:text-natal/80 flex items-center gap-1">
                        <Plus size={12} /> Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(draft.natalChart.placements ?? []).map((p, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <Select className="flex-1" value={p.planet} onChange={e => updatePlanet(i, 'planet', e.target.value as Planet)}>
                            {PLANETS.map(pl => <option key={pl} value={pl}>{pl}</option>)}
                          </Select>
                          <Select className="flex-1" value={p.sign} onChange={e => updatePlanet(i, 'sign', e.target.value as ZodiacSign)}>
                            {ZODIAC_SIGNS.map(s => <option key={s} value={s}>{s}</option>)}
                          </Select>
                          <Input className="w-16" type="number" min={1} max={12} placeholder="H" value={p.house ?? ''} onChange={e => updatePlanet(i, 'house', parseInt(e.target.value) || undefined)} />
                          <button type="button" onClick={() => removePlanet(i)} className="text-red-400 hover:text-red-300 flex-shrink-0">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ENNEAGRAM STEP */}
          {step === 'ennea' && (
            <div className="space-y-5">
              <div className="flex gap-3 mb-2">
                <button
                  type="button"
                  onClick={() => setDraft(d => ({ ...d, enneagram: d.enneagram ? undefined : { type: 1 as EnneagramType } }))}
                  className={`px-3 py-1.5 rounded-xl text-xs border transition-all ${draft.enneagram ? 'bg-ennea/20 border-ennea/40 text-ennea' : 'bg-surface-raised border-white/10 text-slate-400 hover:border-white/20'}`}
                >
                  {draft.enneagram ? '✓ Enabled' : '+ Enable Enneagram'}
                </button>
              </div>

              {draft.enneagram && (
                <>
                  <div>
                    <Label>Core Type</Label>
                    <ChipGroup
                      options={ENNEA_TYPES}
                      value={draft.enneagram.type}
                      onChange={v => setEnnea('type', v)}
                      colorClass="bg-ennea/20 border-ennea/40 text-ennea"
                      labelFn={v => `${v}`}
                    />
                  </div>
                  <div>
                    <Label>Wing (optional)</Label>
                    <ChipGroup
                      options={ENNEA_WINGS}
                      value={draft.enneagram.wing}
                      onChange={v => setEnnea('wing', v)}
                      colorClass="bg-ennea/20 border-ennea/40 text-ennea"
                      labelFn={v => `w${v}`}
                    />
                  </div>
                  <div>
                    <Label>Instinctual Variant (optional)</Label>
                    <ChipGroup
                      options={VARIANTS}
                      value={draft.enneagram.variant}
                      onChange={v => setEnnea('variant', v)}
                      colorClass="bg-ennea/20 border-ennea/40 text-ennea"
                      labelFn={v => v === 'sp' ? 'Self-Pres' : v === 'sx' ? 'Sexual/1-1' : 'Social'}
                    />
                  </div>
                  <div>
                    <Label>Tritype (optional)</Label>
                    <Input placeholder="e.g. 469, 358, 127" value={draft.enneagram.tritype ?? ''} onChange={e => setEnnea('tritype', e.target.value)} />
                  </div>
                </>
              )}
            </div>
          )}

          {/* CUSTOM ELEMENTS */}
          {step === 'custom' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">Add frameworks like Gene Keys, MBTI, Human Metrics, Astrocartography, or anything else meaningful to you.</p>
              {draft.customElements.map((el, i) => (
                <div key={el.id} className="glass-card p-4 border border-extra/20 space-y-3">
                  <div className="flex gap-2">
                    <Input placeholder="System name (e.g. Gene Keys, MBTI)" value={el.name} onChange={e => updateCustom(i, 'name', e.target.value)} className="flex-1" />
                    <button type="button" onClick={() => removeCustom(i)} className="text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <Input placeholder="Your type / profile / result" value={el.description} onChange={e => updateCustom(i, 'description', e.target.value)} />
                  <Input placeholder="Tags (comma separated)" value={el.tags.join(', ')} onChange={e => updateCustom(i, 'tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} />
                </div>
              ))}
              <button type="button" onClick={addCustom} className="w-full glass-card p-4 border border-dashed border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20 transition-all flex items-center justify-center gap-2 rounded-2xl">
                <Plus size={16} /> Add a framework
              </button>
            </div>
          )}

          {/* DONE */}
          {step === 'done' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-hd via-ennea to-natal flex items-center justify-center mx-auto mb-4">
                <Check size={28} className="text-white" />
              </div>
              <h3 className="text-white font-medium mb-2">Profile ready</h3>
              <p className="text-sm text-slate-500 mb-6">
                {[draft.humanDesign, draft.natalChart, draft.enneagram].filter(Boolean).length} systems configured for {draft.name || 'you'}.
              </p>
              <button
                type="button"
                onClick={() => onSave(draft)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-hd to-ennea text-white font-medium hover:opacity-90 transition-opacity"
              >
                Open my Inner Atlas →
              </button>
            </div>
          )}

          {/* Nav buttons */}
          {step !== 'done' && (
            <div className="flex gap-3 mt-8">
              {stepIdx > 0 && (
                <button type="button" onClick={goPrev} className="px-4 py-2.5 rounded-xl bg-surface-raised border border-white/10 text-slate-400 hover:text-white transition-all flex items-center gap-2 text-sm">
                  <ChevronLeft size={14} /> Back
                </button>
              )}
              {!isNew && stepIdx === 0 && (
                <button type="button" onClick={onCancel} className="px-4 py-2.5 rounded-xl bg-surface-raised border border-white/10 text-slate-400 hover:text-white transition-all text-sm">
                  Cancel
                </button>
              )}
              <button type="button" onClick={goNext} className="flex-1 py-2.5 rounded-xl bg-hd/20 border border-hd/30 text-hd hover:bg-hd/30 transition-all flex items-center justify-center gap-2 text-sm font-medium">
                {step === 'custom' ? 'Review & Finish' : 'Continue'} <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
