import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../store/auth'
import { useTranslation } from 'react-i18next'

export default function Login() {
  const [email, setEmail] = useState('admin@kubera.com')
  const [password, setPassword] = useState('kubera123')
  const [name, setName] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const setAuth = useAuth(s => s.setAuth)
  const nav = useNavigate()
  const { t } = useTranslation()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    setLoading(true)
    try {
      const url = isRegister ? '/api/auth/register' : '/api/auth/login'
      const payload: any = { email, password }
      if (isRegister) payload.name = name || email.split('@')[0]
      const { data } = await api.post(url, payload)
      setAuth(data.token, data.user)
      nav('/dashboard')
    } catch (e: any) {
      const msg = e.response?.data?.detail || e.message || 'Failed — check backend at http://127.0.0.1:8000/health'
      setErr(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)' }} className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', width: '100%', maxWidth: '420px' }} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-4">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center' }} className="text-2xl font-bold text-center">🏛️ KUBERA</h1>
        <p style={{ textAlign: 'center', color: '#64748b' }} className="text-center text-slate-500">{t('tagline') || 'Your Self-Managing Digital Workforce'}</p>
        {isRegister && <input placeholder={String(t('name') || 'Name')} value={name} onChange={e=>setName(e.target.value)} className="w-full border p-2 rounded" style={{ width: '100%', border: '1px solid #cbd5e1', padding: '0.5rem', borderRadius: '0.5rem' }} />}
        <input placeholder={String(t('email') || 'Email')} value={email} onChange={e=>setEmail(e.target.value)} className="w-full border p-2 rounded" style={{ width: '100%', border: '1px solid #cbd5e1', padding: '0.5rem', borderRadius: '0.5rem' }} />
        <input type="password" placeholder={String(t('password') || 'Password')} value={password} onChange={e=>setPassword(e.target.value)} className="w-full border p-2 rounded" style={{ width: '100%', border: '1px solid #cbd5e1', padding: '0.5rem', borderRadius: '0.5rem' }} />
        {err && <p className="text-red-500 text-sm" style={{ color: '#ef4444', fontSize: '0.875rem', background: '#fef2f2', padding: '0.5rem', borderRadius: '0.5rem' }}>{err}</p>}
        <button type="submit" disabled={loading} className="w-full bg-amber-500 text-slate-900 font-semibold py-2 rounded" style={{ width: '100%', background: loading ? '#fcd34d' : '#f59e0b', color: '#0f172a', fontWeight: 600, padding: '0.6rem', borderRadius: '0.5rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}>{loading ? 'Please wait…' : (isRegister ? String(t('register') || 'Register') : String(t('login') || 'Login'))}</button>
        <button type="button" onClick={()=>setIsRegister(!isRegister)} className="w-full text-sm text-slate-500" style={{ width: '100%', fontSize: '0.875rem', color: '#64748b', background: 'transparent', border: 'none', cursor: 'pointer' }}>{isRegister ? 'Have account? Login' : 'Need account? Register'}</button>
        <p className="text-xs text-center text-slate-400" style={{ fontSize: '0.75rem', textAlign: 'center', color: '#94a3b8' }}>Default: admin@kubera.com / kubera123</p>
        <p style={{ fontSize: '0.7rem', textAlign: 'center', color: '#94a3b8' }}>Backend: <a href="http://127.0.0.1:8000/health" target="_blank" style={{ color: '#f59e0b' }}>health</a> • <a href="http://127.0.0.1:8000/docs" target="_blank" style={{ color: '#f59e0b' }}>API docs</a></p>
      </form>
    </div>
  )
}
