import { create } from 'zustand'

type AuthState = {
  token: string | null
  user: any | null
  setAuth: (token: string, user: any) => void
  logout: () => void
}

function safeParse(key: string) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null } catch { localStorage.removeItem(key); return null }
}
export const useAuth = create<AuthState>((set) => ({
  token: (()=>{ try{ return localStorage.getItem('kubera_token')}catch{return null}})(),
  user: safeParse('kubera_user'),
  setAuth: (token, user) => {
    try { localStorage.setItem('kubera_token', token); localStorage.setItem('kubera_user', JSON.stringify(user)) } catch {}
    set({ token, user })
  },
  logout: () => {
    try { localStorage.removeItem('kubera_token'); localStorage.removeItem('kubera_user') } catch {}
    set({ token: null, user: null })
  }
}))
