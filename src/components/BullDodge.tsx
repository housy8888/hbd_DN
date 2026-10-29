import { useCallback, useEffect, useRef, useState } from 'react'
import { Portrait } from './Portrait'

type Props = {
  onWin: () => void
}

type Bull = {
  id: number
  fromLeft: boolean
  y: number
  x: number
  speed: number
}

const GAME_H = 360
const PLAYER_SIZE = 72
const BULL_W = 96
const BULL_H = 68
const DURATION = 10

export function BullDodge({ onWin }: Props) {
  const arenaRef = useRef<HTMLDivElement>(null)
  const [playerY, setPlayerY] = useState(GAME_H / 2 - PLAYER_SIZE / 2)
  const [bulls, setBulls] = useState<Bull[]>([])
  const [timeLeft, setTimeLeft] = useState(DURATION)
  const [status, setStatus] = useState<'playing' | 'lost' | 'won'>('playing')
  const keys = useRef({ up: false, down: false })
  const playerYRef = useRef(playerY)
  const bullsRef = useRef<Bull[]>([])
  const nextId = useRef(0)
  const spawnAcc = useRef(0)
  const elapsed = useRef(0)
  const raf = useRef<number | null>(null)
  const last = useRef(0)

  useEffect(() => {
    playerYRef.current = playerY
  }, [playerY])

  useEffect(() => {
    bullsRef.current = bulls
  }, [bulls])

  const reset = useCallback(() => {
    setPlayerY(GAME_H / 2 - PLAYER_SIZE / 2)
    setBulls([])
    setTimeLeft(DURATION)
    setStatus('playing')
    nextId.current = 0
    spawnAcc.current = 0
    elapsed.current = 0
    last.current = 0
    keys.current = { up: false, down: false }
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        keys.current.up = true
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        keys.current.down = true
      }
    }
    const up = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') keys.current.up = false
      if (e.key === 'ArrowDown') keys.current.down = false
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  useEffect(() => {
    if (status !== 'playing') return

    const tick = (ts: number) => {
      if (!last.current) last.current = ts
      const dt = Math.min(0.05, (ts - last.current) / 1000)
      last.current = ts

      const width = arenaRef.current?.clientWidth ?? 640

      elapsed.current += dt
      const remaining = Math.max(0, DURATION - elapsed.current)
      setTimeLeft(remaining)

      if (remaining <= 0) {
        setStatus('won')
        return
      }

      let y = playerYRef.current
      const moveSpeed = 240
      if (keys.current.up) y -= moveSpeed * dt
      if (keys.current.down) y += moveSpeed * dt
      y = Math.max(0, Math.min(GAME_H - PLAYER_SIZE, y))
      playerYRef.current = y
      setPlayerY(y)

      spawnAcc.current += dt
      const spawnEvery = Math.max(0.5, 1.05 - elapsed.current * 0.045)
      let nextBulls = [...bullsRef.current]

      if (spawnAcc.current >= spawnEvery) {
        spawnAcc.current = 0
        const fromLeft = Math.random() > 0.5
        nextBulls.push({
          id: nextId.current++,
          fromLeft,
          y: Math.random() * (GAME_H - BULL_H),
          x: fromLeft ? -BULL_W : width + 8,
          speed: 180 + Math.random() * 140 + elapsed.current * 12,
        })
      }

      nextBulls = nextBulls
        .map((b) => ({
          ...b,
          x: b.fromLeft ? b.x + b.speed * dt : b.x - b.speed * dt,
        }))
        .filter((b) => b.x > -BULL_W - 40 && b.x < width + BULL_W + 40)

      const px = width / 2 - PLAYER_SIZE / 2
      const py = y
      const pad = 10
      const hit = nextBulls.some((b) => {
        return (
          px + pad < b.x + BULL_W - pad &&
          px + PLAYER_SIZE - pad > b.x + pad &&
          py + pad < b.y + BULL_H - pad &&
          py + PLAYER_SIZE - pad > b.y + pad
        )
      })

      setBulls(nextBulls)
      bullsRef.current = nextBulls

      if (hit) {
        setStatus('lost')
        return
      }

      raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [status])

  useEffect(() => {
    if (status === 'won') {
      const t = window.setTimeout(onWin, 800)
      return () => window.clearTimeout(t)
    }
  }, [status, onWin])

  return (
    <section className="scene game-scene">
      <div className="game-header">
        <h2>Dodge the bulls</h2>
        <p>Use ↑ ↓ to stay safe for {DURATION} seconds.</p>
        <div className="timer" aria-live="polite">
          {status === 'playing' ? `${timeLeft.toFixed(1)}s` : status === 'won' ? 'Clear!' : 'Ouch!'}
        </div>
      </div>

      <div className="arena" ref={arenaRef} style={{ height: GAME_H }}>
        <div className="lane-glow" />
        <div
          className="player"
          style={{ top: playerY, width: PLAYER_SIZE, height: PLAYER_SIZE }}
        >
          <Portrait id="me" size="lg" />
        </div>
        {bulls.map((b) => (
          <div
            key={b.id}
            className="bull"
            style={{
              top: b.y,
              left: b.x,
              width: BULL_W,
              height: BULL_H,
              transform: b.fromLeft ? undefined : 'scaleX(-1)',
            }}
          >
            <Portrait id="bull" size="md" />
          </div>
        ))}

        {status === 'lost' && (
          <div className="overlay">
            <button type="button" className="replay" onClick={reset} aria-label="Restart dodge game">
              ↻ <span>Restart dodge</span>
            </button>
            <p>Hit by a bull — try again</p>
          </div>
        )}

        {status === 'won' && (
          <div className="overlay win">
            <p>Survived the herd.</p>
          </div>
        )}
      </div>

      <div className="mobile-controls">
        <button
          type="button"
          onPointerDown={() => {
            keys.current.up = true
          }}
          onPointerUp={() => {
            keys.current.up = false
          }}
          onPointerLeave={() => {
            keys.current.up = false
          }}
        >
          ↑
        </button>
        <button
          type="button"
          onPointerDown={() => {
            keys.current.down = true
          }}
          onPointerUp={() => {
            keys.current.down = false
          }}
          onPointerLeave={() => {
            keys.current.down = false
          }}
        >
          ↓
        </button>
      </div>
    </section>
  )
}
