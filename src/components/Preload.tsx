import { useEffect, useState } from 'react'

const DURATION_MS = 6000
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
    const timer = window.setTimeout(dismiss, DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [])

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
      onClick={dismiss}
      role="presentation"
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
      {/* <p className="preload-hint">Click to skip · six seconds</p> */}
      <div className="preload-meter" aria-hidden="true">
        <i />
      </div>
    </div>
  )
}
