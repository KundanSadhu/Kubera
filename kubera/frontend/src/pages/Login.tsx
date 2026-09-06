import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
  const [success, setSuccess] = useState('')
  const setAuth = useAuth(s => s.setAuth)
  const nav = useNavigate()
  const { t } = useTranslation()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr(''); setSuccess('')
    if (!email || !password) { setErr('Email and password required'); return }
    if (isRegister && !name.trim()) { setErr('Name required for signup'); return }
    setLoading(true)
    try {
      if (isRegister) {
        // Register then auto-login
        await api.post('/api/auth/register', { email, password, name: name || email.split('@')[0] })
        setSuccess('Account created! Logging you in…')
      }
      const { data } = await api.post('/api/auth/login', { email, password })
      setAuth(data.token, data.user)
      nav('/dashboard')
    } catch (e: any) {
      const msg = e.response?.data?.detail || e.message || 'Failed — check backend at http://127.0.0.1:8000/health'
      setErr(Array.isArray(msg) ? msg.map((m:any)=>m.msg||m).join('; ') : String(msg))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', padding: '1rem' }} className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', width: '100%', maxWidth: '420px' }} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-4">
        <Link to="/" style={{ display: 'block', textAlign: 'center', color: '#f59e0b', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>← Back to Home</Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center' }} className="text-2xl font-bold text-center">🏛️ KUBERA</h1>
        <p style={{ textAlign: 'center', color: '#64748b' }} className="text-center text-slate-500">{t('tagline') || 'Your Self-Managing Digital Workforce'}</p>
        {/* Toggle pills */}
        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '0.5rem', padding: '0.25rem', gap: '0.25rem' }}>
          <button type="button" onClick={()=>{setIsRegister(false); setErr(''); setSuccess('')}} style={{ flex: 1, padding: '0.5rem', borderRadius: '0.4rem', border: 'none', background: !isRegister ? 'white' : 'transparent', boxShadow: !isRegister ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', fontWeight: 600, cursor: 'pointer' }}>Login</button>
          <button type="button" onClick={()=>{setIsRegister(true); setErr(''); setSuccess('')}} style={{ flex: 1, padding: '0.5rem', borderRadius: '0.4rem', border: 'none', background: isRegister ? 'white' : 'transparent', boxShadow: isRegister ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', fontWeight: 600, cursor: 'pointer' }}>Sign Up</button>
        </div>
        {isRegister && <input placeholder={String(t('name') || 'Full Name')} value={name} onChange={e=>setName(e.target.value)} className="w-full border p-2 rounded" style={{ width: '100%', border: '1px solid #cbd5e1', padding: '0.5rem', borderRadius: '0.5rem' }} />}
        <input placeholder={String(t('email') || 'Email')} value={email} onChange={e=>setEmail(e.target.value)} className="w-full border p-2 rounded" style={{ width: '100%', border: '1px solid #cbd5e1', padding: '0.5rem', borderRadius: '0.5rem' }} />
        <input type="password" placeholder={String(t('password') || 'Password')} value={password} onChange={e=>setPassword(e.target.value)} className="w-full border p-2 rounded" style={{ width: '100%', border: '1px solid #cbd5e1', padding: '0.5rem', borderRadius: '0.5rem' }} />
        {err && <p className="text-red-500 text-sm" style={{ color: '#ef4444', fontSize: '0.875rem', background: '#fef2f2', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #fecaca' }}>{err}</p>}
        {success && <p style={{ color: '#059669', fontSize: '0.875rem', background: '#ecfdf5', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #a7f3d0' }}>{success}</p>}
        <button type="submit" disabled={loading} className="w-full bg-amber-500 text-slate-900 font-semibold py-2 rounded" style={{ width: '100%', background: loading ? '#fcd34d' : '#f59e0b', color: '#0f172a', fontWeight: 700, padding: '0.7rem', borderRadius: '0.5rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1rem' }}>{loading ? 'Please wait…' : (isRegister ? 'Create Account →' : 'Login →')}</button>
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>{isRegister ? 'Already have account?' : 'Need an account?'} <button type="button" onClick={()=>setIsRegister(!isRegister)} style={{ color: '#d97706', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>{isRegister ? 'Login' : 'Sign Up'}</button></p>
        <p className="text-xs text-center text-slate-400" style={{ fontSize: '0.75rem', textAlign: 'center', color: '#94a3b8', borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem' }}>Demo: <code style={{ background: '#f1f5f9', padding: '0.1rem 0.3rem', borderRadius: '0.2rem' }}>admin@kubera.com / kubera123</code></p>
        <p style={{ fontSize: '0.7rem', textAlign: 'center', color: '#94a3b8' }}>Backend: <a href="http://127.0.0.1:8000/health" target="_blank" style={{ color: '#f59e0b' }}>health</a> • <a href="http://127.0.0.1:8000/docs" target="_blank" style={{ color: '#f59e0b' }}>API docs</a> • <Link to="/" style={{ color: '#f59e0b' }}>Landing</Link></p>
      </form>
    </div>
  )
}
