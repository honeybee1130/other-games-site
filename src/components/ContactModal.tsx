'use client'

import { useState } from 'react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const SERVICES = [
  'Game Event',
  'World Build',
  'Avatar / Wearable',
  'Brand Collab',
  'Other',
]

const BUDGETS = [
  'Under $1K',
  '$1K – $5K',
  '$5K – $15K',
  '$15K+',
]

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState({
    name: '',
    handle: '',
    email: '',
    service: '',
    budget: '',
    description: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', handle: '', email: '', service: '', budget: '', description: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {status === 'sent' ? (
          <div className="modal-success">
            <h2>We got you.</h2>
            <p>We&apos;ll be in touch shortly.</p>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Let&apos;s Talk</h2>
            <p className="modal-subtitle">Tell us what you&apos;re building.</p>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  name="name"
                  placeholder="Name *"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  name="handle"
                  placeholder="Twitter / X handle"
                  value={form.handle}
                  onChange={handleChange}
                />
              </div>

              <input
                name="email"
                type="email"
                placeholder="Email *"
                value={form.email}
                onChange={handleChange}
                required
              />

              <div className="form-row">
                <select name="service" value={form.service} onChange={handleChange} required>
                  <option value="" disabled>Service *</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                <select name="budget" value={form.budget} onChange={handleChange}>
                  <option value="" disabled>Budget range</option>
                  {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <textarea
                name="description"
                placeholder="Brief description of your project"
                value={form.description}
                onChange={handleChange}
                rows={4}
              />

              <button
                type="submit"
                className="modal-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send It'}
              </button>

              {status === 'error' && (
                <p className="modal-error">Something went wrong. DM us at @OtherGamesXYZ.</p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
