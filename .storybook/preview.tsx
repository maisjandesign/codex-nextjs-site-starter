import { useLayoutEffect, type ReactNode } from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import { themes } from 'storybook/theming';
import { MotionProvider } from '../src/components/motion/MotionProvider';
import '../src/styles/tokens.css';
import '../src/styles/base.css';
import '../src/styles/components.css';
import '../src/styles/layout.css';
import './preview.css';

function PreviewSurface({ children, theme }: { children: ReactNode; theme: string }) {
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return <div className="project-preview">{children}</div>;
}
const preview: Preview = {
  tags: ['autodocs'],
  initialGlobals: { theme: 'light', motion: 'standard' },
  globalTypes: {
    theme: {
      description: 'Project preview theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
    motion: {
      description: 'Preview motion',
      toolbar: {
        title: 'Motion',
        icon: 'play',
        items: ['standard', 'slow', 'reduced'],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'padded',
    controls: { expanded: true, disableSaveFromUI: true },
    docs: { theme: themes.light, codePanel: true },
    a11y: { test: 'todo' },
    options: { storySort: { order: ['Foundations', 'Components', 'Patterns', 'Motion', 'Pages'] } },
  },
  decorators: [
    (Story, context) => (
      <PreviewSurface theme={context.globals.theme}>
        <MotionProvider
          key={`${context.id}:${context.globals.motion}`}
          initialSlow={context.globals.motion === 'slow'}
          initialReduced={context.globals.motion === 'reduced'}
        >
          <Story />
        </MotionProvider>
      </PreviewSurface>
    ),
  ],
};
export default preview;
