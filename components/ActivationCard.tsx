'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Activation } from '@/lib/activations';
import { Arrow } from '@/components/Primitives';

// Image-first card. The video is only mounted while the pointer is over the
// card, so the homepage never loads (let alone plays) 26 videos at once.
export function ActivationCard({ activation, index }: { activation: Activation; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/activations/${activation.slug}`}
      className="activation-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="activation-image">
        <Image
          src={activation.cover}
          alt={activation.title}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          className="cover"
        />
        {activation.video && hovered && (
          <video
            src={activation.video}
            poster={activation.cover}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="cover card-video"
            aria-hidden="true"
          />
        )}
        <div className="activation-overlay" />
        <div className="activation-index">0{index + 1}</div>
      </div>
      <div className="activation-meta">
        <span>{activation.partner}</span>
        <span>{activation.type}</span>
      </div>
      <div className="activation-title-row">
        <h3>{activation.title}</h3>
        <Arrow />
      </div>
      <p>{activation.summary}</p>
    </Link>
  );
}
