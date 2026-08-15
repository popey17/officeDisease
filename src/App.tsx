import { useEffect, useState } from 'react'
import { Scene } from './components/Scene'
import { DiseaseCard } from './components/DiseaseCard'
import { DiseaseRail } from './components/DiseaseRail'
import { TakeawayCard } from './components/TakeawayCard'
import {
  DISEASES,
  diseaseById,
  isDiseaseView,
  nextView,
  prevView,
  type View,
} from './data/diseases'

export default function App() {
  const [started, setStarted] = useState(false)
  const [view, setView] = useState<View>('overview')
  const disease = isDiseaseView(view) ? diseaseById(view) : undefined

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
        setView('overview')
        return
      }

      if (event.key === '9') {
        setView('takeaway')
        return
      }

      if (event.key >= '1' && event.key <= '8') {
        const index = Number(event.key) - 1
        setView(DISEASES[index].id)
        return
      }

      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault()
        setView((current) => nextView(current))
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setView((current) => prevView(current))
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [started])

  return (
    <div
      className={`app ${started ? 'is-live' : 'is-intro'} ${view === 'takeaway' ? 'is-takeaway' : ''}`}
    >
      <div className="stage">
        <Scene
          selectedId={isDiseaseView(view) ? view : null}
          exploring={started && view !== 'takeaway'}
          takeaway={false}
          onSelect={(id) => setView(id)}
        />
      </div>

      {view !== 'takeaway' && (
        <header className="mast">
          <p className="mast-kicker">Sharing session</p>
          <h1 className="mast-title">The Anatomy of Office Life</h1>
          {started && (
            <p className="mast-count">
              {disease ? `${disease.number} / 08` : 'Select a site'}
            </p>
          )}
        </header>
      )}

      {!started && (
        <div className="intro">
          <p className="intro-kicker">Occupational anatomy</p>
          <h2 className="intro-title">
            Eight conditions your desk has been quietly collecting
          </h2>
          <p className="intro-lede">
            A guided tour of the modern workplace, mapped onto a body that
            never asked to sit from 9 to 6. Click a site — or use keys 1 to 8.
            Please remain seated. That is, unfortunately, part of the problem.
          </p>
          <button
            className="intro-go"
            type="button"
            onClick={() => setStarted(true)}
          >
            Begin examination
          </button>
          <p className="intro-hint">Enter or Space · I am not a doctor</p>
        </div>
      )}

      {started && disease && (
        <DiseaseCard disease={disease} onClose={() => setView('overview')} />
      )}

      {started && view === 'takeaway' && (
        <TakeawayCard onClose={() => setView('overview')} />
      )}

      {started && view === 'overview' && (
        <p className="stage-hint">
          Click a marker on the figure, or choose a condition below.
          When you are done, there are takeaways. And a disclaimer.
        </p>
      )}

      {started && view !== 'takeaway' && (
        <DiseaseRail
          view={view}
          onSelect={(id) => setView(id)}
          onOverview={() => setView('overview')}
          onTakeaway={() => setView('takeaway')}
        />
      )}

      {started && view !== 'takeaway' && (
        <p className="keys">
          <kbd>1</kbd>–<kbd>8</kbd> diseases · <kbd>9</kbd> takeaways ·{' '}
          <kbd>←</kbd> <kbd>→</kbd> present · <kbd>Esc</kbd> full body
        </p>
      )}
    </div>
  )
}
