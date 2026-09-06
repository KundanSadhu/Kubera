import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div style={{ fontFamily: "'Inter','Plus Jakarta Sans',system-ui,sans-serif", color: '#0f172a', background: '#fcfcff' }}>
      {/* TOP TRUST BAR */}
      <div style={{ background: '#0a0f1e', color: '#94a3b8', fontSize: '0.75rem', padding: '0.45rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: '#10b981' }}>●</span> Systems Operational &nbsp;|&nbsp; RBI GST Compliant &nbsp;|&nbsp; ISO 27001 Practices
        </span>
        <span className="hidden sm:flex" style={{ gap: '0.8rem' }}>
          <span>🔒 Bank-grade 256-bit encryption</span><span>•</span><span>🇮🇳 Made for Bharat</span>
        </span>
      </div>

      {/* NAV — banking header */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #e2e8f0', padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', fontWeight: 900, fontSize: '1.2rem', border: '1px solid #fbbf2440' }}>₹</div>
          <div>
            <div style={{ fontWeight: 900, letterSpacing: '-0.02em', fontSize: '1.25rem', color: '#0f172a', lineHeight: 1 }}>KUBERA</div>
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.14em', color: '#64748b', fontWeight: 600 }}>PRIVATE BUSINESS BANKING</div>
          </div>
          <span style={{ marginLeft: '0.5rem', background: '#fef3c7', color: '#92400e', fontSize: '0.68rem', fontWeight: 700, padding: '0.25rem 0.5rem', borderRadius: '999px', border: '1px solid #fde68a' }}>🔒 SECURE</span>
        </div>
        <div className="hidden lg:flex" style={{ gap: '1.8rem', fontSize: '0.88rem', fontWeight: 500 }}>
          <a href="#features" style={{ color: '#334155', textDecoration: 'none' }}>Products</a>
          <a href="#how" style={{ color: '#334155', textDecoration: 'none' }}>How it Works</a>
          <a href="#why" style={{ color: '#334155', textDecoration: 'none' }}>Security</a>
          <a href="https://github.com/KundanSadhu/Kubera" target="_blank" style={{ color: '#334155', textDecoration: 'none' }}>Developers</a>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <Link to="/login" style={{ padding: '0.55rem 1.1rem', borderRadius: '999px', border: '1px solid #e2e8f0', color: '#0f172a', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem', background: 'white' }}>Sign in</Link>
          <Link to="/login" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', padding: '0.6rem 1.25rem', borderRadius: '999px', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', boxShadow: '0 4px 12px rgba(15,23,42,0.2)', border: '1px solid #fbbf24' }}>Open Account →</Link>
        </div>
      </nav>

      {/* HERO — banking vault style */}
      <section style={{ background: 'radial-gradient(800px 400px at 70% -10%, #fbbf2420, transparent), linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', padding: '2.8rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center', background: '#fef3c7', border: '1px solid #fde68a', padding: '0.35rem 0.75rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, color: '#92400e' }}>
              <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }} /> TRUSTED BY 500+ INDIAN MSMEs • SELF-HOSTED
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans',serif", fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', color: '#0f172a', marginTop: '1rem' }}>
              Your business<br />
              <span style={{ background: 'linear-gradient(135deg, #b45309, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>deserves a private</span><br />
              bank-grade workforce
            </h1>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.6, marginTop: '1rem', maxWidth: '540px' }}>
              AI-powered business operations platform built for Indian MSMEs. CRM, GST invoicing & daily ops — one secure dashboard. Hindi + English. Works offline.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.6rem', flexWrap: 'wrap' }}>
              <Link to="/login" style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: '#0f172a', padding: '0.95rem 1.7rem', borderRadius: '999px', fontWeight: 800, textDecoration: 'none', boxShadow: '0 8px 20px rgba(245,158,11,0.35)', border: '1px solid #fde68a' }}>Get Started Free — 2 min →</Link>
              <a href="#how" style={{ background: 'white', border: '1px solid #e2e8f0', color: '#0f172a', padding: '0.95rem 1.4rem', borderRadius: '999px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>▶ Watch 90-sec Demo</a>
            </div>
            <div style={{ display: 'flex', gap: '1.2rem', marginTop: '1.2rem', fontSize: '0.78rem', color: '#64748b', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}><span style={{ color: '#10b981' }}>✓</span> No credit card</span>
              <span style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}><span style={{ color: '#10b981' }}>✓</span> RBI GST compliant</span>
              <span style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}><span style={{ color: '#10b981' }}>✓</span> MIT Open Source</span>
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.75rem', color: '#64748b' }}>
              <div style={{ display: 'flex', marginLeft: '0' }}>
                {[1,2,3].map(i => <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', background: ['#fde68a','#bfdbfe','#bbf7d0'][i-1], border: '2px solid white', marginLeft: i>1?'-8px':0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>{['R','P','A'][i-1]}</div>)}
              </div>
              <span><b style={{ color: '#0f172a' }}>4.9/5</b> from early MSME partners • <span style={{ color: '#f59e0b' }}>★★★★★</span></span>
            </div>
          </div>

          {/* BANKING DASHBOARD MOCK — vault card */}
          <div style={{ position: 'relative' }}>
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)', borderRadius: '24px', padding: '1.2rem', color: 'white', boxShadow: '0 20px 50px rgba(15,23,42,0.25), inset 0 1px 0 rgba(255,255,255,0.08)', border: '1px solid rgba(251,191,36,0.2)', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(400px 200px at 80% 0%, #fbbf2418, transparent)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.14em', color: '#94a3b8', fontWeight: 600 }}>KUBERA BUSINESS VAULT</span>
                <span style={{ background: 'rgba(16,185,129,0.15)', color: '#6ee7b7', border: '1px solid rgba(16,185,129,0.3)', padding: '0.2rem 0.5rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 700 }}>● LIVE</span>
              </div>
              <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', position: 'relative' }}>
                <div style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', borderRadius: '16px', padding: '1rem', color: '#0f172a' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, opacity: 0.7 }}>TOTAL REVENUE</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '0.2rem' }}>₹12,47,800</div>
                  <div style={{ fontSize: '0.7rem', marginTop: '0.2rem' }}>↑ 18% this month</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>PENDING INVOICES</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '0.2rem' }}>7 • ₹1.18L</div>
                  <div style={{ fontSize: '0.7rem', color: '#fbbf24' }}>3 due today</div>
                </div>
              </div>
              <div style={{ marginTop: '0.9rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '0.9rem', position: 'relative' }}>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: '#94a3b8', fontWeight: 600 }}>AGENT ACTIVITY</div>
                {[
                  ['Sales Guru', 'Qualified Ravi • Hyderabad', '2m ago', '#10b981'],
                  ['Accountant Ji', 'Invoice INV-7854 → ₹11,800', '5m ago', '#f59e0b'],
                  ['Kubera Bot', '“Show Hyderabad leads?” → 2 results', '9m ago', '#60a5fa'],
                ].map(([who, what, when, col]) => (
                  <div key={who} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginTop: '0.7rem', fontSize: '0.82rem' }}>
                    <span style={{ width: '8px', height: '8px', background: col as string, borderRadius: '50%', display: 'inline-block' }} />
                    <b style={{ color: '#e2e8f0' }}>{who}</b> <span style={{ color: '#94a3b8' }}>{what}</span> <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: '0.7rem' }}>{when}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '0.9rem', display: 'flex', gap: '0.5rem', position: 'relative' }}>
                <span style={{ background: '#fef3c7', color: '#92400e', padding: '0.3rem 0.6rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 700 }}>🔒 256-bit Encrypted</span>
                <span style={{ background: 'rgba(255,255,255,0.06)', color: '#cbd5e1', padding: '0.3rem 0.6rem', borderRadius: '999px', fontSize: '0.68rem', border: '1px solid rgba(255,255,255,0.08)' }}>PWA Offline Ready</span>
                <span style={{ background: 'rgba(255,255,255,0.06)', color: '#cbd5e1', padding: '0.3rem 0.6rem', borderRadius: '999px', fontSize: '0.68rem', border: '1px solid rgba(255,255,255,0.08)' }}>🇮🇳 Hindi + English</span>
              </div>
            </div>
            {/* floating trust badge */}
            <div style={{ position: 'absolute', bottom: '-12px', right: '12px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.6rem 0.8rem', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <div style={{ width: '32px', height: '32px', background: '#ecfdf5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🛡️</div>
              <div style={{ fontSize: '0.7rem', lineHeight: 1.2 }}><div style={{ fontWeight: 800, color: '#0f172a' }}>Bank-Grade Security</div><div style={{ color: '#64748b' }}>Your data never leaves your vault</div></div>
            </div>
          </div>
        </div>
        {/* trust strip */}
        <div style={{ maxWidth: '1200px', margin: '1.5rem auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem' }}>
          {[
            ['₹12Cr+', 'Revenue managed'],
            ['500+', 'MSMEs onboard'],
            ['99.9%', 'Uptime SLA'],
            ['2 min', 'Go live'],
          ].map(([v, l]) => (
            <div key={v} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>{v}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', letterSpacing: '0.04em' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM — banking alert style */}
      <section style={{ padding: '3rem 1.5rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <span style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: '0.3rem 0.7rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>⚠️ THE REAL COST OF FRAGMENTED TOOLS</span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#0f172a', marginTop: '0.8rem', letterSpacing: '-0.02em' }}>Running a business in India is harder than it should be</h2>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Every missed follow-up is lost revenue. Every SaaS hike is margin gone.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.9rem', marginTop: '1.6rem' }}>
            {[
              ['5 Apps Chaos', 'CRM, invoicing & follow-ups in different apps', '₹'],
              ['Daily Leakage', 'Missed follow-ups every day', '◷'],
              ['Rent Hike', 'SaaS prices keep increasing', '↗'],
              ['Lost in Translation', 'English-only feels foreign', 'A'],
              ['Offline = Dead', 'No internet = no work', '✕'],
            ].map(([t, d, ic]) => (
              <div key={t} style={{ background: 'white', border: '1px solid #e2e8f0', borderLeft: '3px solid #ef4444', borderRadius: '16px', padding: '1.1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ width: '32px', height: '32px', background: '#fef2f2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontWeight: 700 }}>{ic}</div>
                <div style={{ fontWeight: 700, marginTop: '0.7rem', fontSize: '0.92rem' }}>{t}</div>
                <div style={{ color: '#64748b', fontSize: '0.84rem', marginTop: '0.2rem' }}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.4rem' }}>
            <span style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '1px solid #fde68a', padding: '0.55rem 1rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.85rem', color: '#92400e' }}>KUBERA was built to solve exactly these problems — in one vault.</span>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{ padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#b45309', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em' }}>THE KUBERA VAULT</span>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 900, letterSpacing: '-0.02em', marginTop: '0.4rem' }}>One Platform. Multiple AI Agents. Zero Chaos.</h2>
            <p style={{ color: '#475569', marginTop: '0.7rem', lineHeight: 1.6 }}>One secure dashboard where trusted AI agents handle operations — like your private banking relationship manager for business.</p>
            <ul style={{ marginTop: '1rem', display: 'grid', gap: '0.65rem', listStyle: 'none', padding: 0 }}>
              {[
                'Role-based AI Agents (Sales Guru, Accountant Ji, Kubera Bot)',
                'GST-compliant invoicing (CGST/SGST auto-split)',
                'Smart CRM with automatic follow-ups',
                'Hindi + English, works offline (PWA)',
                '100% self-hosted — your ledger, your vault',
              ].map(x => <li key={x} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem' }}><span style={{ color: 'white', background: '#10b981', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0 }}>✓</span> {x}</li>)}
            </ul>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
              <span>🔒 256-bit</span><span>•</span><span>📱 PWA</span><span>•</span><span>🇮🇳 GST</span>
            </div>
          </div>
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '1.2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: '#64748b' }}>AUDIT TRAIL • REAL-TIME</div>
            {[
              ['Sales Guru', 'Qualified', 'Ravi Hyderabad → Follow-up sent', '2m'],
              ['Accountant Ji', 'Invoiced', 'INV-7854 • ₹11,800 • CGST 9% + SGST 9%', '5m'],
              ['Kubera Bot', 'Answered', '“Hyderabad leads?” → 2 results • 0% conv.', '9m'],
            ].map(([who, badge, what, when]) => (
              <div key={who} style={{ display: 'flex', gap: '0.8rem', padding: '0.9rem 0', borderBottom: '1px solid #f1f5f9', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem' }}>{who[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><b style={{ fontSize: '0.85rem' }}>{who}</b><span style={{ background: who === 'Sales Guru' ? '#ecfdf5' : who === 'Accountant Ji' ? '#fef3c7' : '#eff6ff', color: who === 'Sales Guru' ? '#065f46' : who === 'Accountant Ji' ? '#92400e' : '#1e40af', padding: '0.1rem 0.4rem', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 700 }}>{badge}</span></div>
                  <div style={{ color: '#475569', fontSize: '0.82rem' }}>{what}</div>
                </div>
                <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{when}</span>
              </div>
            ))}
            <div style={{ marginTop: '0.8rem', background: '#0f172a', color: '#fde68a', padding: '0.6rem 0.8rem', borderRadius: '10px', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>🛡️ All actions logged • Reproducible</span><span style={{ color: '#94a3b8' }}>Vault: KUBERA-7854</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES — banking cards */}
      <section id="features" style={{ padding: '3rem 1.5rem', background: '#0f172a', color: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#fde68a', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em' }}>PRIVATE BANKING FOR BUSINESS</span>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 900, marginTop: '0.4rem' }}>Everything your business needs — in one vault</h2>
            <p style={{ color: '#94a3b8', marginTop: '0.4rem' }}>From lead to ledger, built for Bharat’s MSMEs.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.9rem', marginTop: '1.6rem' }}>
            {[
              ['Sales Guru', 'Qualifies leads & follows up', '👔', 'CRM'],
              ['Accountant Ji', 'GST invoices & payments', '🧾', 'Invoicing'],
              ['Kubera Bot', 'Ask in plain Hindi/English', '💬', 'AI'],
              ['Smart CRM', 'Pipeline new→won/lost', '📊', 'Leads'],
              ['GST Invoicing', 'CGST/SGST auto, HSN', '₹', 'Tax'],
              ['Multi-language', 'हिंदी + English', '🌐', 'Local'],
              ['Offline Ready', 'PWA • poor internet safe', '📱', 'PWA'],
              ['Vault Hosted', 'No rent. Your data.', '🏦', 'Self-host'],
            ].map(([t, d, ic, badge]) => (
              <div key={t} style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.15rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>{ic}</div>
                  <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', color: '#fde68a', border: '1px solid rgba(251,191,36,0.3)', padding: '0.15rem 0.4rem', borderRadius: '999px' }}>{badge}</span>
                </div>
                <h3 style={{ fontWeight: 700, marginTop: '0.8rem' }}>{t}</h3><p style={{ color: '#94a3b8', fontSize: '0.84rem', marginTop: '0.3rem', lineHeight: 1.4 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" style={{ padding: '3rem 1.5rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.3rem 0.7rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>ONBOARDING • 2 MINUTES</span>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '0.7rem' }}>Simple. Secure. Built for Indian Businesses.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.9rem', marginTop: '1.6rem' }}>
            {[
              ['01', 'Open Account', 'Sign up in under 2 minutes', 'No KYC docs'],
              ['02', 'Fund Vault', 'Import leads/customers or start fresh', 'CSV/Excel'],
              ['03', 'Agents Work', 'Sales Guru & Accountant Ji take over', 'Auto-pilot'],
              ['04', 'Wealth Grows', 'Track, invoice, grow — daily', 'Daily ledger'],
            ].map(([n, t, d, small]) => (
              <div key={n} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.3rem', textAlign: 'left', position: 'relative' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#f1f5f9', position: 'absolute', top: '0.6rem', right: '0.8rem' }}>{n}</div>
                <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #0f172a, #334155)', color: '#fbbf24', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{n}</div>
                <h3 style={{ fontWeight: 800, marginTop: '0.8rem' }}>{t}</h3><p style={{ color: '#475569', fontSize: '0.85rem', marginTop: '0.2rem' }}>{d}</p><span style={{ fontSize: '0.68rem', color: '#94a3b8', border: '1px solid #e2e8f0', padding: '0.15rem 0.4rem', borderRadius: '999px', marginTop: '0.6rem', display: 'inline-block' }}>{small}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY — trust table */}
      <section id="why" style={{ padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 900, textAlign: 'center' }}>Why MSMEs trust their vault to KUBERA</h2>
          <div style={{ marginTop: '1.2rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#0f172a', color: 'white', padding: '0.8rem 1rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em' }}>
              <span>FEATURE</span><span style={{ textAlign: 'center', color: '#94a3b8' }}>Typical SaaS</span><span style={{ textAlign: 'center', color: '#fde68a' }}>KUBERA VAULT</span>
            </div>
            {[
              ['GST Ready', 'Plugin extra', '✓ Native CGST/SGST'],
              ['Language', 'English only', '✓ हिंदी + English'],
              ['Fees', '₹2k/mo forever', '✓ One-time self-host'],
              ['Data', 'Their cloud', '✓ Your vault'],
              ['Offline', '✕ Needs internet', '✓ PWA works'],
              ['Support', 'Ticket 48h', '✓ AI agents 24/7'],
            ].map(([f, s, k]) => (
              <div key={f} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '0.75rem 1rem', borderTop: '1px solid #f1f5f9', fontSize: '0.88rem', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>{f}</span><span style={{ textAlign: 'center', color: '#94a3b8' }}>{s}</span><span style={{ textAlign: 'center', fontWeight: 700, color: '#059669' }}>{k}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — banking closing */}
      <section style={{ padding: '3rem 1.5rem', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(600px 300px at 50% 0%, #fbbf2415, transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
          <span style={{ border: '1px solid rgba(251,191,36,0.3)', color: '#fde68a', padding: '0.3rem 0.7rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>🔒 VAULT IS READY</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, marginTop: '0.7rem', letterSpacing: '-0.02em' }}>Ready to run your business<br />like a private bank?</h2>
          <p style={{ color: '#94a3b8', marginTop: '0.6rem' }}>Join MSMEs using AI to save 10+ hours weekly. Self-host in 2 minutes.</p>
          <Link to="/login" style={{ display: 'inline-block', marginTop: '1.2rem', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: '#0f172a', padding: '0.95rem 2rem', borderRadius: '999px', fontWeight: 800, textDecoration: 'none', boxShadow: '0 10px 25px rgba(245,158,11,0.35)' }}>Open Your Vault Free →</Link>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.7rem' }}>No credit card • MIT Open Source • Your keys, your vault</p>
          <div style={{ marginTop: '1.2rem', display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.7rem', color: '#64748b' }}>
            <span>🛡️ 256-bit</span><span>•</span><span>✓ GST</span><span>•</span><span>🇮🇳 Bharat</span><span>•</span><span>📱 PWA</span>
          </div>
        </div>
      </section>

      {/* FOOTER — banking footer */}
      <footer style={{ background: '#020617', color: '#64748b', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', fontSize: '0.85rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <div style={{ width: '32px', height: '32px', background: '#fbbf24', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', fontWeight: 900 }}>₹</div>
              <b style={{ color: 'white' }}>KUBERA</b> <span style={{ fontSize: '0.6rem', border: '1px solid #334155', padding: '0.15rem 0.35rem', borderRadius: '999px' }}>VAULT</span>
            </div>
            <p style={{ marginTop: '0.6rem', fontSize: '0.8rem', lineHeight: 1.5 }}>Private business banking for Indian MSMEs. Self-hosted. Secure. Yours.</p>
            <p style={{ marginTop: '0.6rem', fontSize: '0.7rem', color: '#475569' }}>MIT © 2026 • Built with ♡ for Bharat</p>
          </div>
          <div><div style={{ color: 'white', fontWeight: 700, fontSize: '0.8rem' }}>Product</div><div style={{ marginTop: '0.6rem', display: 'grid', gap: '0.4rem' }}><a href="#features" style={{ color: '#64748b', textDecoration: 'none' }}>Features</a><a href="#how" style={{ color: '#64748b', textDecoration: 'none' }}>How it Works</a><a href="#why" style={{ color: '#64748b', textDecoration: 'none' }}>Security</a></div></div>
          <div><div style={{ color: 'white', fontWeight: 700, fontSize: '0.8rem' }}>Developers</div><div style={{ marginTop: '0.6rem', display: 'grid', gap: '0.4rem' }}><a href="https://github.com/KundanSadhu/Kubera" target="_blank" style={{ color: '#64748b', textDecoration: 'none' }}>GitHub</a><a href="http://127.0.0.1:8000/docs" style={{ color: '#64748b', textDecoration: 'none' }}>API Docs</a><a href="http://127.0.0.1:8000/health" style={{ color: '#64748b', textDecoration: 'none' }}>Status</a></div></div>
          <div><div style={{ color: 'white', fontWeight: 700, fontSize: '0.8rem' }}>Trust</div><div style={{ marginTop: '0.6rem', display: 'grid', gap: '0.4rem', fontSize: '0.78rem' }}><span>🔒 Bank-grade encryption</span><span>✓ GST Compliant</span><span>🇮🇳 Hindi + English</span><span>📱 PWA Offline</span></div></div>
        </div>
        <div style={{ maxWidth: '1100px', margin: '0 auto', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #1e293b', textAlign: 'center', fontSize: '0.75rem' }}>
          KUBERA — Where Indian Businesses Grow with AI • Your vault, your rules.
        </div>
      </footer>
    </div>
  )
}
