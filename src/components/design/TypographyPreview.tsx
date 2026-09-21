'use client';
import { useEffect, useRef } from 'react';
import { Button } from '../Button';
import { Card } from '../Card';
import { fontChoices } from '../../design/token-editor.mjs';
export function TypographyPreview({
  font = 'system',
  text = 'Clear type. Consistent rhythm.',
}: {
  font?: keyof typeof fontChoices;
  text?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.style.setProperty('--font-family', fontChoices[font].value);
  }, [font]);
  return (
    <div ref={ref} className="type-preview stack">
      <h2>{text}</h2>
      <p className="lead">
        Compare wrapping, hierarchy and readable line lengths using real components.
      </p>
      <Card title="A shared component">
        <p>The font changes here without creating a different heading scale or button style.</p>
        <Button>Continue to the next step</Button>
      </Card>
      <p className="small muted">
        System font stacks use available local fallbacks. No font files are downloaded.
      </p>
    </div>
  );
}
