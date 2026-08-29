import {
  DISEASE_STEPS,
  DISEASE_STEP_LABELS,
  type Disease,
  type DiseaseStep,
  type SlidePhoto,
} from '../data/diseases'
import { HtmlText } from './HtmlText'

export function DiseaseCard({
  disease,
  step,
  onStep,
  onClose,
}: {
  disease: Disease
  step: number
  onStep: (step: number) => void
  onClose: () => void
}) {
  const stepId = DISEASE_STEPS[step]
  const label = DISEASE_STEP_LABELS[stepId]

  return (
    <aside className="deck" style={{ ['--spot' as string]: disease.color }}>
      <header className="deck-top">
        <div>
          <p className="deck-kicker">
            Office disease #{disease.number} · {label}
          </p>
          <p className="deck-progress">
            {String(step + 1).padStart(2, '0')} /{' '}
            {String(DISEASE_STEPS.length).padStart(2, '0')}
          </p>
        </div>
        <button className="deck-close" onClick={onClose} type="button">
          Full body
        </button>
      </header>

      <div className="deck-body" key={`${disease.id}-${stepId}`}>
        <StepContent disease={disease} stepId={stepId} />
      </div>

      <nav className="deck-steps" aria-label="Disease slides">
        {DISEASE_STEPS.map((id, index) => (
          <button
            key={id}
            type="button"
            className={`deck-dot ${index === step ? 'is-active' : ''} ${index < step ? 'is-done' : ''}`}
            onClick={() => onStep(index)}
            aria-label={`${DISEASE_STEP_LABELS[id]} (${index + 1} of ${DISEASE_STEPS.length})`}
            aria-current={index === step ? 'step' : undefined}
          >
            <span className="deck-dot-mark" />
            <span className="deck-dot-label">{DISEASE_STEP_LABELS[id]}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

function PhotoStrip({ photos }: { photos: SlidePhoto[] }) {
  return (
    <div className={`deck-photos count-${photos.length}`}>
      {photos.map((photo) => (
        <figure key={photo.src} className="deck-photo">
          <img src={photo.src} alt={photo.alt} loading="lazy" />
        </figure>
      ))}
    </div>
  )
}

function StepContent({
  disease,
  stepId,
}: {
  disease: Disease
  stepId: DiseaseStep
}) {
  switch (stepId) {
    case 'intro':
      return (
        <>
          <p className="deck-emoji" aria-hidden="true">
            {disease.emoji}
          </p>
          <HtmlText
            className="deck-title"
            tag="h2"
            html={`“${disease.nickname}”`}
          />
          <HtmlText
            className="deck-real"
            tag="p"
            html={`Real name: ${disease.realName}`}
          />
          <HtmlText
            className="deck-condition"
            tag="p"
            html={disease.realCondition}
          />
          <HtmlText className="deck-teaser" tag="p" html={disease.diagnosis} />
          <p className="deck-cue">Next: symptoms →</p>
        </>
      )
    case 'anatomy':
      return (
        <div className="deck-split">
          <div className="deck-copy">
            <p className="deck-section">Anatomy</p>
            <h2 className="deck-title">Where it lives</h2>
            <HtmlText className="deck-lead" tag="p" html={disease.anatomyDetail} />
            <HtmlText className="deck-summary" tag="p" html={disease.anatomy} />
          </div>
          <PhotoStrip photos={disease.anatomyPhotos} />
        </div>
      )
    case 'cause':
      return (
        <div className="deck-split">
          <div className="deck-copy">
            <p className="deck-section">Cause</p>
            <h2 className="deck-title">Why it happens</h2>
            <HtmlText className="deck-lead" tag="p" html={disease.causeDetail} />
            <HtmlText className="deck-summary" tag="p" html={disease.cause} />
          </div>
          <PhotoStrip photos={disease.causePhotos} />
        </div>
      )
    case 'symptoms':
      return (
        <div className="deck-split">
          <div className="deck-copy">
            <p className="deck-section">Symptoms</p>
            <h2 className="deck-title">What people feel</h2>
            <ul className="deck-list">
              {disease.symptomList.map((item) => (
                <HtmlText key={item} tag="li" html={item} />
              ))}
            </ul>
          </div>
          <PhotoStrip photos={disease.symptomPhotos} />
        </div>
      )
    case 'prevention':
      return (
        <div className="deck-split">
          <div className="deck-copy">
            <p className="deck-section">Prevention</p>
            <h2 className="deck-title">What actually helps</h2>
            <ul className="deck-list">
              {disease.preventionList.map((item) => (
                <HtmlText key={item} tag="li" html={item} />
              ))}
            </ul>
          </div>
          <PhotoStrip photos={disease.preventionPhotos} />
        </div>
      )
  }
}
