import { MotionShowcase } from '../components/motion/MotionShowcase';
import { Section } from '../components/Section';
import { createElement, useState } from 'react';
import { useDesign } from '../components/design/DesignProvider';
import { Button } from '../components/Button';
import { Field } from '../components/Field';

export function DesignSystem({ theme }: { theme: 'light' | 'dark' }) {
  const { tokens } = useDesign();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="label muted">Foundation / Token lab</span>
          <h1 className="hero-title">One system. Every detail.</h1>
          <p className="lead muted">
            An integrated token lab powered by the same source file as the site’s styles. Component
            documentation and state stories live in Storybook.
          </p>
        </div>
        <div className="demo-panel">
          <span className="label muted">The workflow</span>
          <p className="lead">
            Define the foundation.
            <br />
            Build the components.
            <br />
            Check the pages.
          </p>
          <p className="small muted">
            Preview shared values here. Explore component documentation, variants, and Controls in
            the separate Storybook catalog.
          </p>
        </div>
      </section>
      <Section
        contentMotion={false}
        kicker="01 / Typography"
        title="Text hierarchy"
        description={
          <>
            {' '}
            Sizes: mobile / tablet / desktop, in px at a 16 px root font size. The page title is the
            H1 example.{' '}
          </>
        }
      >
        <div className="token-list">
          <div className="token-row">
            <span className="mono small">H1</span>
            <span>
              {tokens.headings.mobile.h1} / {tokens.headings.tablet.h1} /{' '}
              {tokens.headings.desktop.h1}
            </span>
          </div>
          {(['h2', 'h3', 'h4', 'h5', 'h6'] as const).map((h) => (
            <div className="token-row" key={h}>
              {createElement(h, null, `${h.toUpperCase()} — Clarity in every detail`)}
              <span className="mono small">
                {tokens.headings.mobile[h]} / {tokens.headings.tablet[h]} /{' '}
                {tokens.headings.desktop[h]}
              </span>
            </div>
          ))}
          <div className="token-row">
            <p>Body text</p>
            <span className="mono small">
              {tokens.font.body} px / {tokens.line.body}
            </span>
          </div>
        </div>
      </Section>
      <Section
        contentMotion={false}
        kicker="02 / Color"
        title="Color with a purpose"
        description={<> Active theme: {theme === 'light' ? 'light' : 'dark'}. </>}
      >
        <div className="swatches">
          {Object.entries(tokens.themes[theme]).map(([name, value]) => (
            <div className="swatch-card" key={name}>
              <div className="swatch" data-token={name} aria-hidden="true" />
              <span className="small mono">{name}</span>
              <span className="small muted mono">{value}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section contentMotion={false} kicker="03 / Space" title="Spacing and dimensions">
        <div className="grid">
          <div className="card">
            <h3>Spacing</h3>
            {Object.entries(tokens.space).map(([name, value]) => (
              <div className="token-row small" key={name}>
                <code>space-{name}</code>
                <div className="space-bar" data-token={name} aria-hidden="true" />
                <span>{value} px</span>
              </div>
            ))}
          </div>
          <div className="card">
            <h3>Other tokens</h3>
            {(
              [
                'radius',
                'size',
                'border',
                'weight',
                'line',
                'motion',
                'opacity',
                'z',
                'breakpoints',
              ] as const
            ).map((group) => (
              <details key={group} className="disclosure">
                <summary>{group}</summary>
                {Object.entries(tokens[group]).map(([key, value]) => (
                  <div className="token-row small mono" key={key}>
                    <span>{key}</span>
                    <span>{String(value)}</span>
                  </div>
                ))}
              </details>
            ))}
            <details className="disclosure">
              <summary>layout</summary>
              {Object.entries(tokens.layout).map(([mode, items]) => (
                <div key={mode}>
                  <p className="label">{mode}</p>
                  {Object.entries(items).map(([key, value]) => (
                    <div className="token-row small mono" key={key}>
                      <span>{key}</span>
                      <span>{value} px</span>
                    </div>
                  ))}
                </div>
              ))}
            </details>
            <details className="disclosure">
              <summary>font</summary>
              {Object.entries(tokens.font).map(([key, value]) => (
                <div className="token-row small mono" key={key}>
                  <span>{key}</span>
                  <span>{String(value)}</span>
                </div>
              ))}
            </details>
          </div>
        </div>
      </Section>
      <Section
        contentMotion={false}
        kicker="04 / Components"
        title="One component, different roles"
        description={
          <> Use Tab to focus a control. Press and hold a button to see its active state. </>
        }
      >
        <div className="row">
          <Button onClick={() => setStatus('Primary action completed.')}>Primary</Button>
          <Button variant="secondary" onClick={() => setStatus('Secondary action completed.')}>
            Secondary
          </Button>
          <Button variant="ghost" onClick={() => setStatus('Text action completed.')}>
            Text
          </Button>
          <Button size="small" onClick={() => setStatus('Compact action completed.')}>
            Compact
          </Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="row">
          <Button
            loading={loading}
            onClick={() => {
              setLoading(true);
              setStatus('Loading demo started.');
            }}
          >
            Show loading
          </Button>
          {loading && (
            <Button
              variant="secondary"
              onClick={() => {
                setLoading(false);
                setStatus('Loading complete.');
              }}
            >
              Finish demo
            </Button>
          )}
        </div>
        <p role="status">{status}</p>
        <div className="grid">
          <Field id="sample" label="Default field" placeholder="Enter a value" />
          <Field
            id="sample-error"
            label="Field with an error"
            defaultValue="Example"
            error="Example error: explain how to correct the value."
          />
        </div>
        <div className="notice small">
          Animations run only with prefers-reduced-motion: no-preference. Color and text also
          communicate state changes.
        </div>
      </Section>
      <Section
        contentMotion={false}
        kicker="05 / Motion"
        title="Library-powered motion"
        description="Replay shared GSAP patterns. Project-specific effects are selected from the motion reference library."
      >
        <MotionShowcase />
      </Section>
    </>
  );
}
