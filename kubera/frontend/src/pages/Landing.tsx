import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="bg-white text-slate-800" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b" style={{ position: 'sticky', top: 0, background: 'rgba(255,255,255,0.95)', borderBottom: '1px solid #e2e8f0', padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.3rem' }}>🏛️ KUBERA</span>
        <div className="hidden md:flex gap-6 text-sm" style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
          <a href="#features" style={{ color: '#475569', textDecoration: 'none' }}>Features</a>
          <a href="#how" style={{ color: '#475569', textDecoration: 'none' }}>How it Works</a>
          <a href="#why" style={{ color: '#475569', textDecoration: 'none' }}>Why Kubera</a>
          <a href="https://github.com/KundanSadhu/Kubera" target="_blank" style={{ color: '#475569', textDecoration: 'none' }}>Docs</a>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/login" style={{ border: '1px solid #0f172a', padding: '0.5rem 1rem', borderRadius: '0.5rem', color: '#0f172a', textDecoration: 'none', fontWeight: 600 }}>Login</Link>
          <Link to="/login" style={{ background: '#f59e0b', color: '#0f172a', padding: '0.5rem 1.2rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 700 }}>Get Started Free</Link>
        </div>
      </nav>

      {/* 1 HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #f59e0b 150%)', color: 'white', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ color: '#fde68a', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.85rem' }}>HINDI + ENGLISH | SELF-HOSTED | ZERO MONTHLY SAAS COST</p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, margin: '1rem 0' }}>KUBERA — Your Self-Managing Digital Workforce</h1>
          <p style={{ fontSize: '1.15rem', color: '#e2e8f0', maxWidth: '700px', margin: '0 auto' }}>AI-powered business operations platform built for Indian MSMEs. Manage CRM, GST Invoicing, and daily business tasks — all from one dashboard.</p>
          <div style={{ marginTop: '1.8rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login" style={{ background: '#f59e0b', color: '#0f172a', padding: '0.9rem 1.8rem', borderRadius: '0.7rem', fontWeight: 800, textDecoration: 'none' }}>Get Started Free →</Link>
            <a href="#how" style={{ border: '1px solid rgba(255,255,255,0.4)', color: 'white', padding: '0.9rem 1.6rem', borderRadius: '0.7rem', textDecoration: 'none', fontWeight: 600 }}>Watch Demo</a>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#94a3b8' }}>No credit card required • Free to self-host • Open source</p>
        </div>
      </section>

      {/* 2 PROBLEM */}
      <section style={{ padding: '3.5rem 1.5rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a' }}>Running a business in India is harder than it should be</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1.8rem', textAlign: 'left' }}>
            {[
              'Using 5 different apps for CRM, invoicing, and follow-ups',
              'Missing customer follow-ups every day',
              'Expensive SaaS tools that keep increasing prices',
              'English-only software that doesn’t feel local',
              'No internet = no work',
            ].map(p => (
              <div key={p} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.8rem', padding: '1rem', display: 'flex', gap: '0.7rem' }}>
                <span style={{ color: '#ef4444' }}>✕</span><span>{p}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1.5rem', fontWeight: 700, color: '#0f172a', background: '#fef3c7', display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>KUBERA was built to solve exactly these problems.</p>
        </div>
      </section>

      {/* 3 SOLUTION */}
      <section style={{ padding: '3.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a' }}>One Platform. Multiple AI Agents. Zero Chaos.</h2>
            <p style={{ color: '#475569', marginTop: '0.8rem' }}>KUBERA gives you a single dashboard where intelligent AI agents handle your business operations — so you can focus on growth.</p>
            <ul style={{ marginTop: '1rem', display: 'grid', gap: '0.6rem', listStyle: 'none', padding: 0 }}>
              {[
                'Role-based AI Agents (Sales Guru, Accountant Ji, Kubera Bot)',
                'GST-compliant invoicing',
                'Smart CRM with automatic follow-ups',
                'Works in Hindi + English',
                'Works offline (PWA)',
                'Completely self-hosted',
              ].map(x => <li key={x} style={{ display: 'flex', gap: '0.6rem' }}><span style={{ color: '#10b981' }}>✓</span> {x}</li>)}
            </ul>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #0f172a, #334155)', color: 'white', borderRadius: '1rem', padding: '1.5rem' }}>
            <p style={{ color: '#fde68a', fontWeight: 700 }}>Live preview</p>
            <div style={{ marginTop: '0.8rem', display: 'grid', gap: '0.6rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '0.8rem', borderRadius: '0.6rem' }}><b>Sales Guru</b> → Qualified Ravi Hyderabad → Follow-up sent</div>
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '0.8rem', borderRadius: '0.6rem' }}><b>Accountant Ji</b> → Invoice INV-7854 → ₹11,800 (CGST 9% + SGST 9%)</div>
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '0.8rem', borderRadius: '0.6rem' }}><b>Kubera Bot</b> → “Hyderabad leads?” → 2 leads, 0% conversion</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 FEATURES */}
      <section id="features" style={{ padding: '3.5rem 1.5rem', background: '#0f172a', color: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, textAlign: 'center' }}>Everything your business needs — in one place</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1.8rem' }}>
            {[
              ['Sales Guru', 'Automatically qualifies leads and follows up with customers'],
              ['Accountant Ji', 'Creates GST invoices and tracks payments'],
              ['Kubera Bot', 'Ask anything about your business in simple language'],
              ['Smart CRM', 'Track leads, deals, and customers easily'],
              ['GST Invoicing', 'Generate professional GST invoices in seconds'],
              ['Multi-language', 'Full support for Hindi and English'],
              ['Offline Ready', 'Works even with poor internet (PWA)'],
              ['Self Hosted', 'No monthly fees. Full control of your data'],
            ].map(([t, d]) => (
              <div key={t} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.8rem', padding: '1.2rem' }}>
                <h3 style={{ fontWeight: 700, color: '#fde68a' }}>{t}</h3><p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.4rem' }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 HOW IT WORKS */}
      <section id="how" style={{ padding: '3.5rem 1.5rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a' }}>Simple. Powerful. Built for Indian Businesses.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.8rem' }}>
            {[
              ['1', 'Sign Up', 'Create your account in under 2 minutes'],
              ['2', 'Add Data', 'Import leads, customers, or start fresh'],
              ['3', 'AI Works', 'Sales Guru and Accountant Ji start working'],
              ['4', 'Grow Faster', 'Focus on business while KUBERA handles ops'],
            ].map(([n, t, d]) => (
              <div key={n} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.8rem', padding: '1.4rem' }}>
                <div style={{ width: '40px', height: '40px', background: '#f59e0b', color: '#0f172a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, margin: '0 auto' }}>{n}</div>
                <h3 style={{ fontWeight: 700, marginTop: '0.8rem' }}>{t}</h3><p style={{ color: '#64748b', fontSize: '0.9rem' }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 WHY */}
      <section id="why" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', textAlign: 'center' }}>Why Indian MSMEs love KUBERA</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            {[
              'Built specifically for Indian businesses',
              'Supports GST from day one',
              'Speaks your language (Hindi + English)',
              'No expensive monthly subscription',
              'Your data stays with you (self-hosted)',
              'Designed for real business owners, not just tech people',
            ].map(x => (
              <div key={x} style={{ display: 'flex', gap: '0.6rem', background: '#fef3c7', padding: '0.9rem', borderRadius: '0.6rem' }}><span>⭐</span> {x}</div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 CTA */}
      <section style={{ padding: '3.5rem 1.5rem', background: 'linear-gradient(135deg, #0f172a, #f59e0b)', color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>Ready to run your business smarter?</h2>
        <p style={{ color: '#e2e8f0', marginTop: '0.6rem' }}>Join the new generation of Indian businesses using AI to save time and grow faster.</p>
        <Link to="/login" style={{ display: 'inline-block', marginTop: '1.2rem', background: 'white', color: '#0f172a', padding: '0.9rem 2rem', borderRadius: '0.7rem', fontWeight: 800, textDecoration: 'none' }}>Start Free Today</Link>
        <p style={{ fontSize: '0.8rem', color: '#fde68a', marginTop: '0.7rem' }}>No credit card required • Free to self-host • Open source</p>
      </section>

      {/* 8 FOOTER */}
      <footer style={{ background: '#020617', color: '#94a3b8', padding: '2rem 1.5rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.9rem' }}>
          <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none' }}>Features</a>
          <a href="#how" style={{ color: '#94a3b8', textDecoration: 'none' }}>How it Works</a>
          <a href="https://github.com/KundanSadhu/Kubera" target="_blank" style={{ color: '#94a3b8', textDecoration: 'none' }}>Documentation</a>
          <a href="mailto:hello@kubera.com" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact</a>
        </div>
        <p style={{ marginTop: '1rem', fontWeight: 700, color: '#e2e8f0' }}>KUBERA — Where Indian Businesses Grow with AI</p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.4rem' }}>© 2026 KUBERA • MIT Licensed • Built for Indian MSMEs</p>
      </footer>
    </div>
  )
}
