import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Agents() {
  const [agents, setAgents] = useState<any[]>([])
  const [prompt, setPrompt] = useState('')
  const [responses, setResponses] = useState<Record<string,string>>({})
  async function load(){ const {data}=await api.get('/api/agents'); setAgents(data) }
  useEffect(()=>{ load() }, [])
  async function ask(id:string){
    const {data}=await api.post(`/api/agents/${id}/execute`,{prompt})
    setResponses({...responses,[id]:data.response})
  }
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Agents</h1>
      <div className="flex gap-2 mb-4"><input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Ask any agent..." className="border p-2 rounded flex-1"/><button onClick={()=>agents.forEach(a=>ask(a.id))} className="bg-amber-500 px-4 py-2 rounded">Ask All</button></div>
      <div className="grid grid-cols-3 gap-4">
        {agents.map(a=>(
          <div key={a.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{a.name}</h3><p className="text-xs text-slate-500">{a.role} • {a.status}</p>
            <button onClick={()=>ask(a.id)} className="mt-2 text-sm bg-slate-900 text-white px-3 py-1 rounded">Ask</button>
            {responses[a.id] && <p className="mt-2 text-sm bg-slate-50 p-2 rounded whitespace-pre-wrap">{responses[a.id]}</p>}
          </div>
        ))}
        {agents.length===0 && <p className="text-slate-500">No agents yet — run seed or create via API.</p>}
      </div>
    </div>
  )
}
