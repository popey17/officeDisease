import { DISEASES, type View } from '../data/diseases'

export function DiseaseRail({
  view,
  onSelect,
  onOverview,
  onTakeaway,
}: {
  view: View
  onSelect: (id: View) => void
  onOverview: () => void
  onTakeaway: () => void
}) {
  return (
    <nav className="rail" aria-label="Office diseases">
      <button
        type="button"
        className={`rail-item ${view === 'overview' ? 'is-active' : ''}`}
        onClick={onOverview}
      >
        <span className="rail-num">00</span>
        <span className="rail-name">Full body</span>
      </button>
      {DISEASES.map((d) => (
        <button
          key={d.id}
          type="button"
          className={`rail-item ${view === d.id ? 'is-active' : ''}`}
          style={{ ['--spot' as string]: d.color }}
          onClick={() => onSelect(d.id)}
        >
          <span className="rail-num">{d.number}</span>
          <span className="rail-emoji" aria-hidden="true">
            {d.emoji}
          </span>
          <span className="rail-name">{d.nickname}</span>
        </button>
      ))}
      <button
        type="button"
        className={`rail-item ${view === 'takeaway' ? 'is-active' : ''}`}
        onClick={onTakeaway}
      >
        <span className="rail-num">09</span>
        <span className="rail-name">Takeaways</span>
      </button>
    </nav>
  )
}
