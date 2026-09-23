import type { Preview } from "@storybook/nextjs-vite";
import { MotionRoot } from "../src/components/motion/motion-root";
import "../src/app/globals.css";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
    controls: { matchers: { color: /(background|color)$/i } },
    a11y: { test: "todo" },
    options: { storySort: { order: ["Foundations", "Components", "Motion", "Sections"] } },
  },
  decorators: [(Story, context) => context.parameters.motion && context.viewMode === "story"
    ? <MotionRoot key={context.id}><Story /></MotionRoot>
    : <Story />],
};
export default preview;
