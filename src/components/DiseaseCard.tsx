import {
  DISEASE_STEPS,
  DISEASE_STEP_LABELS,
  type Disease,
  type DiseaseStep,
  type SlidePhoto,
} from '../data/diseases'

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
          <h2 className="deck-title">“{disease.nickname}”</h2>
          <p className="deck-real">
            Real name: <strong>{disease.realName}</strong>
          </p>
          <p className="deck-condition">{disease.realCondition}</p>
          <p className="deck-teaser">{disease.diagnosis}</p>
          <p className="deck-cue">Next: anatomy →</p>
        </>
      )
    case 'anatomy':
      return (
        <div className="deck-split">
          <div className="deck-copy">
            <p className="deck-section">Anatomy</p>
            <h2 className="deck-title">Where it lives</h2>
            <p className="deck-lead">{disease.anatomyDetail}</p>
            <p className="deck-summary">{disease.anatomy}</p>
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
            <p className="deck-lead">{disease.causeDetail}</p>
            <p className="deck-summary">{disease.cause}</p>
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
                <li key={item}>{item}</li>
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
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <PhotoStrip photos={disease.preventionPhotos} />
        </div>
      )
  }
}
