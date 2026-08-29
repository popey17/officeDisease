import { Component, Suspense, type ReactNode } from 'react'
import { type DiseaseId } from '../data/diseases'
import { AnatomyModel } from './AnatomyModel'
import { AnatomyPrimitive } from './AnatomyPrimitive'

type AnatomyProps = {
  selectedId: DiseaseId | null
  exploring: boolean
  onSelect: (id: DiseaseId) => void
}

class AnatomyGuard extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export function Anatomy(props: AnatomyProps) {
  return (
    <AnatomyGuard fallback={<AnatomyPrimitive {...props} />}>
      <Suspense fallback={<AnatomyPrimitive {...props} />}>
        <AnatomyModel {...props} />
      </Suspense>
    </AnatomyGuard>
  )
}
