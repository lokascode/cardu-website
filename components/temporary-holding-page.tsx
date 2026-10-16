'use client'

import { useEffect, useState } from 'react'

const messages = [
  { text: 'مالپەر دهێتە نویکرن', lang: 'ckb', dir: 'rtl' as const, label: 'Kurdî' },
  { text: 'الموقع قيد التحديث', lang: 'ar', dir: 'rtl' as const, label: 'العربية' },
  { text: 'Website Update in Progress', lang: 'en', dir: 'ltr' as const, label: 'English' },
]

export function TemporaryHoldingPage() {
  const [current, setCurrent] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % messages.length)
    }, 4200)
    return () => window.clearInterval(timer)
  }, [])

  const active = messages[current]

  return (
    <main className={`holding-stage ${ready ? 'is-ready' : ''}`}>
      <div className="holding-grain" aria-hidden="true" />
      <div className="holding-frame">
        <a href="/" className="holding-brand" aria-label="CARDU home">
          <img src="/images/cardu-lockup.png" alt="CARDU — كاردو" width={796} height={332} />
        </a>

        <h1 className="sr-only">CARDU — Website Update in Progress</h1>

        <section className="holding-rotator" aria-live="polite" aria-label="Website update status">
          <div className="holding-message-stage">
            <p className={`holding-message holding-message-${active.dir}`} lang={active.lang} dir={active.dir}>
              {active.text}
            </p>
          </div>

          <div className="holding-languages" role="tablist" aria-label="Choose language">
            {messages.map((message, index) => (
              <span key={message.lang} className="holding-language-group">
                {index > 0 && <span className="holding-dot" aria-hidden="true" />}
                <button
                  type="button"
                  role="tab"
                  aria-selected={current === index}
                  className={current === index ? 'is-active' : ''}
                  lang={message.lang}
                  dir={message.dir}
                  onClick={() => setCurrent(index)}
                >
                  {message.label}
                </button>
              </span>
            ))}
          </div>
        </section>

        <div className="holding-progress" aria-hidden="true"><span /></div>
        <footer className="holding-footer">© {new Date().getFullYear()} CARDU. All rights reserved.</footer>
      </div>
    </main>
  )
}

export default TemporaryHoldingPage
