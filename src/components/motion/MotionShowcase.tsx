'use client';
import { useState } from 'react';
import {
  motionEases,
  motionLimits,
  validateMotionSettings,
} from '../../design/motion-settings.mjs';
import { useMotion, sourceMotion } from './MotionProvider';
import { Button } from '../Button';
import { Field } from '../Field';
import { MotionReveal } from './MotionReveal';
const labels = {
  enter: 'Duration (ms)',
  delay: 'Delay (ms)',
  smooth: 'Scroll smoothing (ms)',
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
        <h3>GSAP controls</h3>
        <p className="muted">
          Edit the shared upward-mask and scroll settings. Hover enabled controls to inspect their
          reversible GSAP interaction.
        </p>
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
      <MotionReveal as="h3">An upward entrance inside a stationary mask.</MotionReveal>
      <MotionReveal>
        <div className="demo-panel">
          <p className="lead">The content rises; the clipping wrapper stays still.</p>
        </div>
      </MotionReveal>
      <p className="muted">
        Inspect smooth scrolling on the Next.js page. Touch and reduced motion use native scrolling.
      </p>
    </div>
  );
}
