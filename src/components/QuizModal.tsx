'use client'
import { useState } from 'react'

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
}

const questions = [
  {
    q: "The event starts in 30 minutes. Nothing is ready. You:",
    answers: [
      { text: "Already have a backup plan. The backup has a backup.", host: 'honeyb' },
      { text: "Make it look intentional. It's gonna be the best part of the night.", host: 'mak' },
      { text: "Start hyping everyone up so hard they forget there was supposed to be a plan.", host: 'hype' },
      { text: "Walk in like you own the place and figure it out live.", host: 'gspot' },
    ]
  },
  {
    q: "You have 48 hours and $500. You:",
    answers: [
      { text: "Build something that could technically make money by Sunday.", host: 'honeyb' },
      { text: "Make something that would confuse and impress people equally.", host: 'mak' },
      { text: "Throw a party and make it a moment people talk about.", host: 'hype' },
      { text: "Disappear. Come back with a story.", host: 'gspot' },
    ]
  },
  {
    q: "Your villain arc begins when:",
    answers: [
      { text: "Someone moves slow on something you already solved in your head a week ago.", host: 'honeyb' },
      { text: "They change the direction without asking you.", host: 'mak' },
      { text: "The room goes quiet and nobody is doing anything about it.", host: 'hype' },
      { text: "You get bored.", host: 'gspot' },
    ]
  },
  {
    q: "Someone calls you on the phone. You:",
    answers: [
      { text: "Let it ring. Text them in 4 minutes with the answer already.", host: 'honeyb' },
      { text: "Don't pick up. Send a voice memo that somehow says more.", host: 'mak' },
      { text: "Pick up immediately and somehow end up on the phone for an hour.", host: 'hype' },
      { text: "Answer from a completely unexpected location.", host: 'gspot' },
    ]
  },
  {
    q: "Describe yourself but you can only pick one:",
    answers: [
      { text: "Quietly running circles around everyone.", host: 'honeyb' },
      { text: "The reason it looks the way it looks.", host: 'mak' },
      { text: "The reason people showed up.", host: 'hype' },
      { text: "A lot going on.", host: 'gspot' },
    ]
  },
]

const results = {
  honeyb: {
    name: 'Honey B',
    handle: '@honeybd',
    desc: "You're running 3 parallel timelines and you already know how each one ends. The chaos everyone else sees is just Tuesday to you. You've probably optimized something today that nobody asked you to and it worked.",
    color: '#00c3ff',
    link: 'https://x.com/honeybd',
  },
  mak: {
    name: 'Makaveli',
    handle: '@MakaveliDlaCruz',
    desc: "You see the final form before anyone else even knows there's a form to see. Quiet with the vision, loud with the output. Everything you touch looks like it was always supposed to look that way.",
    color: '#a855f7',
    link: 'https://x.com/MakaveliDlaCruz',
  },
  hype: {
    name: 'Hype',
    handle: '@morethenhype',
    desc: "You are the atmosphere. Rooms feel different when you're in them. People leave your calls and spaces feeling like they can do something — that's not an accident, that's a skill. An unreasonable amount of energy for one person.",
    color: '#f97316',
    link: 'https://x.com/morethenhype',
  },
  gspot: {
    name: 'Gspot',
    handle: '@timmygspt',
    desc: "Chaotic good with a very specific frequency. You operate on instinct and somehow it's almost always right. Nobody can fully predict you, which is probably the point. You've done at least one thing today nobody else thought of.",
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
