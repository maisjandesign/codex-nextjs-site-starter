'use client';
import { useState } from 'react';
import tokens from '../../design/tokens.json';
import {
  motionEases,
  motionLimits,
  validateMotionSettings,
} from '../../design/motion-settings.mjs';
import { useMotion, sourceMotion } from './MotionProvider';
import { Button } from '../Button';
import { Field } from '../Field';
import { Card } from '../Card';
import { MotionReveal } from './MotionReveal';
import { MotionText } from './MotionText';
import { FlipGallery } from './FlipGallery';
import { MotionSequence } from './MotionSequence';
import { MotionLink } from './MotionLink';
const labels = {
  enter: 'Duration (ms)',
  delay: 'Delay (ms)',
  stagger: 'Stagger (ms)',
  distance: 'Distance (px)',
};
export function MotionShowcase({
  allowSourceSave = process.env.NODE_ENV === 'development',
}: {
  allowSourceSave?: boolean;
}) {
  const motion = useMotion();
  const [draft, setDraft] = useState(motion.settings);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const apply = () => {
    const errors = validateMotionSettings(draft);
    setError(errors.join(' '));
    if (errors.length) return;
    motion.apply(draft);
    setStatus('Preview applied to shared site motion. Source files are unchanged until saved.');
  };
  const save = async () => {
    const errors = validateMotionSettings(draft);
    setError(errors.join(' '));
    if (errors.length) return;
    setSaving(true);
    setStatus('');
    try {
      const response = await fetch('/api/motion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      if (!response.ok)
        throw new Error(
          'Could not save motion settings. Keep the preview and try again in the local development server.',
        );
      motion.apply(draft);
      setStatus('Saved to tokens.json and regenerated tokens.css. Reload to verify.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="motion-example">
      <div className="card">
        <h3>Motion studio</h3>
        <p className="muted">
          Choose a starting character, tune the shared values, and watch the same components used on
          the site.
        </p>
        <div className="row" aria-label="Motion starting profiles">
          {Object.entries(tokens.motionProfiles).map(([name, settings]) => (
            <Button
              key={name}
              variant="secondary"
              onClick={() => {
                setDraft(settings);
                setError('');
                setStatus('Profile loaded. Apply to preview.');
              }}
            >
              {name[0].toUpperCase() + name.slice(1)}
            </Button>
          ))}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            apply();
          }}
          noValidate
        >
          <div className="grid grid-three">
            {(Object.keys(labels) as (keyof typeof labels)[]).map((key) => (
              <Field
                key={key}
                id={`motion-${key}`}
                label={labels[key]}
                type="number"
                step="1"
                min={motionLimits[key][0]}
                max={motionLimits[key][1]}
                value={Number.isNaN(draft[key]) ? '' : draft[key]}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    [key]: event.target.value === '' ? NaN : Number(event.target.value),
                  })
                }
              />
            ))}
            <div className="field">
              <label htmlFor="motion-ease">Easing</label>
              <select
                id="motion-ease"
                value={draft['library-ease']}
                onChange={(event) => setDraft({ ...draft, 'library-ease': event.target.value })}
              >
                {motionEases.map((ease) => (
                  <option key={ease}>{ease}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row motion-actions">
            <Button type="submit">Apply and replay</Button>
            <Button
              variant="secondary"
              onClick={() => {
                setDraft(sourceMotion);
                motion.apply(sourceMotion);
                setError('');
                setStatus('Restored source settings.');
              }}
            >
              Reset to source
            </Button>
            {allowSourceSave && (
              <Button variant="secondary" loading={saving} onClick={save}>
                Save motion to source
              </Button>
            )}
          </div>
        </form>
        {error && (
          <p className="field-error" role="alert">
            {error}
          </p>
        )}
        <p className="small muted" role="status">
          {status ||
            'Preview changes stay in this session. Save source values in the Next.js development token lab.'}
        </p>
      </div>
      <div className="row" aria-label="Motion playback">
        <Button variant="secondary" onClick={motion.restart}>
          Replay motion
        </Button>
        <Button variant="secondary" aria-pressed={motion.paused} onClick={motion.pause}>
          {motion.paused ? 'Resume' : 'Pause'}
        </Button>
        <Button variant="secondary" onClick={motion.finish}>
          Finish motion
        </Button>
        <Button variant="secondary" aria-pressed={motion.slow} onClick={motion.toggleSlow}>
          Slow playback
        </Button>
      </div>
      <Button variant="secondary" aria-pressed={motion.reduced} onClick={motion.toggleReduced}>
        Reduced motion preview
      </Button>
      <p className="small muted">
        Hover or keyboard-focus any enabled button to inspect its shared fill sweep and label roll.
        Slow playback also slows button motion. Reload Overview to inspect the header and hero
        entrance.
      </p>
      <MotionSequence className="card" id="sequence-example">
        <span className="label muted" data-sequence-part="eyebrow" data-sequence-step="0">
          Section sequence
        </span>
        <h3 data-sequence-part="heading" data-sequence-step="1">
          One trigger. A deliberate sequence.
        </h3>
        <p data-sequence-part="copy" data-sequence-step="3">
          The heading and supporting group share one timeline. Replay to compare their entry.
        </p>
        <div data-sequence-part="content" data-sequence-step="4">
          <MotionLink href="#main">Back to the catalog introduction</MotionLink>
        </div>
      </MotionSequence>
      <MotionText as="h3">Give every movement a clear purpose.</MotionText>
      <MotionReveal effect="stagger" className="grid grid-three">
        <Card title="Sequence">
          <p>Related elements enter in a coordinated sequence.</p>
        </Card>
        <Card title="Rhythm">
          <p>Timing and easing follow the selected shared values.</p>
        </Card>
        <Card title="Continuity">
          <p>Elements stay connected as the layout changes.</p>
        </Card>
      </MotionReveal>
      <MotionReveal effect="mask">
        <div className="demo-panel">
          <p className="lead">A reveal that uncovers the surface.</p>
        </div>
      </MotionReveal>
      <FlipGallery />
    </div>
  );
}
