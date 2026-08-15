import { DISEASES, type DiseaseId } from '../data/diseases'

export function DiseaseRail({
  selectedId,
  onSelect,
  onOverview,
}: {
  selectedId: DiseaseId | null
  onSelect: (id: DiseaseId) => void
  onOverview: () => void
}) {
  return (
    <nav className="rail" aria-label="Office diseases">
      <button
        type="button"
        className={`rail-item ${selectedId === null ? 'is-active' : ''}`}
        onClick={onOverview}
      >
        <span className="rail-num">00</span>
        <span className="rail-name">Full body</span>
      </button>
      {DISEASES.map((d) => (
        <button
          key={d.id}
          type="button"
          className={`rail-item ${selectedId === d.id ? 'is-active' : ''}`}
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
    </nav>
  )
}
