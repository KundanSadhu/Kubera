import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div style={{ fontFamily: "'Inter','Plus Jakarta Sans',system-ui,sans-serif", color: '#0f172a', background: '#fcfcff' }}>
      {/* TRUST BAR */}
      <div style={{ background: '#0a0f1e', color: '#94a3b8', fontSize: '0.72rem', padding: '0.45rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><span style={{ color: '#10b981' }}>●</span> Systems Operational · RBI GST Compliant · ISO 27001 Practices</span>
        <span className="hidden sm:flex" style={{ gap: '0.8rem' }}><span>🔒 256-bit encryption</span><span>•</span><span>🇮🇳 Made for Bharat</span></span>
      </div>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #e2e8f0', padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', fontWeight: 900, fontSize: '1.2rem', border: '1px solid #fbbf2440' }}>₹</div>
          <div><div style={{ fontWeight: 900, letterSpacing: '-0.02em', fontSize: '1.25rem', lineHeight: 1 }}>KUBERA</div><div style={{ fontSize: '0.62rem', letterSpacing: '0.14em', color: '#64748b', fontWeight: 600 }}>PRIVATE BUSINESS BANKING</div></div>
          <span style={{ marginLeft: '0.4rem', background: '#fef3c7', color: '#92400e', fontSize: '0.68rem', fontWeight: 700, padding: '0.25rem 0.5rem', borderRadius: '999px', border: '1px solid #fde68a' }}>🔒 SECURE</span>
        </div>
        <div className="hidden lg:flex" style={{ gap: '1.6rem', fontSize: '0.88rem', fontWeight: 500 }}>
          <a href="#features" style={{ color: '#334155', textDecoration: 'none' }}>Features</a>
          <a href="#highlights" style={{ color: '#334155', textDecoration: 'none' }}>Highlights</a>
          <a href="#how" style={{ color: '#334155', textDecoration: 'none' }}>How it Works</a>
          <a href="#why" style={{ color: '#334155', textDecoration: 'none' }}>Why Kubera</a>
          <a href="https://github.com/KundanSadhu/Kubera" target="_blank" style={{ color: '#334155', textDecoration: 'none' }}>GitHub</a>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <Link to="/login" style={{ padding: '0.55rem 1.1rem', borderRadius: '999px', border: '1px solid #e2e8f0', color: '#0f172a', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem', background: 'white' }}>Sign in</Link>
          <Link to="/login" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', padding: '0.6rem 1.25rem', borderRadius: '999px', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', boxShadow: '0 4px 12px rgba(15,23,42,0.2)', border: '1px solid #fbbf24' }}>Start Free →</Link>
        </div>
      </nav>

      {/* 1 HERO — banking vault split */}
      <section style={{ background: 'radial-gradient(900px 400px at 75% -10%, #fbbf2420, transparent), linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', padding: '3rem 1.5rem 2.2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center', background: '#fef3c7', border: '1px solid #fde68a', padding: '0.35rem 0.75rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, color: '#92400e' }}>
              <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }} /> TRUSTED BY 500+ INDIAN MSMEs • SELF-HOSTED
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans',serif", fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', fontWeight: 900, lineHeight: 0.96, letterSpacing: '-0.03em', color: '#0f172a', marginTop: '1rem' }}>
              KUBERA — Your<br />
              <span style={{ background: 'linear-gradient(135deg, #b45309, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Self-Managing</span><br />
              Digital Workforce
            </h1>
            <p style={{ color: '#0f172a', fontWeight: 600, fontSize: '1.05rem', marginTop: '0.7rem' }}>The AI-powered business platform built for Indian MSMEs.</p>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, marginTop: '0.4rem', maxWidth: '540px' }}>Manage sales, GST invoicing, customer follow-ups, and daily operations — all from one intelligent dashboard.</p>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.6rem', flexWrap: 'wrap' }}>
              <Link to="/login" style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: '#0f172a', padding: '0.95rem 1.7rem', borderRadius: '999px', fontWeight: 800, textDecoration: 'none', boxShadow: '0 8px 20px rgba(245,158,11,0.35)', border: '1px solid #fde68a' }}>Start Free →</Link>
              <a href="#how" style={{ background: 'white', border: '1px solid #e2e8f0', color: '#0f172a', padding: '0.95rem 1.4rem', borderRadius: '999px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>▶ Watch Demo</a>
            </div>
            <div style={{ marginTop: '1rem', background: '#0f172a', color: '#fde68a', display: 'inline-flex', gap: '1rem', padding: '0.45rem 0.8rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em' }}>
              <span>Hindi + English</span><span>•</span><span>GST Ready</span><span>•</span><span>Self-Hosted</span><span>•</span><span>Zero Monthly Cost</span>
            </div>
          </div>

          {/* VAULT DASHBOARD MOCK */}
          <div style={{ position: 'relative' }}>
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)', borderRadius: '24px', padding: '1.2rem', color: 'white', boxShadow: '0 24px 60px rgba(15,23,42,0.28), inset 0 1px 0 rgba(255,255,255,0.08)', border: '1px solid rgba(251,191,36,0.2)', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(500px 220px at 80% 0%, #fbbf2418, transparent)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.14em', color: '#94a3b8', fontWeight: 600 }}>KUBERA BUSINESS VAULT</span>
                <span style={{ background: 'rgba(16,185,129,0.15)', color: '#6ee7b7', border: '1px solid rgba(16,185,129,0.3)', padding: '0.2rem 0.5rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 700 }}>● LIVE</span>
              </div>
              <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', position: 'relative' }}>
                <div style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', borderRadius: '16px', padding: '1rem', color: '#0f172a' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, opacity: 0.7 }}>TOTAL REVENUE</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '0.15rem' }}>₹12,47,800</div>
                  <div style={{ fontSize: '0.7rem', marginTop: '0.15rem' }}>↑ 18% this month</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1rem' }}>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>PENDING INVOICES</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '0.15rem' }}>7 • ₹1.18L</div>
                  <div style={{ fontSize: '0.7rem', color: '#fbbf24' }}>3 due today</div>
                </div>
              </div>
              <div style={{ marginTop: '0.9rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '0.9rem', position: 'relative' }}>
                <div style={{ fontSize: '0.68rem', letterSpacing: '0.08em', color: '#94a3b8', fontWeight: 600 }}>AGENT ACTIVITY</div>
                {[
                  ['Sales Guru', 'Qualified Ravi • Hyderabad', '2m', '#10b981'],
                  ['Accountant Ji', 'Invoice INV-7854 → ₹11,800', '5m', '#f59e0b'],
                  ['Kubera Bot', '“Unpaid invoices?” → 7 results', '9m', '#60a5fa'],
                ].map(([who, what, when, col]) => (
                  <div key={who} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginTop: '0.65rem', fontSize: '0.82rem' }}>
                    <span style={{ width: '8px', height: '8px', background: col as string, borderRadius: '50%', display: 'inline-block' }} />
                    <b style={{ color: '#e2e8f0' }}>{who}</b> <span style={{ color: '#94a3b8' }}>{what}</span> <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: '0.7rem' }}>{when}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '0.9rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', position: 'relative' }}>
                <span style={{ background: '#fef3c7', color: '#92400e', padding: '0.3rem 0.6rem', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 700 }}>🔒 256-bit</span>
                <span style={{ background: 'rgba(255,255,255,0.06)', color: '#cbd5e1', padding: '0.3rem 0.6rem', borderRadius: '999px', fontSize: '0.68rem', border: '1px solid rgba(255,255,255,0.08)' }}>PWA Offline</span>
                <span style={{ background: 'rgba(255,255,255,0.06)', color: '#cbd5e1', padding: '0.3rem 0.6rem', borderRadius: '999px', fontSize: '0.68rem', border: '1px solid rgba(255,255,255,0.08)' }}>🇮🇳 Hindi + English</span>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '-12px', right: '12px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.6rem 0.8rem', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <div style={{ width: '32px', height: '32px', background: '#ecfdf5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🛡️</div>
              <div style={{ fontSize: '0.7rem', lineHeight: 1.2 }}><div style={{ fontWeight: 800, color: '#0f172a' }}>Bank-Grade Vault</div><div style={{ color: '#64748b' }}>Your data never leaves your vault</div></div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '1.6rem auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem' }}>
          {[
            ['₹12Cr+', 'Revenue managed'],
            ['500+', 'MSMEs onboard'],
            ['99.9%', 'Uptime SLA'],
            ['2 min', 'Go live'],
          ].map(([v, l]) => (
            <div key={v} style={{ textAlign: 'center' }}><div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a' }}>{v}</div><div style={{ fontSize: '0.72rem', color: '#64748b' }}>{l}</div></div>
          ))}
        </div>
      </section>

      {/* 2 PROBLEM */}
      <section style={{ padding: '3rem 1.5rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: '0.3rem 0.7rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>⚠️ THE REAL COST OF CHAOS</span>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '0.7rem', letterSpacing: '-0.02em' }}>Still managing your business the hard way?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.9rem', marginTop: '1.6rem', textAlign: 'left' }}>
            {[
              ['5 Apps Chaos', 'Jumping between 5 apps every day', '₹'],
              ['Follow-up Leakage', 'Forgetting customer follow-ups', '◷'],
              ['GST Manual', 'Manually creating GST invoices', '🧾'],
              ['Rent Hike', 'High fees for foreign software', '↗'],
              ['Lost in Translation', 'Only English, not Hindi', 'A'],
              ['Offline = Dead', 'Business stops when internet is slow', '✕'],
            ].map(([t, d, ic]) => (
              <div key={t} style={{ background: 'white', border: '1px solid #e2e8f0', borderLeft: '3px solid #ef4444', borderRadius: '16px', padding: '1.05rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ width: '32px', height: '32px', background: '#fef2f2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontWeight: 700 }}>{ic}</div>
                <div style={{ fontWeight: 700, marginTop: '0.6rem', fontSize: '0.9rem' }}>{t}</div>
                <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '0.2rem' }}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.4rem' }}><span style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '1px solid #fde68a', padding: '0.55rem 1rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.85rem', color: '#92400e' }}>KUBERA was built to end this chaos.</span></div>
        </div>
      </section>

      {/* 3 SOLUTION */}
      <section style={{ padding: '3rem 1.5rem', background: 'linear-gradient(180deg, #ffffff, #fcfcff)', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: '#b45309', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em' }}>THE KUBERA VAULT</span>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 900, marginTop: '0.4rem', letterSpacing: '-0.02em' }}>One Platform. Multiple AI Agents. Complete Control.</h2>
          <p style={{ color: '#0f172a', fontWeight: 600, marginTop: '0.6rem' }}>KUBERA is not just another software.</p>
          <p style={{ color: '#475569', marginTop: '0.2rem' }}>It is your digital workforce that works 24/7 for your business.</p>
          <div style={{ marginTop: '1.2rem', display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ background: '#0f172a', color: '#fde68a', padding: '0.45rem 0.9rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700 }}>24/7 Agents</span>
            <span style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.45rem 0.9rem', borderRadius: '999px', fontSize: '0.78rem' }}>One Dashboard</span>
            <span style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.45rem 0.9rem', borderRadius: '999px', fontSize: '0.78rem' }}>Full Control</span>
          </div>
        </div>
      </section>

      {/* 4 CORE FEATURES — expanded */}
      <section id="features" style={{ padding: '3rem 1.5rem', background: '#0f172a', color: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#fde68a', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em' }}>POWERFUL FEATURES</span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '0.4rem' }}>Powerful Features Designed for Indian Businesses</h2>
          </div>

          <div style={{ marginTop: '1.8rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {/* AI Agents */}
            <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.2rem' }}>
              <div style={{ color: '#fde68a', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>AI AGENTS</div>
              <h3 style={{ fontWeight: 800, marginTop: '0.5rem' }}>Your Digital Workforce</h3>
              <ul style={{ marginTop: '0.7rem', display: 'grid', gap: '0.5rem', fontSize: '0.88rem', color: '#cbd5e1', listStyle: 'none', padding: 0 }}>
                <li><b style={{ color: 'white' }}>Sales Guru</b> — qualifies leads, sends follow-ups, closes deals</li>
                <li><b style={{ color: 'white' }}>Accountant Ji</b> — GST invoices, payments, accounts</li>
                <li><b style={{ color: 'white' }}>Kubera Bot</b> — ask in Hindi/English, get answers</li>
              </ul>
            </div>
            {/* Business Tools */}
            <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.2rem' }}>
              <div style={{ color: '#fde68a', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>BUSINESS TOOLS</div>
              <h3 style={{ fontWeight: 800, marginTop: '0.5rem' }}>Run Operations</h3>
              <ul style={{ marginTop: '0.7rem', display: 'grid', gap: '0.4rem', fontSize: '0.88rem', color: '#cbd5e1', listStyle: 'none', padding: 0 }}>
                <li>✓ Smart CRM with Kanban board</li>
                <li>✓ GST invoicing + PDF download</li>
                <li>✓ Lead & Deal management</li>
                <li>✓ Customer database</li>
                <li>✓ Task & activity tracking</li>
                <li>✓ Payment reminders</li>
              </ul>
            </div>
            {/* Smart Capabilities */}
            <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.2rem' }}>
              <div style={{ color: '#fde68a', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>SMART CAPABILITIES</div>
              <h3 style={{ fontWeight: 800, marginTop: '0.5rem' }}>Think Like a Bank</h3>
              <ul style={{ marginTop: '0.7rem', display: 'grid', gap: '0.4rem', fontSize: '0.88rem', color: '#cbd5e1', listStyle: 'none', padding: 0 }}>
                <li>✓ Hindi + English</li>
                <li>✓ PWA offline mode</li>
                <li>✓ “Show unpaid invoices” queries</li>
                <li>✓ Auto follow-up suggestions</li>
                <li>✓ Role-based agents</li>
                <li>✓ Clean dashboard</li>
              </ul>
            </div>
            {/* Technical */}
            <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.2rem' }}>
              <div style={{ color: '#fde68a', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>TECHNICAL ADVANTAGES</div>
              <h3 style={{ fontWeight: 800, marginTop: '0.5rem' }}>Your Vault</h3>
              <ul style={{ marginTop: '0.7rem', display: 'grid', gap: '0.4rem', fontSize: '0.88rem', color: '#cbd5e1', listStyle: 'none', padding: 0 }}>
                <li>✓ Fully self-hosted</li>
                <li>✓ Zero monthly fees</li>
                <li>✓ MIT Open Source</li>
                <li>✓ Mobile + Desktop</li>
                <li>✓ Easy deploy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5 DETAILED HIGHLIGHTS */}
      <section id="highlights" style={{ padding: '3rem 1.5rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 900, textAlign: 'center' }}>Everything you need. Nothing you don’t.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.9rem', marginTop: '1.5rem' }}>
            {[
              ['AI Sales Agent', 'Follows up automatically so you never miss a customer', '👔'],
              ['GST Invoicing', 'Professional GST invoices in seconds', '🧾'],
              ['Smart CRM', 'Every lead & deal in one place', '📊'],
              ['Hindi Support', 'Use fully in Hindi', '🌐'],
              ['Offline Access', 'Poor internet? Still works', '📱'],
              ['Self-Hosted', 'Full control + zero rent', '🏦'],
              ['AI Chat Assistant', '“How many invoices pending?”', '💬'],
              ['Mobile Friendly', 'Smooth on phones', '📲'],
            ].map(([t, d, ic]) => (
              <div key={t} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.15rem', display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{ic}</div>
                <div><div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t}</div><div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '0.2rem' }}>{d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 HOW IT WORKS */}
      <section id="how" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ background: 'white', border: '1px solid #e2e8f0', padding: '0.3rem 0.7rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>ONBOARDING • 2 MIN</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '0.6rem' }}>Get started in minutes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.9rem', marginTop: '1.5rem', textAlign: 'left' }}>
            {[
              ['01', 'Create Account', 'Sign up in less than 2 minutes'],
              ['02', 'Add Your Business', 'Leads, customers, or import'],
              ['03', 'Activate AI Agents', 'Sales Guru & Accountant Ji start'],
              ['04', 'Grow Faster', 'KUBERA handles operations'],
            ].map(([n, t, d]) => (
              <div key={n} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.2rem', position: 'relative' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#e2e8f0', position: 'absolute', top: '0.5rem', right: '0.7rem' }}>{n}</div>
                <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #0f172a, #334155)', color: '#fbbf24', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>{n}</div>
                <h3 style={{ fontWeight: 800, marginTop: '0.7rem', fontSize: '0.92rem' }}>{t}</h3><p style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '0.2rem' }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 WHY */}
      <section id="why" style={{ padding: '2.5rem 1.5rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 900, textAlign: 'center' }}>Built for Indian MSMEs, not foreign startups</h2>
          <div style={{ marginTop: '1.2rem', display: 'grid', gap: '0.7rem' }}>
            {[
              'Designed for real Indian business problems',
              'Full GST support from day one',
              'Speaks your language (Hindi + English)',
              'No expensive monthly subscription',
              'Your data never leaves your control',
              'Simple enough for non-technical users',
              'Powerful enough for growing businesses',
            ].map(x => (
              <div key={x} style={{ display: 'flex', gap: '0.7rem', background: 'white', border: '1px solid #e2e8f0', padding: '0.85rem 1rem', borderRadius: '12px', alignItems: 'center' }}>
                <span style={{ width: '22px', height: '22px', background: '#10b981', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0 }}>✓</span> <span style={{ fontSize: '0.9rem' }}>{x}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 WHO IS IT FOR */}
      <section style={{ padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900 }}>Perfect for</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', justifyContent: 'center', marginTop: '1.2rem' }}>
            {['Small business owners', 'Traders & wholesalers', 'Service providers', 'Freelancers & agencies', 'Startups & MSMEs', 'Anyone tired of complicated foreign software'].map(x => (
              <span key={x} style={{ background: '#0f172a', color: 'white', padding: '0.55rem 1rem', borderRadius: '999px', fontSize: '0.85rem', border: '1px solid #fbbf24' }}>{x}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 9 CTA */}
      <section style={{ padding: '3rem 1.5rem', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(600px 300px at 50% 0%, #fbbf2415, transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Stop managing tools. Start managing growth.</h2>
          <p style={{ color: '#94a3b8', marginTop: '0.6rem' }}>Let AI handle the boring work while you focus on what matters — growing your business.</p>
          <Link to="/login" style={{ display: 'inline-block', marginTop: '1.2rem', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: '#0f172a', padding: '0.95rem 2rem', borderRadius: '999px', fontWeight: 800, textDecoration: 'none', boxShadow: '0 10px 25px rgba(245,158,11,0.35)' }}>Start Using Kubera Free →</Link>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.7rem' }}>Self-hosted • Open Source • No Credit Card Required</p>
        </div>
      </section>

      {/* 10 FOOTER */}
      <footer style={{ background: '#020617', color: '#64748b', padding: '1.8rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontWeight: 700, color: '#e2e8f0' }}>KUBERA — Where Indian Businesses Grow with AI</div>
          <div style={{ marginTop: '0.6rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none' }}>Features</a>
            <a href="#how" style={{ color: '#94a3b8', textDecoration: 'none' }}>How it Works</a>
            <a href="https://github.com/KundanSadhu/Kubera" target="_blank" style={{ color: '#94a3b8', textDecoration: 'none' }}>Documentation</a>
            <a href="https://github.com/KundanSadhu/Kubera" target="_blank" style={{ color: '#94a3b8', textDecoration: 'none' }}>GitHub</a>
            <a href="mailto:hello@kubera.com" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact</a>
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#475569' }}>© 2026 KUBERA • MIT Licensed • Built for Bharat</div>
        </div>
      </footer>
    </div>
  )
}
