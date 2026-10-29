import { useState } from 'react'
import type { NarrativePage } from '../data/story'
import { NarrativeScene } from './NarrativeScene'

type Props = {
  pages: NarrativePage[]
}

export function ClosingScene({ pages }: Props) {
  const [showFinale, setShowFinale] = useState(false)

  if (showFinale) {
    return (
      <section className="scene finale">
        <div className="finale-glow" />
        <h1 className="finale-title">
          HAPPY BIRTHDAY
          <br />
          DANIEL <span className="heart">&lt;3</span>
        </h1>
        <p className="finale-sub">from Shiyao</p>
      </section>
    )
  }

  return (
    <NarrativeScene
      pages={pages}
      onComplete={() => setShowFinale(true)}
      continueLabel="Open the gift"
    />
  )
}
