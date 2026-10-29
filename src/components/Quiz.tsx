import { useState } from 'react'
import type { QuizQuestion } from '../data/story'
import { Portrait } from './Portrait'
import { Typewriter } from './Typewriter'

type Props = {
  questions: QuizQuestion[]
  onComplete: () => void
}

export function Quiz({ questions, onComplete }: Props) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [ready, setReady] = useState(false)
  const q = questions[index]
  const answered = picked !== null

  const choose = (i: number) => {
    if (answered) return
    setPicked(i)
  }

  const next = () => {
    if (index >= questions.length - 1) {
      onComplete()
      return
    }
    setIndex((v) => v + 1)
    setPicked(null)
    setReady(false)
  }

  return (
    <section className="scene quiz-scene">
      <div className="dialogue-panel">
        <p className="quiz-kicker">Truth or False · {index + 1}/{questions.length}</p>
        <Typewriter key={q.id} lines={[q.prompt]} onComplete={() => setReady(true)} />

        <div className="options" role="list">
          {q.options.map((opt, i) => {
            let cls = 'option'
            if (answered) {
              if (i === q.answerIndex) cls += ' correct'
              else if (i === picked) cls += ' incorrect'
            }
            return (
              <button
                key={opt}
                type="button"
                className={cls}
                disabled={!ready || answered}
                onClick={() => choose(i)}
              >
                <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                <span>{opt}</span>
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="scene-actions">
            <button type="button" className="btn primary" onClick={next}>
              {index >= questions.length - 1 ? 'Continue' : 'Next question'}
            </button>
          </div>
        )}
      </div>
      <div className="quiz-side">
        <Portrait id="daniel" size="hero" />
      </div>
    </section>
  )
}
