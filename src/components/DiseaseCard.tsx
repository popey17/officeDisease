import type { Disease } from '../data/diseases'

const ROWS = [
  { key: 'anatomy', mark: 'Anatomy', field: 'anatomy' },
  { key: 'cause', mark: 'Cause', field: 'cause' },
  { key: 'symptoms', mark: 'Symptoms', field: 'symptoms' },
  { key: 'prevention', mark: 'Prevention', field: 'prevention' },
] as const

export function DiseaseCard({
  disease,
  onClose,
}: {
  disease: Disease
  onClose: () => void
}) {
  return (
    <aside className="chart" style={{ ['--spot' as string]: disease.color }}>
      <header className="chart-top">
        <p className="chart-kicker">Office disease #{disease.number}</p>
        <button className="chart-close" onClick={onClose} type="button">
          Full body
        </button>
      </header>

      <p className="chart-emoji" aria-hidden="true">
        {disease.emoji}
      </p>
      <h2 className="chart-title">“{disease.nickname}”</h2>
      <p className="chart-real">
        Real name: <strong>{disease.realName}</strong>
      </p>
      <p className="chart-condition">{disease.realCondition}</p>

      <dl className="chart-rows">
        {ROWS.map((row) => (
          <div key={row.key} className="chart-row">
            <dt>{row.mark}</dt>
            <dd>{disease[row.field]}</dd>
          </div>
        ))}
      </dl>

      <ul className="chart-prevent">
        {disease.preventionList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <blockquote className="chart-diagnosis">
        <span>Office diagnosis</span>
        {disease.diagnosis}
      </blockquote>
    </aside>
  )
}
