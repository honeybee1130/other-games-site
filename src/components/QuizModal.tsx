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
    q: "How do you actually win?",
    answers: [
      { text: "I studied the meta. I know every counter. I was ready before the game started.", host: 'dino' },
      { text: "I run the event, get the community hype enough, and the W takes care of itself.", host: 'papichulo' },
      { text: "Honestly? I play with everything I've got and trust the process.", host: 'dippy' },
      { text: "I build something worth winning for, then I go get it.", host: 'giantyuppie' },
    ]
  },
  {
    q: "Your relationship with rules:",
    answers: [
      { text: "I wrote better ones.", host: 'honeyb' },
      { text: "I read them once, file them, and never think about them again.", host: 'hype' },
      { text: "I respect them even when they're inconvenient.", host: 'dippy' },
      { text: "What rules?", host: 'gspot' },
    ]
  },
  {
    q: "You've been offline for 3 days. You come back and:",
    answers: [
      { text: "Reply to 200 messages in 20 minutes.", host: 'mak' },
      { text: "Check on all three of your projects and realize two of them shipped without you.", host: 'giantyuppie' },
      { text: "Challenge the person who talked the most while you were gone.", host: 'dino' },
      { text: "Drop a playlist. No caption. No context.", host: 'smudgy' },
    ]
  },
  {
    q: "A new person joins the server. You:",
    answers: [
      { text: "DM them the vision deck before they've said hello.", host: 'honeyb' },
      { text: "Shout them out to the entire community within 30 seconds.", host: 'mak' },
      { text: "Send a warm welcome and check in on them all week.", host: 'dippy' },
      { text: "Tag them in chaos before they've read the rules.", host: 'gspot' },
    ]
  },
  {
    q: "Your pre-game energy:",
    answers: [
      { text: "Zero words. Maximum output.", host: 'hype' },
      { text: "Vibes up, community on deck. This is what it's all for.", host: 'papichulo' },
      { text: "Headset on. Analyzing the lobby. No talking until it's time.", host: 'dino' },
      { text: "Good music queued. Energy locked. Let's go.", host: 'smudgy' },
    ]
  },
  {
    q: "OG invites you to run your own event. You:",
    answers: [
      { text: "Accept immediately. This is why you've been showing up every Saturday.", host: 'papichulo' },
      { text: "Build an entire ecosystem around it before the event even happens.", host: 'giantyuppie' },
      { text: "Confirm it, calendar it, and start closing sponsors the same day.", host: 'hype' },
      { text: "Curate the playlist first. The rest falls into place.", host: 'smudgy' },
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
  dino: {
    name: 'Dinopawnz',
    handle: '@dinopawnz',
    desc: "You play to win and you've got the receipts. The meta doesn't intimidate you — you built the study guide. Whether you're hunting bounties or hosting games, you know the matchup before it starts. People come to you when they actually want to level up.",
    color: '#ef4444',
    link: 'https://x.com/dinopawnz',
  },
  dippy: {
    name: 'Dippy',
    handle: '@dippylvs',
    desc: "You lead with your heart and you'd do it again. The warmest person in any room — but don't mistake that for soft. There's real conviction behind the sweetness. People feel safe around you. You show up, stay consistent, and genuinely care. That's rarer than any skill.",
    color: '#ec4899',
    link: 'https://x.com/dippylvs',
  },
  smudgy: {
    name: 'Smudgy',
    handle: '@Smudgybox',
    desc: "You move at your own frequency and somehow it's always the right one. You're the artist in the room — the one who feels the vibe before anyone names it. British wit, warm energy, and a playlist that absolutely goes hard. The mood wouldn't be the same without you.",
    color: '#8b5cf6',
    link: 'https://x.com/Smudgybox',
  },
  papichulo: {
    name: 'Papichulo',
    handle: '@Papichulomeme',
    desc: "You run with the best energy in the room and you make it your own. You learned from the biggest, built your own thing, and kept showing up. The community trusts you because you've been there. When you host, people come — not because they have to, but because you make it worth it.",
    color: '#f43f5e',
    link: 'https://x.com/Papichulomeme',
  },
  giantyuppie: {
    name: 'GiantYuppie',
    handle: '@GiantYuppie',
    desc: "You're building three things at once and somehow all of them are moving. ApeChain to the core, always in the ecosystem, always adding something. Fueled by hummus and a genuine belief that the builder wins. You don't need the spotlight — you need the infrastructure.",
    color: '#10b981',
    link: 'https://x.com/GiantYuppie',
  },
}

const allHosts = Object.keys(results)

export function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [current, setCurrent] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(allHosts.map(h => [h, 0]))
  )
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
    setScores(Object.fromEntries(allHosts.map(h => [h, 0])))
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

        if (navigator.clipboard?.write) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ])
          setShareState('copied')
          setTimeout(() => setShareState('idle'), 2500)
          return
        }

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
            <p className="quiz-result-label">You got</p>
            <h2 className="quiz-result-name" style={{ color: res.color }}>{res.name}</h2>
            <p className="quiz-result-handle">{res.handle}</p>
            <p className="quiz-result-desc">{res.desc}</p>

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
