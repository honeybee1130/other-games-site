'use client'
import { useState, useRef } from 'react'

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
}

const questions = [
  {
    q: "It's game day. Your contribution to the group chat is:",
    answers: [
      { text: "The creative brief nobody asked for but everyone needed.", host: 'honeyb' },
      { text: "47 messages hyping everyone up since 7am.", host: 'mak' },
      { text: "One message. It's a confirmed deal.", host: 'hype' },
      { text: "A completely unrelated meme that somehow still applies.", host: 'gspot' },
    ]
  },
  {
    q: "How do you actually get things done?",
    answers: [
      { text: "I build the vision so clear that execution becomes obvious.", host: 'honeyb' },
      { text: "I talk to people until the thing just happens.", host: 'mak' },
      { text: "I make calls until someone says yes.", host: 'hype' },
      { text: "Unclear. It just works out.", host: 'gspot' },
    ]
  },
  {
    q: "Your relationship with rules:",
    answers: [
      { text: "I wrote better ones.", host: 'honeyb' },
      { text: "Rules are for people who don't know the right people.", host: 'mak' },
      { text: "I read them before I break them.", host: 'hype' },
      { text: "What rules?", host: 'gspot' },
    ]
  },
  {
    q: "You've been offline for 3 days. You come back and:",
    answers: [
      { text: "Drop something nobody saw coming and disappear again.", host: 'honeyb' },
      { text: "Reply to 200 messages in 20 minutes.", host: 'mak' },
      { text: "Announce you closed something.", host: 'hype' },
      { text: "Act like nothing happened.", host: 'gspot' },
    ]
  },
  {
    q: "If the collab falls apart, it's because:",
    answers: [
      { text: "Their creative direction was wrong and you couldn't fix it from the outside.", host: 'honeyb' },
      { text: "Their community was dead and you can't build on nothing.", host: 'mak' },
      { text: "They couldn't close and kept wasting your time.", host: 'hype' },
      { text: "You got bored.", host: 'gspot' },
    ]
  },
]

const results = {
  honeyb: {
    name: 'Honey B',
    handle: '@honeybd',
    desc: "You're the creative director in the room even when nobody called you that. You have opinions on how things look, feel, and land — and you're usually right. The vision lives in your head before anyone else can see it. Classically trained chaos architect.",
    color: '#00c3ff',
    link: 'https://x.com/honeybd',
  },
  mak: {
    name: 'Makaveli',
    handle: '@MakaveliDlaCruz',
    desc: "You are the community. When people show up, it's partly because of you. You're loud, consistent, and you genuinely know everybody. The Discord would be a ghost town without you and everyone knows it.",
    color: '#a855f7',
    link: 'https://x.com/MakaveliDlaCruz',
  },
  hype: {
    name: 'Hype',
    handle: '@morethenhype',
    desc: "You get things done while everyone else is still talking about getting things done. BD doesn't stand for business development, it stands for you show up and deals happen. Operator energy in a normal person's body.",
    color: '#f97316',
    link: 'https://x.com/morethenhype',
  },
  gspot: {
    name: 'Gspot',
    handle: '@timmygspt',
    desc: "You don't give a fuck in the best possible way. The unpredictable variable that makes everything more interesting. Nobody knows what you're going to say next and that's exactly the point. Somehow it usually works.",
    color: '#22c55e',
    link: 'https://x.com/timmygspt',
  },
}

export function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [current, setCurrent] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({ honeyb: 0, mak: 0, hype: 0, gspot: 0 })
  const [result, setResult] = useState<string | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [shareState, setShareState] = useState<'idle' | 'copying' | 'copied'>('idle')
  const shareCardRef = useRef<HTMLDivElement>(null)

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
    setShareState('idle')
  }

  const handleShare = async () => {
    if (!shareCardRef.current || shareState === 'copying') return
    setShareState('copying')

    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        useCORS: true,
        logging: false,
      })

      canvas.toBlob(async (blob) => {
        if (!blob) return

        // Try Web Share API first (mobile)
        if (navigator.share && navigator.canShare?.({ files: [new File([blob], 'my-og-host.png', { type: 'image/png' })] })) {
          const file = new File([blob], 'my-og-host.png', { type: 'image/png' })
          await navigator.share({
            title: `I got ${res?.name} on the Other Games quiz`,
            text: `Find out which Other Games host you are at othergames.xyz`,
            files: [file],
          })
          setShareState('idle')
          return
        }

        // Desktop — copy to clipboard
        if (navigator.clipboard?.write) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ])
          setShareState('copied')
          setTimeout(() => setShareState('idle'), 2500)
          return
        }

        // Final fallback — download
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'my-og-host.png'
        a.click()
        URL.revokeObjectURL(url)
        setShareState('idle')
      }, 'image/png')

    } catch (err) {
      console.error('Share failed:', err)
      setShareState('idle')
    }
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
            {/* Visible result UI */}
            <p className="quiz-result-label">You got</p>
            <h2 className="quiz-result-name" style={{ color: res.color }}>{res.name}</h2>
            <p className="quiz-result-handle">{res.handle}</p>
            <p className="quiz-result-desc">{res.desc}</p>

            {/* Hidden share card — captured by html2canvas */}
            <div
              ref={shareCardRef}
              className="quiz-share-card"
              style={{ borderColor: res.color }}
            >
              <div className="quiz-share-card-top">
                <span className="quiz-share-card-label">which other games host are you?</span>
                <span className="quiz-share-card-site">othergames.xyz</span>
              </div>
              <div className="quiz-share-card-result">
                <p className="quiz-share-card-got">I got</p>
                <h2 className="quiz-share-card-name" style={{ color: res.color }}>{res.name}</h2>
                <p className="quiz-share-card-handle">{res.handle}</p>
              </div>
              <p className="quiz-share-card-desc">{res.desc}</p>
              <div className="quiz-share-card-footer">
                <span style={{ color: res.color }}>OTHER GAMES</span>
                <span>othergames.xyz/quiz</span>
              </div>
            </div>

            <div className="quiz-result-actions">
              <a href={res.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Follow {res.name}
              </a>
              <button
                className="quiz-share-btn"
                onClick={handleShare}
                disabled={shareState === 'copying'}
              >
                {shareState === 'copying' ? 'Generating...' : shareState === 'copied' ? 'Copied!' : 'Copy & Share'}
              </button>
              <button className="quiz-retake" onClick={reset}>Try again</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
