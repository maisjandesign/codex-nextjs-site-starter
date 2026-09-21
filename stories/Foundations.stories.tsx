import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import tokens from '../src/design/tokens.json';
function Foundations({ topic }: { topic: 'colors' | 'typography' | 'spacing' | 'geometry' }) {
  if (topic === 'colors')
    return (
      <div className="story-stack">
        {Object.keys(tokens.themes.light).map((name) => (
          <div className="story-row" key={name}>
            <span className="story-swatch" style={{ background: `var(--color-${name})` }} />
            <code>--color-{name}</code>
            <span>Light: {tokens.themes.light[name as keyof typeof tokens.themes.light]}</span>
            <span>Dark: {tokens.themes.dark[name as keyof typeof tokens.themes.dark]}</span>
          </div>
        ))}
      </div>
    );
  if (topic === 'typography')
    return (
      <div className="story-stack">
        {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((Tag) => (
          <div key={Tag}>
            <Tag>{Tag.toUpperCase()} — A shared type scale</Tag>
            <code>
              {tokens.headings.mobile[Tag]} / {tokens.headings.tablet[Tag]} /{' '}
              {tokens.headings.desktop[Tag]} px
            </code>
          </div>
        ))}
        <p className="lead">Lead — Clear hierarchy.</p>
        <p>Body — Readable content.</p>
        <p className="small">Small — Supporting information.</p>
        <span className="label">Label — Context</span>
      </div>
    );
  const values =
    topic === 'spacing'
      ? tokens.space
      : {
          ...tokens.radius,
          control: tokens.size.control,
          'control-small': tokens.size['control-small'],
        };
  return (
    <div className="story-stack">
      {Object.entries(values).map(([name, value]) => (
        <div className="story-row" key={name}>
          <code>
            {topic} / {name}
          </code>
          <span>{value} px</span>
          {topic === 'spacing' && (
            <span
              style={{
                inlineSize: `var(--space-${name})`,
                blockSize: 'var(--space-4)',
                background: 'var(--color-accent)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
const meta = {
  title: 'Foundations/Tokens',
  component: Foundations,
  args: { topic: 'colors' },
  argTypes: {
    topic: { control: 'select', options: ['colors', 'typography', 'spacing', 'geometry'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Live values from src/design/tokens.json and the same generated CSS used by the site. Use the Theme and Viewport tools to compare contexts. Controls do not write token values to disk; edit the source JSON and run npm run tokens for persistent changes.',
      },
    },
  },
} satisfies Meta<typeof Foundations>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Colors: Story = {};
export const Typography: Story = { args: { topic: 'typography' } };
export const Spacing: Story = { args: { topic: 'spacing' } };
export const Geometry: Story = { args: { topic: 'geometry' } };
