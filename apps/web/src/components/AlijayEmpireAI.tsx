import { useEffect, useRef, useState } from 'react'
import {
  X,
  Cpu,
  Send,
  Mail,
  Calculator,
  Monitor,
  Loader2,
  Copy,
  Check,
  Truck,
  FileText,
  Users,
  Package,
  ExternalLink,
} from 'lucide-react'
import { integrations } from '../data/integrations'
import { FIGURE_STARTERS, SYSTEM_STARTERS } from '../data/empireAIPrompt'
import { useAppModals } from '../context/AppModalsContext'
import {
  askSystemsHelp,
  calculateFigures,
  createSystemsSession,
  draftEmpireEmail,
  type ChatMessage,
} from '../services/empireAI'
import '../styles/techPanel.css'
import '../styles/empirePanelTheme.css'
import styles from './AlijayEmpireAI.module.css'

type Tab = 'email' | 'figures' | 'systems'

const systemIcons: Record<string, typeof Truck> = {
  'alijay-transport': Truck,
  'alijay-invoicing': FileText,
  'alijay-hr': Users,
  'alijay-inventory': Package,
}

export function AlijayEmpireAI() {
  const { aiOpen, closeAI } = useAppModals()
  const [tab, setTab] = useState<Tab>('email')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [emailTo, setEmailTo] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailTone, setEmailTone] = useState('professional')
  const [emailPoints, setEmailPoints] = useState('')
  const [emailSender, setEmailSender] = useState('')
  const [emailDraft, setEmailDraft] = useState('')
  const [copied, setCopied] = useState(false)

  const [figureInput, setFigureInput] = useState('')
  const [figureResult, setFigureResult] = useState('')

  const [sysMessages, setSysMessages] = useState<ChatMessage[]>(() => createSystemsSession())
  const [sysInput, setSysInput] = useState('')
  const sysEndRef = useRef<HTMLDivElement>(null)

  const empireSystems = integrations.filter((s) => s.url)
  const visibleSys = sysMessages.filter((m) => m.role !== 'system')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAI()
    }
    if (aiOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKey)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [aiOpen, closeAI])

  useEffect(() => {
    sysEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [sysMessages, loading])

  useEffect(() => {
    if (aiOpen) setError(null)
  }, [aiOpen, tab])

  const handleEmailDraft = async () => {
    if (loading) return
    setError(null)
    setLoading(true)
    setEmailDraft('')
    try {
      setEmailDraft(
        await draftEmpireEmail({
          to: emailTo,
          subject: emailSubject,
          tone: emailTone,
          points: emailPoints,
          senderName: emailSender,
        })
      )
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Email module error.')
    } finally {
      setLoading(false)
    }
  }

  const handleFigures = async (text: string) => {
    const q = text.trim()
    if (!q || loading) return
    setError(null)
    setFigureInput('')
    setLoading(true)
    setFigureResult('')
    try {
      setFigureResult(await calculateFigures(q))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Figures module error.')
    } finally {
      setLoading(false)
    }
  }

  const handleSystems = async (text: string) => {
    const q = text.trim()
    if (!q || loading) return
    setError(null)
    setSysInput('')
    setLoading(true)
    try {
      const { messages } = await askSystemsHelp(sysMessages, q)
      setSysMessages(messages)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Systems module error.')
    } finally {
      setLoading(false)
    }
  }

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!aiOpen) return null

  return (
    <div
      className={`techOverlay empirePanelTheme ${styles.overlay}`}
      onClick={closeAI}
      role="presentation"
    >
      <aside
        className={`techPanel ${styles.panel}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="empire-ai-title"
      >
        <header className={styles.header}>
          <div className={styles.brand}>
            <span className={styles.iconWrap}>
              <Cpu size={22} />
            </span>
            <div>
              <span className="techBadge">
                <span className="techBadgeLive" />
                Enterprise AI
              </span>
              <h2 id="empire-ai-title">Alijay Empire AI</h2>
              <p>Email · Figures · Systems only</p>
            </div>
          </div>
          <button type="button" className={styles.closeBtn} onClick={closeAI} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        <div className={styles.scopeBar}>
          <span>MODULES</span>
          <code>EMAIL</code>
          <code>FIGURES</code>
          <code>SYSTEMS</code>
        </div>

        <nav className={styles.tabs}>
          {(
            [
              { id: 'email' as const, icon: Mail, label: 'Email' },
              { id: 'figures' as const, icon: Calculator, label: 'Figures' },
              { id: 'systems' as const, icon: Monitor, label: 'Systems' },
            ] as const
          ).map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              type="button"
              className={`${styles.tab} ${tab === id ? styles.tabActive : ''}`}
              onClick={() => setTab(id)}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>

        <div className={styles.body}>
          {error && <p className={styles.error}>{error}</p>}

          {tab === 'email' && (
            <div className={styles.pane}>
              <p className={styles.moduleDesc}>
                <span className={styles.moduleTag}>EMAIL_ENGINE</span>
                Generate professional Alijay Empire correspondence.
              </p>
              <label className={styles.field}>
                Recipient
                <input
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="Client / supplier name"
                />
              </label>
              <label className={styles.field}>
                Subject
                <input
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Email topic"
                />
              </label>
              <div className={styles.row}>
                <label className={styles.field}>
                  Tone
                  <select value={emailTone} onChange={(e) => setEmailTone(e.target.value)}>
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="firm">Firm</option>
                  </select>
                </label>
                <label className={styles.field}>
                  Sign-off
                  <input
                    value={emailSender}
                    onChange={(e) => setEmailSender(e.target.value)}
                    placeholder="Tom — Alijay Empire"
                  />
                </label>
              </div>
              <label className={styles.field}>
                Message brief
                <textarea
                  value={emailPoints}
                  onChange={(e) => setEmailPoints(e.target.value)}
                  rows={4}
                  placeholder="What the email must communicate…"
                />
              </label>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={handleEmailDraft}
                disabled={loading}
              >
                {loading ? <Loader2 size={18} className={styles.spin} /> : <Mail size={18} />}
                Generate email
              </button>
              {emailDraft && (
                <div className={styles.output}>
                  <div className={styles.outputHead}>
                    <span>OUTPUT</span>
                    <button type="button" onClick={() => copyText(emailDraft)}>
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <pre>{emailDraft}</pre>
                </div>
              )}
            </div>
          )}

          {tab === 'figures' && (
            <div className={styles.pane}>
              <p className={styles.moduleDesc}>
                <span className={styles.moduleTag}>FIGURES_ENGINE</span>
                Fuel, VAT, margins, litres, and financial calculations.
              </p>
              <div className={styles.starters}>
                {FIGURE_STARTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={styles.chip}
                    onClick={() => handleFigures(s)}
                    disabled={loading}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <label className={styles.field}>
                Calculation request
                <textarea
                  value={figureInput}
                  onChange={(e) => setFigureInput(e.target.value)}
                  rows={3}
                  placeholder="e.g. 8,200 litres at R 21.90/L plus 15% VAT"
                />
              </label>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={() => handleFigures(figureInput)}
                disabled={loading || !figureInput.trim()}
              >
                {loading ? <Loader2 size={18} className={styles.spin} /> : <Calculator size={18} />}
                Calculate
              </button>
              {figureResult && (
                <div className={`${styles.output} ${styles.outputMono}`}>
                  <div className={styles.outputHead}>
                    <span>RESULT</span>
                    <button type="button" onClick={() => copyText(figureResult)}>
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <pre>{figureResult}</pre>
                </div>
              )}
            </div>
          )}

          {tab === 'systems' && (
            <div className={`${styles.pane} ${styles.systemsPane}`}>
              <p className={styles.moduleDesc}>
                <span className={styles.moduleTag}>SYSTEMS_ENGINE</span>
                Guidance for Alijay Empire platforms only.
              </p>
              <ul className={styles.quickLinks}>
                {empireSystems.map((sys) => {
                  const Icon = systemIcons[sys.id] ?? Truck
                  return (
                    <li key={sys.id}>
                      <a href={sys.url} target="_blank" rel="noopener noreferrer">
                        <Icon size={14} />
                        {sys.shortName}
                        <ExternalLink size={12} />
                      </a>
                    </li>
                  )
                })}
              </ul>
              <div className={styles.chatArea}>
                {visibleSys.length === 0 && (
                  <div className={styles.starters}>
                    {SYSTEM_STARTERS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={styles.chip}
                        onClick={() => handleSystems(s)}
                        disabled={loading}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
                {visibleSys.map((msg, i) => (
                  <div
                    key={i}
                    className={`${styles.bubble} ${msg.role === 'user' ? styles.bubbleUser : styles.bubbleAi}`}
                  >
                    {msg.content}
                  </div>
                ))}
                {loading && (
                  <div className={`${styles.bubble} ${styles.bubbleAi}`}>
                    <Loader2 size={14} className={styles.spin} /> Processing…
                  </div>
                )}
                <div ref={sysEndRef} />
              </div>
              <form
                className={styles.chatForm}
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSystems(sysInput)
                }}
              >
                <input
                  value={sysInput}
                  onChange={(e) => setSysInput(e.target.value)}
                  placeholder="Ask about Empire system usage…"
                  disabled={loading}
                />
                <button type="submit" disabled={loading || !sysInput.trim()}>
                  <Send size={16} />
                </button>
              </form>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={() => setSysMessages(createSystemsSession())}
              >
                Reset session
              </button>
            </div>
          )}
        </div>

        <footer className={styles.footer}>
          <span className={styles.footerDot} />
          Alijay Empire AI v1.4 · Restricted enterprise modules
        </footer>
      </aside>
    </div>
  )
}
