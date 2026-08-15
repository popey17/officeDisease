import { useEffect, useState } from 'react'
import { Scene } from './components/Scene'
import { DiseaseCard } from './components/DiseaseCard'
import { DiseaseRail } from './components/DiseaseRail'
import {
  DISEASES,
  diseaseById,
  nextDisease,
  prevDisease,
  type DiseaseId,
} from './data/diseases'

export default function App() {
  const [started, setStarted] = useState(false)
  const [selectedId, setSelectedId] = useState<DiseaseId | null>(null)
  const disease = diseaseById(selectedId)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      if (!started) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          setStarted(true)
        }
        return
      }

      if (event.key === 'Escape' || event.key === '0') {
        setSelectedId(null)
        return
      }

      if (event.key >= '1' && event.key <= '8') {
        const index = Number(event.key) - 1
        setSelectedId(DISEASES[index].id)
        return
      }

      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault()
        setSelectedId(nextDisease(selectedId))
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setSelectedId(prevDisease(selectedId))
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedId, started])

  return (
    <div className={`app ${started ? 'is-live' : 'is-intro'}`}>
      <div className="stage">
        <Scene
          selectedId={started ? selectedId : null}
          exploring={started}
          onSelect={setSelectedId}
        />
      </div>

      <header className="mast">
        <p className="mast-kicker">Sharing session</p>
        <h1 className="mast-title">The Anatomy of Office Life</h1>
        {started && (
          <p className="mast-count">
            {selectedId
              ? `${disease?.number} / 08`
              : 'Select a site'}
          </p>
        )}
      </header>

      {!started && (
        <div className="intro">
          <p className="intro-kicker">Occupational anatomy</p>
          <h2 className="intro-title">
            Eight conditions the workplace writes into the body
          </h2>
          <p className="intro-lede">
            Start with the full figure. Click a site — or use keys 1 to 8 —
            and the camera moves to the anatomy that takes the hit.
          </p>
          <button
            className="intro-go"
            type="button"
            onClick={() => setStarted(true)}
          >
            Begin examination
          </button>
          <p className="intro-hint">Enter or Space</p>
        </div>
      )}

      {started && disease && (
        <DiseaseCard disease={disease} onClose={() => setSelectedId(null)} />
      )}

      {started && !disease && (
        <p className="stage-hint">
          Click a marker on the figure, or choose a condition below.
        </p>
      )}

      {started && (
        <DiseaseRail
          selectedId={selectedId}
          onSelect={setSelectedId}
          onOverview={() => setSelectedId(null)}
        />
      )}

      {started && (
        <p className="keys">
          <kbd>1</kbd>–<kbd>8</kbd> jump · <kbd>←</kbd> <kbd>→</kbd> present ·{' '}
          <kbd>Esc</kbd> full body
        </p>
      )}
    </div>
  )
}
