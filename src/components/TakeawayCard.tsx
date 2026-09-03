import { TAKEAWAY } from '../data/diseases'
import { HtmlText } from './HtmlText'

export function TakeawayCard({ onClose }: { onClose: () => void }) {
  return (
    <section className="takeaway">
      <header className="takeaway-bar">
        <p className="takeaway-kicker">
          Closing · {TAKEAWAY.number} / 07
        </p>
        <button className="takeaway-back" onClick={onClose} type="button">
          Back to the body
        </button>
      </header>

      <div className="takeaway-inner">
        <p className="takeaway-label">Office diagnosis</p>
        <HtmlText className="takeaway-title" tag="h2" html={TAKEAWAY.quote} />
        <p className="takeaway-credit">{TAKEAWAY.credit}</p>
      </div>
    </section>
  )
}
