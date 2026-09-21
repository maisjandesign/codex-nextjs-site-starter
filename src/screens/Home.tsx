'use client';
import { FlipGallery } from '../components/motion/FlipGallery';
import { Section } from '../components/Section';
import { useState } from 'react';
import { Button, ButtonLink } from '../components/Button';
import { Field } from '../components/Field';
import { Card } from '../components/Card';

export function Home() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="label muted" data-sequence-part="eyebrow" data-sequence-step="1">
            The foundation for your next project
          </span>
          <h1 className="hero-title" data-sequence-part="heading" data-sequence-step="2">
            A great website starts with a system.
          </h1>
          <p className="lead muted" data-sequence-part="copy" data-sequence-step="4">
            Consistent spacing, clear components, and care in every detail—from the first screen to
            the last button.
          </p>
          <div className="row" data-sequence-part="actions" data-sequence-step="5">
            <ButtonLink href="/design-system">Explore the design system ↗</ButtonLink>
            <ButtonLink href="#principles" variant="secondary">
              How it works
            </ButtonLink>
          </div>
        </div>
        <aside
          className="demo-panel"
          aria-label="System example"
          data-sequence-part="visual"
          data-sequence-step="3"
        >
          <span className="badge small">● One source of truth for styles</span>
          <h2>Fewer arbitrary decisions.</h2>
          <div className="token-list small mono">
            <div className="token-row">
              <span>Typography</span>
              <span>H1 — H6</span>
            </div>
            <div className="token-row">
              <span>Base spacing unit</span>
              <span>4 px</span>
            </div>
            <div className="token-row">
              <span>Themes</span>
              <span>Light / dark</span>
            </div>
          </div>
          <p className="muted">Change a token to update every component that uses it.</p>
        </aside>
      </section>
      <Section id="principles" kicker="01 / Principles" title="Details that work together.">
        <div className="grid grid-three">
          <Card title="A shared language">
            <p className="muted">
              Every color, size, and spacing value has a name and a clear role.
            </p>
          </Card>
          <Card title="Every screen">
            <p className="muted">
              The grid adapts while preserving reading order and keeping actions within reach.
            </p>
          </Card>
          <Card title="Responsive feedback">
            <p className="muted">
              Buttons respond to hover and press. Motion respects each user’s preferences.
            </p>
          </Card>
        </div>
      </Section>
      <Section kicker="02 / Motion" title="Continuity, even in change.">
        <FlipGallery />
      </Section>
      <Section
        kicker="03 / Interaction"
        title="Try it in action."
        description={<> A local form demo: your data stays on this page. </>}
      >
        <div className="grid">
          <form
            className="card"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              if (!name.trim()) {
                setError('Enter your name to continue.');
                setStatus('');
                document.getElementById('name')?.focus();
                return;
              }
              setError('');
              setStatus(`All set, ${name.trim()}. The form works.`);
            }}
          >
            <Field
              id="name"
              name="name"
              autoComplete="given-name"
              label="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={error}
              required
            />
            <div>
              <Button type="submit">Test the form</Button>
            </div>
            <p role="status">{status}</p>
          </form>
          <div>
            <details className="disclosure">
              <summary>How do I change the visual style?</summary>
              <p>
                Update the color, typography, and shape tokens. Shared components automatically use
                the new values.
              </p>
            </details>
            <details className="disclosure">
              <summary>Can I use a different stack?</summary>
              <p>
                Yes. The rules, token roles, and acceptance criteria are portable. This starter’s
                components are written in React.
              </p>
            </details>
          </div>
        </div>
      </Section>
    </>
  );
}
