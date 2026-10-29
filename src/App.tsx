import { useState } from 'react'
import { Background } from './components/Background'
import { BullDodge } from './components/BullDodge'
import { ClosingScene } from './components/ClosingScene'
import { NarrativeScene } from './components/NarrativeScene'
import { Quiz } from './components/Quiz'
import {
  quizQuestions,
  stage1Pages,
  stage3Pages,
  stage5Pages,
} from './data/story'
import './App.css'

type Stage = 0 | 1 | 2 | 3 | 4 | 5

const stageLabels = [
  'Begin',
  'Origin story',
  'Bull dodge',
  'Softening',
  'Truth or False',
  'Finale',
]

function App() {
  const [stage, setStage] = useState<Stage>(0)

  return (
    <div className="app">
      <Background />

      {stage > 0 && (
        <header className="topbar">
          <div className="progress">
            {stageLabels.slice(1).map((label, i) => {
              const n = (i + 1) as Stage
              return (
                <span key={label} className={n === stage ? 'active' : n < stage ? 'done' : ''}>
                  {label}
                </span>
              )
            })}
          </div>
        </header>
      )}

      <main className="stage-root">
        {stage === 0 && (
          <section className="scene title-scene">
            <p className="eyebrow">a link, a story, a little game</p>
            <h1 className="title-brand">for Daniel</h1>
            <p className="title-sub">
              An interactive birthday note — part narrative, part parkrun obstacle course.
            </p>
            <button type="button" className="btn primary large" onClick={() => setStage(1)}>
              Open the link
            </button>
          </section>
        )}

        {stage === 1 && (
          <NarrativeScene pages={stage1Pages} onComplete={() => setStage(2)} continueLabel="Enter the arena" />
        )}

        {stage === 2 && <BullDodge onWin={() => setStage(3)} />}

        {stage === 3 && (
          <NarrativeScene pages={stage3Pages} onComplete={() => setStage(4)} continueLabel="Pop quiz" />
        )}

        {stage === 4 && <Quiz questions={quizQuestions} onComplete={() => setStage(5)} />}

        {stage === 5 && <ClosingScene pages={stage5Pages} />}
      </main>
    </div>
  )
}

export default App
