'use client'
import { useState } from 'react'

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
}

const questions = [
  {
    q: "It's Saturday night. Where are you?",
    answers: [
      { text: "Headphones on, locked in, gaming solo", host: 'honeyb' },
      { text: "Somewhere designing something until 3am", host: 'mak' },
      { text: "On a Space talking to 200 people", host: 'hype' },
      { text: "Somewhere you probably shouldn't be", host: 'gspot' },
    ]
  },
  {
    q: "Someone doubts the vision. You:",
    answers: [
      { text: "Pull up the data. Let the numbers talk.", host: 'honeyb' },
      { text: "Show them the work. It speaks for itself.", host: 'mak' },
      { text: "Talk them into it on the spot.", host: 'hype' },
      { text: "Already moved on. Their loss.", host: 'gspot' },
    ]
  },
  {
    q: "What's your actual superpower?",
    answers: [
      { text: "Turning chaos into systems", host: 'honeyb' },
      { text: "Making anything look inevitable", host: 'mak' },
      { text: "Getting a room completely locked in", host: 'hype' },
      { text: "Showing up at the exact right moment", host: 'gspot' },
    ]
  },
  {
    q: "Your role in any group:",
    answers: [
      { text: "The one with the plan nobody else sees yet", host: 'honeyb' },
      { text: "The creative who makes the whole thing look good", host: 'mak' },
      { text: "The energy that keeps everyone going", host: 'hype' },
      { text: "The wildcard who somehow makes it happen", host: 'gspot' },
    ]
  },
  {
    q: "What do you value most?",
    answers: [
      { text: "Efficiency. Get it done, get it right.", host: 'honeyb' },
      { text: "Vision. Build something that lasts.", host: 'mak' },
      { text: "Community. Nothing matters without the people.", host: 'hype' },
      { text: "Momentum. Keep moving or get left behind.", host: 'gspot' },
    ]
  },
]

const results = {
  honeyb: {
    name: 'Honey B',
    handle: '@honeybd',
    desc: "You move like a chess player in a room full of checkers. Analytical, quiet until you're not, and when you commit to something it's already done in your head. You probably have 3 tabs open right now optimizing something nobody asked you to.",
    color: '#00c3ff',
    link: 'https://x.com/honeybd',
  },
  mak: {
    name: 'Makaveli',
    handle: '@makavelidelacruz',
    desc: "You see the final form before anyone else does. Creative direction is just thinking clearly while everyone else panics. You build things that look obvious in hindsight but nobody else could have made.",
    color: '#a855f7',
    link: 'https://x.com/makavelidelacruz',
  },
  hype: {
    name: 'Hype',
    handle: '@morethenhype',
    desc: "You're the reason rooms come alive. Natural connector, natural host, and you make hard things feel easy because your energy is genuinely contagious. People would follow you into anything.",
    color: '#f97316',
    link: 'https://x.com/morethenhype',
  },
  gspot: {
    name: 'Gspot',
    handle: '@timmygspt',
    desc: "Unpredictable in the best way. You operate on instinct and it works more than it has any right to. You've probably already done something today that nobody else would have thought to do.",
    color: '#22c55e',
    link: 'https://x.com/timmygspt',
  },
}

export function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [current, setCurrent] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({ honeyb: 0, mak: 0, hype: 0, gspot: 0 })
  const [result, setResult] = useState<string | null>(null)
  const [selected, setSelected] = useState<number | null>(null)

  if (!isOpen) return null

  const handleAnswer = (host: string, idx: number) => {
    setSelected(idx)
    setTimeout(() => {
      const newScores = { ...scores, [host]: scores[host] + 1 }
      setScores(newScores)
      setSelected(null)
      if (current + 1 >= questions.length) {
        const winner = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0]
        setResult(winner)
      } else {
        setCurrent(current + 1)
      }
    }, 300)
  }

  const reset = () => {
    setCurrent(0)
    setScores({ honeyb: 0, mak: 0, hype: 0, gspot: 0 })
    setResult(null)
    setSelected(null)
  }

  const res = result ? results[result as keyof typeof results] : null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box quiz-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {!result ? (
          <>
            <div className="quiz-progress">
              <div className="quiz-progress-bar" style={{ width: `${((current) / questions.length) * 100}%` }} />
            </div>
            <p className="quiz-counter">{current + 1} / {questions.length}</p>
            <h2 className="quiz-question">{questions[current].q}</h2>
            <div className="quiz-answers">
              {questions[current].answers.map((a, i) => (
                <button
                  key={i}
                  className={`quiz-answer ${selected === i ? 'selected' : ''}`}
                  onClick={() => handleAnswer(a.host, i)}
                >
                  {a.text}
                </button>
              ))}
            </div>
          </>
        ) : res ? (
          <div className="quiz-result">
            <p className="quiz-result-label">You got</p>
            <h2 className="quiz-result-name" style={{ color: res.color }}>{res.name}</h2>
            <p className="quiz-result-handle">{res.handle}</p>
            <p className="quiz-result-desc">{res.desc}</p>
            <div className="quiz-result-actions">
              <a href={res.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Follow {res.name}
              </a>
              <button className="quiz-retake" onClick={reset}>Try again</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
