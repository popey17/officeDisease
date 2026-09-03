import { useEffect, useState } from 'react'

const FADE_MS = 700

type PreloadProps = {
  onDone: () => void
}

export function Preload({ onDone }: PreloadProps) {
  const [leaving, setLeaving] = useState(false)

  const dismiss = () => {
    setLeaving(true)
  }

  useEffect(() => {
    if (!leaving) return
    const timer = window.setTimeout(onDone, FADE_MS)
    return () => window.clearTimeout(timer)
  }, [leaving, onDone])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        dismiss()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div
      className={leaving ? 'preload is-leaving' : 'preload'}
      role="dialog"
      aria-label="Office Diseases"
      aria-modal="true"
    >
      <p className="preload-kicker">Sharing session</p>
      <h1 className="preload-title">
        <span>
          <em>Office</em>
        </span>
        <span>
          <em>Diseases</em>
        </span>
      </h1>
      <div className="preload-rule" aria-hidden="true" />
      <button className="preload-go" type="button" onClick={dismiss}>
        Start
      </button>
      <p className="preload-hint">Enter or Space</p>
      <div className="preload-meter" aria-hidden="true">
        <i />
      </div>
    </div>
  )
}
