import { TAKEAWAY } from '../data/diseases'

export function TakeawayCard({ onClose }: { onClose: () => void }) {
  return (
    <section className="takeaway">
      <header className="takeaway-bar">
        <p className="takeaway-kicker">Takeaways · {TAKEAWAY.number} / 09</p>
        <button className="takeaway-back" onClick={onClose} type="button">
          Back to the body
        </button>
      </header>

      <div className="takeaway-inner">
        <h2 className="takeaway-title">{TAKEAWAY.title}</h2>
        <p className="takeaway-lede">{TAKEAWAY.lede}</p>

        <ol className="takeaway-list">
          {TAKEAWAY.points.map((point) => (
            <li
              key={point.mark}
              className={
                point.mark === 'Trust' || point.mark === 'Doctor'
                  ? 'is-stern'
                  : undefined
              }
            >
              <span>{point.mark}</span>
              {point.text}
            </li>
          ))}
        </ol>

        <blockquote className="takeaway-diagnosis">
          <span>Office diagnosis</span>
          {TAKEAWAY.diagnosis}
        </blockquote>
      </div>
    </section>
  )
}
