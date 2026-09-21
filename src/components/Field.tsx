import type { InputHTMLAttributes } from 'react';
type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style'> & {
  id: string;
  label: string;
  error?: string;
};
export function Field({ id, label, error, ...props }: Props) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : props['aria-describedby']}
      />
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
