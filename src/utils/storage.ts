import type { UserProfile } from '../types'

const KEY = 'inner-atlas-profile'

export const loadProfile = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const saveProfile = (profile: UserProfile): void => {
  localStorage.setItem(KEY, JSON.stringify(profile))
}

export const clearProfile = (): void => {
  localStorage.removeItem(KEY)
}
