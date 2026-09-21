import type { ReactNode } from 'react';
import { MotionSequence } from './motion/MotionSequence';
type Props = {
  id?: string;
  kicker: string;
  title: string;
  description?: ReactNode;
  children: ReactNode;
  contentMotion?: boolean;
};
export function Section({ id, kicker, title, description, children, contentMotion = true }: Props) {
  return (
    <MotionSequence id={id} className="section">
      <div className="section-head">
        <span className="label muted" data-sequence-part="eyebrow" data-sequence-step="0">
          {kicker}
        </span>
        <h2 data-sequence-part="heading" data-sequence-step="1">
          {title}
        </h2>
        {description && (
          <p className="muted" data-sequence-part="copy" data-sequence-step="3">
            {description}
          </p>
        )}
      </div>
      {contentMotion ? (
        <div data-sequence-part="content" data-sequence-step="4">
          {children}
        </div>
      ) : (
        children
      )}
    </MotionSequence>
  );
}
