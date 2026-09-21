'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import source from '../../design/tokens.json';
import baseline from '../../design/tokens.baseline.json';
import { generateCSS } from '../../design/token-contract.mjs';
import { getToken, mergePatch, validatePatch, editorFields } from '../../design/token-editor.mjs';
type Tokens = typeof source;
type Patch = Record<string, string | number>;
type DesignState = {
  tokens: Tokens;
  saved: Tokens;
  patch: Patch;
  errors: string[];
  message: string;
  busy: boolean;
  edit: (path: string, value: string | number) => void;
  cancel: () => void;
  reset: () => void;
  save: () => Promise<void>;
  reload: () => Promise<void>;
};
const Context = createContext<DesignState | null>(null);
export function DesignProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState(source);
  const [tokens, setTokens] = useState(source);
  const [patch, setPatch] = useState<Patch>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState(
    'Draft changes apply across this site. Save writes source tokens.',
  );
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' || !Object.keys(patch).length) return;
    // Central validated token preview is the only generated stylesheet injection.
    const sheet = document.createElement('style');
    sheet.dataset.tokenPreview = 'true';
    sheet.textContent = generateCSS(tokens);
    document.head.append(sheet);
    return () => sheet.remove();
  }, [tokens, patch]);
  const reload = async () => {
    setBusy(true);
    try {
      const response = await fetch('/api/tokens', { cache: 'no-store' });
      if (!response.ok)
        throw new Error('Source is unavailable. Keep the current draft and try again.');
      const next: Tokens = await response.json();
      setSaved(next);
      setTokens(next);
      setPatch({});
      setErrors([]);
      setMessage('Loaded saved source.');
    } catch (e) {
      setErrors([(e as Error).message]);
    } finally {
      setBusy(false);
    }
  };
  const edit = (path: string, value: string | number) => {
    const next = { ...patch, [path]: value };
    if (value === getToken(saved, path)) delete next[path];
    setPatch(next);
    const issues = validatePatch(saved, next);
    setErrors(issues);
    if (!issues.length) {
      setTokens(mergePatch(saved, next));
      setMessage('Unsaved draft. All matching site instances share this preview.');
    }
    // Invalid input remains editable; the last valid preview stays visible.
  };
  const cancel = () => {
    setPatch({});
    setTokens(saved);
    setErrors([]);
    setMessage('Draft discarded. Saved values restored.');
  };
  const reset = () => {
    const next: Patch = {};
    // Baseline is the explicit project baseline in tokens.baseline.json.
    for (const { path } of editorFields(saved)) {
      const value = getToken(baseline, path);
      if (value !== getToken(saved, path)) next[path] = value;
    }
    setPatch(next);
    const issues = validatePatch(saved, next);
    setErrors(issues);
    if (!issues.length) setTokens(mergePatch(saved, next));
    setMessage('Editable fields reset to the project baseline as a draft. Save to persist.');
  };
  const save = async () => {
    if (validatePatch(saved, patch).length || !Object.keys(patch).length || busy) return;
    setBusy(true);
    try {
      const response = await fetch('/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patch,
          base: Object.fromEntries(Object.keys(patch).map((key) => [key, getToken(saved, key)])),
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.errors?.join('\n') || 'Save failed. Your draft is retained.');
      setSaved(result.tokens);
      setTokens(result.tokens);
      setPatch({});
      setErrors([]);
      setMessage(
        'Saved tokens.json and regenerated tokens.css. Storybook updates after source reload or rebuild.',
      );
    } catch (e) {
      setErrors([(e as Error).message]);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Context.Provider
      value={{ tokens, saved, patch, errors, message, busy, edit, cancel, reset, save, reload }}
    >
      {children}
    </Context.Provider>
  );
}
export function useDesign() {
  const state = useContext(Context);
  if (!state) throw new Error('Design tools need DesignProvider.');
  return state;
}
