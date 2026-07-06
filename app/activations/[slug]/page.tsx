import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { activations } from '@/lib/activations';
import { Arrow } from '@/components/Primitives';

export function generateStaticParams() {
  return activations.map((activation) => ({ slug: activation.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activation = activations.find((item) => item.slug === slug);
  if (!activation) return {};
  return {
    title: `${activation.title} | Other Games Activations`,
    description: activation.summary,
    openGraph: { images: [activation.cover] }
  };
}

export default async function ActivationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activation = activations.find((item) => item.slug === slug);
  if (!activation) notFound();

  const related = activations.filter((item) => item.slug !== activation.slug).slice(0, 2);

  return (
    <main className="case-page">
      <div className="grain" />
      <header className="case-nav">
        <Link href="/" className="nav-brand">
          <Image src="/logo-blue.png" alt="Other Games" width={34} height={34} />
          <span>Other Games</span>
        </Link>
        <Link href="/#work" className="back-link">Back to activations</Link>
      </header>

      <section className="case-hero">
        <div className="case-hero-copy">
          <span className="case-eyebrow">{activation.eyebrow}</span>
          <h1>{activation.title}</h1>
          <p>{activation.summary}</p>
          <div className="case-facts">
            <div><span>Partner</span><strong>{activation.partner}</strong></div>
            <div><span>Format</span><strong>{activation.type}</strong></div>
            <div><span>Year</span><strong>{activation.date}</strong></div>
          </div>
        </div>
        <div className="case-hero-image">
          {activation.video ? (
            <video
              src={activation.video}
              poster={activation.cover}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="cover"
              aria-label={`${activation.title} activation video`}
            />
          ) : (
            <Image src={activation.cover} alt={activation.title} fill sizes="100vw" priority className="cover" />
          )}
        </div>
      </section>

      <section className="case-quote">
        <p>“{activation.quote}”</p>
      </section>

      <section className="case-body">
        <div className="case-section-label">The experience</div>
        <div className="case-story">
          {activation.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      {activation.brandNotes && (
        <section className="brand-context">
          <div>
            <span className="case-section-label">Brand context</span>
            <h2>Why this one matters.</h2>
            <p>Quick read on the partner, brand weight, and why this activation deserves space in the archive.</p>
          </div>
          <div className="brand-context-panel">
            {activation.brandNotes.map((note) => <p key={note}>{note}</p>)}
            {activation.brandLinks && (
              <div className="brand-links">
                {activation.brandLinks.map((item) => (
                  <a href={item.href} target="_blank" rel="noreferrer" key={item.href}>
                    {item.label}
                    <Arrow />
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="case-gallery">
        {activation.gallery.map((image, index) => (
          <div className={`gallery-item item-${index + 1}`} key={`${image}-${index}`}>
            <Image src={image} alt={`${activation.title} gallery ${index + 1}`} fill sizes="(max-width: 900px) 100vw, 50vw" className="cover" />
          </div>
        ))}
      </section>

      <section className="case-proof">
        <div>
          <span className="case-section-label">Proof of play</span>
          <h2>Community receipts, not empty claims.</h2>
          <p>Each activation page is designed to hold X posts, clips, player reactions, and campaign proof as the archive grows.</p>
        </div>
        <div className="proof-links">
          {activation.ugc.map((item) => (
            <a href={item.href} target="_blank" rel="noreferrer" key={item.href}>
              {item.label}
              <Arrow />
            </a>
          ))}
        </div>
      </section>

      <section className="service-strip">
        {activation.services.map((service) => <span key={service}>{service}</span>)}
      </section>

      <section className="related-cases">
        <span className="case-section-label">More activations</span>
        <div className="related-grid">
          {related.map((item) => (
            <Link href={`/activations/${item.slug}`} className="related-card" key={item.slug}>
              <Image src={item.cover} alt={item.title} fill sizes="(max-width: 900px) 100vw, 40vw" className="cover" />
              <div>
                <span>{item.partner}</span>
                <h3>{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
