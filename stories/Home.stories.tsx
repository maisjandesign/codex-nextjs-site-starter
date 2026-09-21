import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { App } from '../src/App';
import { Home } from '../src/screens/Home';
const meta = {
  title: 'Pages/Home',
  component: Home,
  tags: ['!autodocs'],
  render: () => (
    <App>
      <Home />
    </App>
  ),
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true, navigation: { pathname: '/' } },
    docs: {
      description: {
        component:
          'The real page and application shell. Its own theme and motion providers manage page state; use the page theme switch and token lab for integrated behavior. Storybook routing is mocked.',
      },
    },
  },
} satisfies Meta<typeof Home>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Desktop: Story = {};
