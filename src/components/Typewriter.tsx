import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { PortraitId, TextSegment } from '../data/story'
import { Portrait } from './Portrait'

type Props = {
  lines: TextSegment[][]
  speed?: number
  onComplete?: () => void
  className?: string
}

type Token =
  | { kind: 'char'; char: string; line: number }
  | { kind: 'portrait'; id: PortraitId; alt?: string; line: number }
  | { kind: 'break'; line: number }

function tokenize(lines: TextSegment[][]): Token[] {
  const tokens: Token[] = []
  lines.forEach((line, lineIndex) => {
    line.forEach((seg) => {
      if ('portrait' in seg) {
        tokens.push({
          kind: 'portrait',
          id: seg.portrait,
          alt: seg.alt,
          line: lineIndex,
        })
        return
      }
      for (const char of seg.text) {
        tokens.push({ kind: 'char', char, line: lineIndex })
      }
    })
    if (lineIndex < lines.length - 1) {
      tokens.push({ kind: 'break', line: lineIndex })
    }
  })
  return tokens
}

export function Typewriter({ lines, speed = 22, onComplete, className = '' }: Props) {
  const tokenKey = JSON.stringify(lines)
  const tokens = useMemo(() => tokenize(lines), [lines])
  const [visible, setVisible] = useState(0)
  const [done, setDone] = useState(false)
  const completionCalled = useRef(false)

  useEffect(() => {
    completionCalled.current = false
  }, [tokenKey])

  useEffect(() => {
    if (visible >= tokens.length) {
      if (!done && !completionCalled.current) {
        setDone(true)
        completionCalled.current = true
        onComplete?.()
      }
      return
    }

    const token = tokens[visible]
    const delay =
      token.kind === 'char' && (token.char === '.' || token.char === '!' || token.char === '?')
        ? speed * 8
        : token.kind === 'portrait'
          ? speed * 4
          : token.kind === 'break'
            ? speed * 10
            : speed

    const id = window.setTimeout(() => setVisible((v) => v + 1), delay)
    return () => window.clearTimeout(id)
  }, [visible, tokens, speed, done, onComplete])

  const skip = () => {
    if (done) return
    setVisible(tokens.length)
    setDone(true)
    if (!completionCalled.current) {
      completionCalled.current = true
      onComplete?.()
    }
  }

  const rendered: ReactNode[] = []
  let buffer = ''
  let key = 0

  const flush = () => {
    if (!buffer) return
    rendered.push(
      <span key={`t-${key++}`} className="tw-text">
        {buffer}
      </span>,
    )
    buffer = ''
  }

  for (let i = 0; i < visible; i++) {
    const token = tokens[i]
    if (token.kind === 'char') {
      buffer += token.char
    } else if (token.kind === 'break') {
      flush()
      rendered.push(<br key={`br-${key++}`} />)
    } else {
      flush()
      rendered.push(
        <Portrait
          key={`p-${key++}`}
          id={token.id}
          size="sm"
          variant={token.id === 'daniel' ? 'cutout' : 'default'}
          className="inline-portrait"
          alt={token.alt}
        />,
      )
    }
  }
  flush()

  return (
    <div className={`typewriter ${className}`.trim()} onClick={skip} role="presentation">
      <p className="typewriter-body">
        {rendered}
        {!done && <span className="caret" aria-hidden="true" />}
      </p>
      {!done && <span className="skip-hint">click to skip</span>}
    </div>
  )
}
