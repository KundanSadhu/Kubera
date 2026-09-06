import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Invoices() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [form, setForm] = useState({ customer_name:'', customer_gstin:'', items:[{description:'',hsn_code:'',quantity:1,rate:0,gst_rate:18}] as any[] })
  async function load(){ const {data}=await api.get('/api/invoices'); setInvoices(data) }
  useEffect(()=>{ load() }, [])
  function addItem(){ setForm({...form, items:[...form.items,{description:'',hsn_code:'',quantity:1,rate:0,gst_rate:18}]}) }
  async function create(e: React.FormEvent){
    e.preventDefault()
    await api.post('/api/invoices', form)
    setForm({customer_name:'',customer_gstin:'',items:[{description:'',hsn_code:'',quantity:1,rate:0,gst_rate:18}]})
    load()
  }
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Invoices</h1>
      <form onSubmit={create} className="bg-white p-4 rounded shadow mb-6 space-y-3">
        <div className="flex gap-2">
          <input placeholder="Customer Name" value={form.customer_name} onChange={e=>setForm({...form,customer_name:e.target.value})} className="border p-2 rounded flex-1" required/>
          <input placeholder="GSTIN" value={form.customer_gstin} onChange={e=>setForm({...form,customer_gstin:e.target.value})} className="border p-2 rounded flex-1"/>
        </div>
        {form.items.map((it,idx)=>(
          <div key={idx} className="flex gap-2">
            <input placeholder="Description" value={it.description} onChange={e=>{ const a=[...form.items]; a[idx].description=e.target.value; setForm({...form,items:a})}} className="border p-1 rounded flex-1" required/>
            <input placeholder="HSN" value={it.hsn_code} onChange={e=>{ const a=[...form.items]; a[idx].hsn_code=e.target.value; setForm({...form,items:a})}} className="border p-1 rounded w-20"/>
            <input type="number" placeholder="Qty" value={it.quantity} onChange={e=>{ const a=[...form.items]; a[idx].quantity=Number(e.target.value); setForm({...form,items:a})}} className="border p-1 rounded w-16"/>
            <input type="number" placeholder="Rate" value={it.rate} onChange={e=>{ const a=[...form.items]; a[idx].rate=Number(e.target.value); setForm({...form,items:a})}} className="border p-1 rounded w-20"/>
            <select value={it.gst_rate} onChange={e=>{ const a=[...form.items]; a[idx].gst_rate=Number(e.target.value); setForm({...form,items:a})}} className="border p-1 rounded"><option value={5}>5%</option><option value={12}>12%</option><option value={18}>18%</option><option value={28}>28%</option></select>
          </div>
        ))}
        <div className="flex gap-2"><button type="button" onClick={addItem} className="border px-3 py-1 rounded">+ Item</button><button className="bg-amber-500 px-4 py-1 rounded font-semibold">Create Invoice</button></div>
      </form>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-white"><tr><th className="p-2 text-left">Invoice</th><th>Customer</th><th>Amount</th><th>GST</th><th>Total</th><th>PDF</th></tr></thead>
          <tbody>{invoices.map(inv=>(
            <tr key={inv.id} className="border-t"><td className="p-2">{inv.invoice_number}</td><td>{inv.customer_name}</td><td>₹{inv.amount}</td><td>₹{inv.gst_amount}</td><td className="font-bold">₹{inv.total}</td><td><a href={`http://localhost:8000/api/invoices/${inv.id}/pdf`} target="_blank" className="text-amber-600">PDF</a></td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
