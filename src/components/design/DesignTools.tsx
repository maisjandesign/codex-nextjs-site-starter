'use client';
import { useState } from 'react';
import { Button } from '../Button';
import { Field } from '../Field';
import { useDesign } from './DesignProvider';
import { editorFields, fontChoices, getToken, validatePatch } from '../../design/token-editor.mjs';
import { SpacingInspector } from './SpacingInspector';
export function DesignTools() {
  const [open, setOpen] = useState(false);
  const state = useDesign();
  const fields = editorFields(state.saved);
  if (process.env.NODE_ENV !== 'development') return null;
  return (
    <aside className="design-tools" data-design-tools="true" aria-label="Design tools">
      <Button
        size="small"
        variant="secondary"
        aria-expanded={open}
        aria-controls="design-tools-panel"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Close design tools' : 'Design tools'}
      </Button>
      {open && (
        <div id="design-tools-panel" className="design-tools-panel stack">
          <strong>Project token editor</strong>
          <p className="small">
            Shared values and desktop overrides. Mobile/tablet overrides stay unchanged. Color names
            describe all affected roles: accent is shared by buttons, links and other accent
            consumers.
          </p>
          <div className="row">
            <Button
              size="small"
              loading={state.busy}
              disabled={
                state.busy ||
                !!validatePatch(state.saved, state.patch).length ||
                !Object.keys(state.patch).length
              }
              onClick={state.save}
            >
              Save tokens
            </Button>
            <Button size="small" variant="secondary" disabled={state.busy} onClick={state.cancel}>
              Cancel draft
            </Button>
            <Button size="small" variant="secondary" disabled={state.busy} onClick={state.reset}>
              Reset baseline
            </Button>
            <Button size="small" variant="secondary" disabled={state.busy} onClick={state.reload}>
              Reload saved
            </Button>
          </div>
          <p role="status" className="small">
            {state.message}
          </p>
          {!!validatePatch(state.saved, state.patch).length && (
            <div role="alert" className="field-error">
              {state.errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <fieldset disabled={state.busy} className="token-controls">
            {Array.from(new Set(fields.map((field) => field.group))).map((group) => (
              <details key={group}>
                <summary>{group}</summary>
                <div className="stack">
                  {fields
                    .filter((field) => field.group === group)
                    .map((field) => {
                      const value = state.patch[field.path] ?? getToken(state.saved, field.path);
                      if (field.kind === 'font')
                        return (
                          <div className="field" key={field.path}>
                            <label htmlFor="token-font-family">font.family</label>
                            <select
                              id="token-font-family"
                              value={String(value)}
                              onChange={(event) => state.edit(field.path, event.target.value)}
                            >
                              <option value={state.saved.font.family}>Saved project stack</option>
                              {Object.entries(fontChoices).map(([key, font]) => (
                                <option key={key} value={font.value}>
                                  {font.label}
                                </option>
                              ))}
                            </select>
                            <p className="small muted">
                              Uses installed system fallbacks. Register and load licensed project
                              fonts explicitly.
                            </p>
                          </div>
                        );
                      if (field.path.startsWith('layout.'))
                        return (
                          <div className="field" key={field.path}>
                            <label htmlFor={`token-${field.path}`}>{field.path} (px)</label>
                            <select
                              id={`token-${field.path}`}
                              value={String(value)}
                              onChange={(event) =>
                                state.edit(field.path, Number(event.target.value))
                              }
                            >
                              {Object.values(state.saved.space).map((number) => (
                                <option key={number} value={number}>
                                  {number} px
                                </option>
                              ))}
                            </select>
                          </div>
                        );
                      return (
                        <Field
                          key={field.path}
                          id={`token-${field.path}`}
                          label={`${field.path}${field.kind === 'number' ? ' (px)' : ''}`}
                          type={field.kind === 'number' ? 'number' : 'text'}
                          value={Number.isNaN(value) ? '' : String(value)}
                          min={field.min}
                          max={field.max}
                          step={1}
                          error={state.errors.find((error) => error.startsWith(`${field.path}:`))}
                          onChange={(event) =>
                            state.edit(
                              field.path,
                              field.kind === 'number'
                                ? event.target.value === ''
                                  ? NaN
                                  : Number(event.target.value)
                                : event.target.value,
                            )
                          }
                        />
                      );
                    })}
                </div>
              </details>
            ))}
          </fieldset>
          <details>
            <summary>Spacing inspector</summary>
            <SpacingInspector />
          </details>
        </div>
      )}
    </aside>
  );
}
