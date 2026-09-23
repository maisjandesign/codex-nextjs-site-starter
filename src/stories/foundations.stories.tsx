import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Image from "next/image";

const meta = { title: "Foundations/System", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Typography: Story = { render: () => <div className="stack">
  <p className="eyebrow">Manrope Variable / Latin + Cyrillic</p>
  <div className="specimen"><span>H1</span><h1>Heading</h1></div>
  <div className="specimen"><span>H2</span><h2>Heading</h2></div>
  <div className="specimen"><span>H3</span><h3>Heading</h3></div>
  <div className="specimen"><span>H4</span><h4>Heading</h4></div>
  <div className="specimen"><span>Large</span><p className="text-large">Large text</p></div>
  <div className="specimen"><span>Body</span><p>Body text. The quick brown fox jumps over the lazy dog. 0123456789.</p></div>
  <div className="specimen"><span>Eyebrow</span><p className="eyebrow">Caption</p></div>
</div> };

export const Fonts: Story = { render: () => <div className="stack">
  <h2>Manrope Variable</h2>
  <p>The font is served locally through npm. Use the reference typeface for each new project.</p>
  {[400, 500, 600, 700].map((weight) => <div className="specimen" key={weight}>
    <span>Weight {weight}</span><p className="text-large" style={{ fontWeight: weight }}>Aa Bb Cc — 0123456789</p>
  </div>)}
</div> };

export const Colors: Story = { render: () => <div className="story-grid">
  {["bg", "ink", "muted", "line", "accent", "inverse"].map((name) => <div key={name}>
    <div className="swatch" style={{ background: `var(--color-${name})` }} />
    <p>--color-{name}</p>
  </div>)}
</div> };

export const Spacing: Story = { render: () => <div className="stack">
  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((step) => <div key={step} className="cluster">
    <span>{step * 8} px</span><div className="space-sample" style={{ width: `var(--space-${step})` }} />
  </div>)}
</div> };

export const Graphics: Story = { render: () => <div className="stack">
  <h2>Graphics</h2>
  <Image src="/assets/demo/sculpture.svg" alt="Four elliptical rings" width={1344} height={560} />
  <p>Original demo SVG. Replace it with the project assets and add each one to this catalogue.</p>
</div> };

export const IconsAndMarks: Story = { render: () => <div className="stack">
  <div className="cluster"><span className="brand-symbol" aria-hidden="true" /><span>Demo brand mark</span></div>
  <div className="cluster"><span className="button-arrow" aria-hidden="true">↗</span><span>Navigation arrow</span></div>
  <p>These are demo symbols. Use exported SVGs from Figma and one consistent icon library for missing UI icons.</p>
</div> };
