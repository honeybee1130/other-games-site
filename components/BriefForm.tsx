'use client';

import { useState } from 'react';
import { Arrow } from '@/components/Primitives';

const EMAIL = 'othergamesxyz@gmail.com';
const BUDGETS = ['Under $5k', '$5k-$15k', '$15k+', 'Not sure'];

type Status = 'idle' | 'sending' | 'ok' | 'error';

export function BriefForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    try {
      const r = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (r.ok) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return (
      <div className="brief-done">
        <span className="case-section-label">Got it</span>
        <h3>Brief received.</h3>
        <p>We read every one. Expect a reply from Other Games soon — check your DMs and inbox.</p>
      </div>
    );
  }

  return (
    <form className="brief-form" onSubmit={onSubmit}>
      {/* honeypot — hidden from users, catches bots */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <div className="brief-grid">
        <label>
          <span>Your name *</span>
          <input name="name" required placeholder="Who are we talking to?" />
        </label>
        <label>
          <span>Contact *</span>
          <input name="contact" required placeholder="X handle, email, or Telegram" />
        </label>
        <label>
          <span>Brand / project</span>
          <input name="brand" placeholder="Who are you repping?" />
        </label>
        <label>
          <span>Community / world</span>
          <input name="community" placeholder="Otherside, ApeChain, Solana…" />
        </label>
        <label>
          <span>Audience size</span>
          <input name="audience" placeholder="Rough reach / holder count" />
        </label>
        <label>
          <span>Budget</span>
          <select name="budget" defaultValue="">
            <option value="" disabled>Pick a range</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>
      </div>

      <label className="brief-wide">
        <span>What do you want to run? *</span>
        <textarea name="want" required rows={3} placeholder="A tournament, a launch moment, a community game night, an IRL activation…" />
      </label>
      <label className="brief-wide">
        <span>Timing</span>
        <input name="timing" placeholder="A date, a window, or 'flexible'" />
      </label>

      <div className="brief-actions">
        <button type="submit" className="button primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : <>Send brief <Arrow /></>}
        </button>
        {status === 'error' && (
          <span className="brief-error">
            Couldn&apos;t send that — email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </span>
        )}
      </div>
    </form>
  );
}
