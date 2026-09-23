import type { ReactNode } from 'react';
import { MotionReveal } from './motion/MotionReveal';
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
    <section id={id} className="section">
      <div className="section-head">
        <MotionReveal as="span" className="label muted">
          {kicker}
        </MotionReveal>
        <MotionReveal as="h2">{title}</MotionReveal>
        {description && (
          <MotionReveal as="p" className="muted">
            {description}
          </MotionReveal>
        )}
      </div>
      {contentMotion ? <MotionReveal>{children}</MotionReveal> : children}
    </section>
  );
}
