import { TAKEAWAY } from '../data/diseases'
import { HtmlText } from './HtmlText'

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
        <HtmlText className="takeaway-title" tag="h2" html={TAKEAWAY.title} />
        <HtmlText className="takeaway-lede" tag="p" html={TAKEAWAY.lede} />

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
              <HtmlText html={point.text} />
            </li>
          ))}
        </ol>

        <blockquote className="takeaway-diagnosis">
          <span>Office diagnosis</span>
          <HtmlText tag="span" html={TAKEAWAY.diagnosis} />
        </blockquote>
      </div>
    </section>
  )
}
