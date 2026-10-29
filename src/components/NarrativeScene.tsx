import { useState } from 'react'
import type { NarrativePage } from '../data/story'
import { Portrait } from './Portrait'
import { Typewriter } from './Typewriter'

type Props = {
  pages: NarrativePage[]
  onComplete: () => void
  continueLabel?: string
}

export function NarrativeScene({ pages, onComplete, continueLabel = 'Continue' }: Props) {
  const [index, setIndex] = useState(0)
  const [ready, setReady] = useState(false)
  const page = pages[index]

  const advance = () => {
    if (index >= pages.length - 1) {
      onComplete()
      return
    }
    setReady(false)
    setIndex((i) => i + 1)
  }

  return (
    <section className={`scene narrative variant-${page.variant ?? 'default'}`}>
      <div className="dialogue-panel">
        {page.speaker && (
          <div className="speaker-row">
            <Portrait id={page.speaker} size="lg" className="speaker-portrait" />
            <div className="speaker-meta">
              <span className="speaker-name">
                {page.speaker === 'me' ? 'Your Absolute Best Luca' : 'Daniel'}
              </span>
            </div>
          </div>
        )}

        {page.variant === 'memory' ? (
          <MemoryLayout page={page} onReady={() => setReady(true)} />
        ) : (
          <Typewriter
            key={page.id}
            lines={page.lines}
            onComplete={() => setReady(true)}
          />
        )}

        <div className="scene-actions">
          <button type="button" className="btn primary" disabled={!ready} onClick={advance}>
            {index >= pages.length - 1 ? continueLabel : 'Next'}
          </button>
        </div>
      </div>
    </section>
  )
}

function MemoryLayout({
  page,
  onReady,
}: {
  page: NarrativePage
  onReady: () => void
}) {
  const cards = page.lines.slice(0, 4)
  const footer = page.lines.slice(4)

  return (
    <div className="memory-grid">
      <div className="memory-cards">
        {cards.map((line, i) => {
          const caption = line.find((s) => 'text' in s && !s.text.startsWith('['))
          return (
            <figure key={i} className="memory-card">
              <div className="missing-image">[image not available]</div>
              <figcaption>{caption && 'text' in caption ? caption.text : ''}</figcaption>
            </figure>
          )
        })}
      </div>
      <Typewriter key={`${page.id}-footer`} lines={footer} onComplete={onReady} />
    </div>
  )
}
