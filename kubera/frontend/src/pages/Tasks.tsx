import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([])
  const [form, setForm] = useState({ title:'', description:'' })
  async function load(){ const {data}=await api.get('/api/tasks'); setTasks(data) }
  useEffect(()=>{ load() }, [])
  async function create(e: React.FormEvent){ e.preventDefault(); await api.post('/api/tasks', form); setForm({title:'',description:''}); load() }
  async function updateStatus(id:string, status:string){ await api.put(`/api/tasks/${id}/status`,{status}); load() }
  async function submitReview(id:string){ await api.post(`/api/tasks/${id}/submit-review`,{summary:'Ready for review'}); load() }
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Tasks</h1>
      <form onSubmit={create} className="flex gap-2 mb-4">
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="border p-2 rounded flex-1" required/>
        <input placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="border p-2 rounded flex-1"/>
        <button className="bg-amber-500 px-4 py-1 rounded">Create</button>
      </form>
      <div className="space-y-2">
        {tasks.map(t=>(
          <div key={t.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <div><p className="font-medium">{t.title}</p><p className="text-xs text-slate-500">{t.description} • {t.status}</p></div>
            <div className="flex gap-1">
              {t.status==='pending' && <button onClick={()=>updateStatus(t.id,'in_progress')} className="text-xs bg-blue-100 px-2 py-1 rounded">Start</button>}
              {t.status==='in_progress' && <button onClick={()=>submitReview(t.id)} className="text-xs bg-amber-100 px-2 py-1 rounded">Submit Review</button>}
              {t.status==='review' && <><button onClick={()=>updateStatus(t.id,'completed')} className="text-xs bg-green-100 px-2 py-1 rounded">Approve</button><button onClick={()=>updateStatus(t.id,'in_progress')} className="text-xs bg-red-100 px-2 py-1 rounded">Reject</button></>}
              <button onClick={()=>updateStatus(t.id,'cancelled')} className="text-xs border px-2 py-1 rounded">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
