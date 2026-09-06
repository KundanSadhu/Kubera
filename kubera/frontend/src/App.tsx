import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from './store/auth'
import { useTranslation } from 'react-i18next'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CRM from './pages/CRM'
import Invoices from './pages/Invoices'
import Agents from './pages/Agents'
import Tasks from './pages/Tasks'

function Protected({ children }: { children: React.ReactNode }) {
  const token = useAuth((s) => s.token)
  if (!token) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  const { t, i18n } = useTranslation()
  const { token, logout } = useAuth()
  const nav = useNavigate()
  return (
    <div className="min-h-screen">
      {token && (
        <nav className="bg-slate-900 text-white px-6 py-3 flex items-center gap-6">
          <span className="font-bold text-amber-400 text-xl">🏛️ KUBERA</span>
          <Link to="/dashboard" className="hover:text-amber-300">{t('dashboard')}</Link>
          <Link to="/crm" className="hover:text-amber-300">{t('crm')}</Link>
          <Link to="/invoices" className="hover:text-amber-300">{t('invoices')}</Link>
          <Link to="/agents" className="hover:text-amber-300">{t('agents')}</Link>
          <Link to="/tasks" className="hover:text-amber-300">{t('tasks')}</Link>
          <div className="ml-auto flex gap-3">
            <button onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en')} className="border px-2 py-1 rounded text-sm">{i18n.language === 'en' ? 'हिंदी' : 'EN'}</button>
            <button onClick={() => { logout(); nav('/login') }} className="bg-amber-500 px-3 py-1 rounded text-slate-900">{t('logout')}</button>
          </div>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/crm" element={<Protected><CRM /></Protected>} />
        <Route path="/invoices" element={<Protected><Invoices /></Protected>} />
        <Route path="/agents" element={<Protected><Agents /></Protected>} />
        <Route path="/tasks" element={<Protected><Tasks /></Protected>} />
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/"} replace />} />
      </Routes>
    </div>
  )
}
