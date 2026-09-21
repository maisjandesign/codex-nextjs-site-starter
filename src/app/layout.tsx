import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { App } from '../App';
import '../styles/tokens.css';
import '../styles/base.css';
import '../styles/components.css';
import '../styles/layout.css';

export const metadata: Metadata = {
  title: { default: 'Foundation — Next.js Starter', template: '%s — Foundation' },
  description:
    'A foundation for consistent interfaces: design tokens, components, and quality checks.',
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
