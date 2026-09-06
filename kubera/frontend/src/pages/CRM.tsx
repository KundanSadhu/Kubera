import { useEffect, useState } from 'react'
import api from '../services/api'
import { useTranslation } from 'react-i18next'

export default function CRM() {
  const [leads, setLeads] = useState<any[]>([])
  const [form, setForm] = useState({ name:'', email:'', phone:'', source:'website' })
  const { t } = useTranslation()
  async function load(){ const {data}=await api.get('/api/crm/leads'); setLeads(data) }
  useEffect(()=>{ load() }, [])
  async function create(e: React.FormEvent){ e.preventDefault(); await api.post('/api/crm/leads', form); setForm({name:'',email:'',phone:'',source:'website'}); load() }
  async function updateStatus(id:string, status:string){ await api.put(`/api/crm/leads/${id}`,{status}); load() }
  const cols = ['new','contacted','qualified','won','lost']
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">{t('crm')}</h1>
      <form onSubmit={create} className="flex gap-2 mb-6 flex-wrap">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border p-2 rounded" required/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="border p-2 rounded"/>
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="border p-2 rounded"/>
        <input placeholder="Source" value={form.source} onChange={e=>setForm({...form,source:e.target.value})} className="border p-2 rounded"/>
        <button className="bg-amber-500 px-4 py-2 rounded font-semibold">{t('create_lead')}</button>
      </form>
      <div className="grid grid-cols-5 gap-3">
        {cols.map(col=>(
          <div key={col} className="bg-white rounded shadow p-3">
            <h3 className="font-semibold capitalize border-b pb-1 mb-2">{col} ({leads.filter(l=>l.status===col).length})</h3>
            <div className="space-y-2">
              {leads.filter(l=>l.status===col).map(l=>(
                <div key={l.id} className="border p-2 rounded text-sm">
                  <p className="font-medium">{l.name}</p><p className="text-xs text-slate-500">{l.phone} • {l.source}</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {cols.filter(c=>c!==col).map(c=><button key={c} onClick={()=>updateStatus(l.id,c)} className="text-xs bg-slate-100 px-1 rounded">→{c}</button>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
