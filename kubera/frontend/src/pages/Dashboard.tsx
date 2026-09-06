import { useEffect, useState } from 'react'
import api from '../services/api'
import { useTranslation } from 'react-i18next'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function Dashboard() {
  const [data, setData] = useState<any>(null)
  const { t } = useTranslation()
  useEffect(() => { api.get('/api/analytics/dashboard').then(r=>setData(r.data)).catch(()=>setData({})) }, [])
  if (!data) return <div className="p-8">Loading…</div>
  const COLORS = ['#f59e0b', '#0f172a', '#10b981', '#ef4444', '#8b5cf6']
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">{t('welcome')}</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow"><p className="text-slate-500">{t('total_leads')}</p><p className="text-2xl font-bold">{data.total_leads ?? 0}</p></div>
        <div className="bg-white p-4 rounded shadow"><p className="text-slate-500">{t('total_revenue')}</p><p className="text-2xl font-bold">₹{data.total_revenue ?? 0}</p></div>
        <div className="bg-white p-4 rounded shadow"><p className="text-slate-500">{t('conversion_rate')}</p><p className="text-2xl font-bold">{data.conversion_rate ?? 0}%</p></div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.monthly_revenue || []}><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="revenue" fill="#f59e0b" /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Leads by Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart><Pie data={Object.entries(data.leads_by_status || {}).map(([name,value])=>({name,value}))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>{Object.entries(data.leads_by_status||{}).map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}</Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
