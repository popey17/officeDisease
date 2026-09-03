import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { DiseaseCard } from './components/DiseaseCard'
import { DiseaseRail } from './components/DiseaseRail'
import { Preload } from './components/Preload'
import { TakeawayCard } from './components/TakeawayCard'
import {
  DISEASES,
  LAST_DISEASE_STEP,
  diseaseById,
  isDiseaseView,
  nextView,
  prevView,
  type DiseaseId,
  type View,
} from './data/diseases'

const Scene = lazy(() =>
  import('./components/Scene').then(({ Scene }) => ({ default: Scene })),
)

export default function App() {
  const [preloading, setPreloading] = useState(true)
  const [view, setView] = useState<View>('overview')
  const [step, setStep] = useState(0)
  const endPreload = useCallback(() => setPreloading(false), [])
  const disease = isDiseaseView(view) ? diseaseById(view) : undefined
  const presenting = Boolean(disease)

  const goDisease = (id: DiseaseId, nextStep = 0) => {
    setView(id)
    setStep(nextStep)
  }

  const goOverview = () => {
    setView('overview')
    setStep(0)
  }

  const goTakeaway = () => {
    setView('takeaway')
    setStep(0)
  }

  const goNext = () => {
    if (isDiseaseView(view)) {
      if (step < LAST_DISEASE_STEP) {
        setStep((current) => current + 1)
        return
      }
      const next = nextView(view)
      if (isDiseaseView(next)) goDisease(next, 0)
      else goTakeaway()
      return
    }
    if (view === 'overview') goDisease(DISEASES[0].id, 0)
  }

  const goPrev = () => {
    if (isDiseaseView(view)) {
      if (step > 0) {
        setStep((current) => current - 1)
        return
      }
      const prev = prevView(view)
      if (isDiseaseView(prev)) goDisease(prev, LAST_DISEASE_STEP)
      else goOverview()
      return
    }
    if (view === 'takeaway') {
      goDisease(DISEASES[DISEASES.length - 1].id, LAST_DISEASE_STEP)
    }
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      if (preloading) {
        return
      }

      if (event.key === 'Escape' || event.key === '0') {
        goOverview()
        return
      }

      if (event.key === '9') {
        goTakeaway()
        return
      }

      if (event.key >= '1' && event.key <= '8') {
        const index = Number(event.key) - 1
        goDisease(DISEASES[index].id, 0)
        return
      }

      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault()
        goNext()
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div
      className={[
        'app',
        preloading ? 'is-preloading' : 'is-live',
        view === 'takeaway' ? 'is-takeaway' : '',
        presenting ? 'is-presenting' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="stage">
        <Suspense fallback={<div className="stage-loading" aria-hidden="true" />}>
          <Scene
            selectedId={isDiseaseView(view) ? view : null}
            exploring={view !== 'takeaway'}
            takeaway={false}
            presenting={presenting}
            onSelect={(id) => goDisease(id, 0)}
          />
        </Suspense>
      </div>

      {view !== 'takeaway' && (
        <header className="mast">
          <p className="mast-kicker">Sharing session</p>
          <h1 className="mast-title">The Anatomy of An Office Worker</h1>
          <p className="mast-count">
            {disease
              ? `${disease.number} / 06 · slide ${step + 1}/5`
              : 'Select a site'}
          </p>
        </header>
      )}

      {preloading && <Preload onDone={endPreload} />}

      {view === 'overview' && (
        <div className="intro">
          <p className="intro-kicker">Occupational anatomy</p>
          <h2 className="intro-title">
            Conditions your desk has been quietly collecting
          </h2>
          <p className="intro-lede">
            A guided tour of the modern workplace, mapped onto a body that
            never asked to sit from 9 to 6. Click a site — or use keys 1 to 8.
            Please remain seated. That is, unfortunately, part of the problem.
          </p>
        </div>
      )}

      {disease && (
        <DiseaseCard
          disease={disease}
          step={step}
          onStep={setStep}
          onClose={goOverview}
        />
      )}

      {view === 'takeaway' && (
        <TakeawayCard onClose={goOverview} />
      )}

      {view !== 'takeaway' && (
        <DiseaseRail
          view={view}
          onSelect={(id) => goDisease(id, 0)}
          onOverview={goOverview}
          onTakeaway={goTakeaway}
        />
      )}

      {view !== 'takeaway' && (
        <p className="keys">
          <kbd>→</kbd> next slide · <kbd>←</kbd> back · <kbd>1</kbd>–
          <kbd>8</kbd> disease · <kbd>9</kbd> closing · <kbd>Esc</kbd> full
          body
        </p>
      )}
    </div>
  )
}
